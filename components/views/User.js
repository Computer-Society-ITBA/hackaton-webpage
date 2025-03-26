import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { use, useCallback, useEffect, useState } from "react";
import { axiosApiInstance } from "../../config/axiosConfig";
import { set, useForm } from "react-hook-form";
import SubmitInput from "../utils/SubmitInput";
import useStore from "../../config/storeConfig";
import LoadingSpinner from "../UI/LoadingSpinner";

const CenteredMessage = (title, subtitle) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      flexDirection="column"
    >
      <Text fontSize="4xl" color="CSLightBlue">
        {title}
      </Text>
      <Text fontSize="2xl" color="white">
        {subtitle}
      </Text>
    </Box>
  );
};

const HasSubmittedView = () => {
  return CenteredMessage(
    "Ya hemos recibido tu proyecto!",
    "Pronto nos pondremos en contacto contigo"
  );
};

const SubmissionsClosedView = () => {
  return CenteredMessage(
    "¡Nos estamos preparando!",
    "No se pueden enviar proyectos en este momento"
  );
};

const UserView = ({ userInfo }) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        data.userId = userInfo.uid;
        console.log(data);
        await axiosApiInstance.post("/submissions", data);
        toast({
          title: "Proyecto enviado",
          status: "success",
          duration: 3000,
          onCloseComplete: () => {
            setHasSubmitted(true);
            //setSubmission(data);
            userHasSubmitted();
          },
        });
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        const title =
          err.response.data?.error?.code === "config"
            ? "Lo sentimos, el plazo de entrega de proyectos ha concluído"
            : "Error al enviar el proyecto";

        toast({
          title: title,
          status: "error",
          duration: 3000,
        });
      }
    },
    [userInfo, toast]
  );

  const onSubmitVideo = useCallback(
    async (data, submission) => {
      try {
        console.log(submission);
        data.userId = userInfo.uid;
        console.log(data);
        console.log(`/submissions/${submission.id}`);
        await axiosApiInstance.patch(`/submissions/${submission.id}`, data);
        toast({
          title: "Video enviado",
          status: "success",
          duration: 3000,
          onCloseComplete: () => {
            setHasSubmittedVideo(true);
          },
        });
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        const title =
          err.response.data?.error?.code === "config"
            ? "Lo sentimos, el plazo de entrega de proyectos ha concluído"
            : "Error al enviar el proyecto";

        toast({
          title: title,
          status: "error",
          duration: 3000,
        });
      }
    },
    [userInfo, toast]
  );

  const userHasSubmitted = useCallback(async () => {
    try {
      const response = await axiosApiInstance.get(
        `/users/${userInfo.uid}/submission`
      );
      setSubmission(response.data);
      return response.data && response.data.userId === userInfo.uid;
    } catch (err) {
      return false;
    }
  }, [userInfo]);


  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasSubmittedVideo, setHasSubmittedVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submission, setSubmission] = useState({});
  useEffect(() => {
    userHasSubmitted().then((hasSubmitted) => {
      setHasSubmitted(hasSubmitted);
      setIsLoading(false);

    });

  }, [userHasSubmitted]);

  useEffect(() => {
    setHasSubmittedVideo(submission.video && submission.userId === userInfo.uid);
  }, [submission]);

  const submissionsEnabled = useStore((state) => state.submissionsEnabled);
  const videoSubmissionsEnabled = useStore((state) => state.videoSubmissionsEnabled);
  const estado = useStore((state) => state);
  return isLoading ? (
    <LoadingSpinner />
  ) : !(videoSubmissionsEnabled) ? (
    <SubmissionsClosedView />
  ) : (hasSubmittedVideo) ? (
    <HasSubmittedView />
  ) : (hasSubmitted) ? (
    <Box mt={3} px="15%">

      <Text fontSize="4xl">Entrega de Video</Text>
      <form onSubmit={handleSubmit((data) => onSubmitVideo(data, submission))}>
        <SubmitInput
          label="VIDEO"
          name="video"
          register={register}
          placeholder="https://www.youtube.com/watch?v=..."
          errors={errors}
          required={true}
          errorMsg="El video ingresado debe ser un link de youtube"
          validation={{
            required: true,
            pattern:
              /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:v\/|watch\?v=))([\w-]{11})(?:\S+)?$/,
          }}
        />
        <SubmitInput
          label="PRESENTACIÓN PARA EL PITCH"
          name="pitch"
          register={register}
          errors={errors}
          required={true}
          errorMsg="Se debe ingresar un link válido"
          validation={{
            required: true,
            pattern:
              /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
          }}
        />

        <Flex justifyContent="flex-end">
          <Button
            type="submit"
            backgroundColor="#55faa2"
            color="black"
            borderRadius="10% / 50%"
            fontSize="2xl"
            padding="20px 50px"
          >
            Enviar
          </Button>
        </Flex>
      </form>
    </Box>
  ) : (submissionsEnabled) ? (

    <div>

      <Box mt={3} px="15%">
        <Text fontSize="4xl">Entrega de Proyecto</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SubmitInput
            label="DESCRIPCIÓN"
            name="description"
            register={register}
            InputComponent={Textarea}
            errors={errors}
            required={false}
            errorMsg="La descripción ingresada debe tener al menos 5 caracteres"
            validation={{
              required: true,
              minLength: 5,
            }}
          />
          <SubmitInput
            label="REPOSITORIO"
            name="repo"
            register={register}
            placeholder="https://github.com/..."
            errors={errors}
            required={true}
            errorMsg="El repositorio ingresado debe ser un link de github"
            validation={{
              required: true,
              pattern:
                /^(?:https:\/\/)?(?:www\.)?github\.com\/[\w-]+\/[\w-]+(?:\/)?$/,
            }}
          />
          <SubmitInput
            label="BRANCH"
            name="branch"
            register={register}
            errors={errors}
            required={false}
            validation={{
              required: false
            }}
          />
          <SubmitInput
            label="CONTENIDO ADICIONAL"
            name="additionalContent"
            register={register}
            errors={errors}
            required={false}
            errorMsg="Se debe ingresar el hash completo de 40 caracteres"
            validation={{
              minLength: 5,
            }}
          />

          <SubmitInput
            label="HASH DEL COMMIT"
            name="commitHash"
            register={register}
            errors={errors}
            required={false}
            errorMsg="Se debe ingresar el hash completo de 40 caracteres"
            validation={{
              required: true,
              minLength: 40,
              maxLength: 40,
            }}
          />
          <SubmitInput
            label="LINK DE DEPLOY"
            name="deployLink"
            register={register}
            errors={errors}
            required={false}
            errorMsg="Se debe ingresar un link válido"
            validation={{
              required: true,
              pattern:
                /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
            }}
          />

          <Flex justifyContent="flex-end">
            <Button
              type="submit"
              backgroundColor="#55faa2"
              color="black"
              borderRadius="10% / 50%"
              fontSize="2xl"
              padding="20px 50px"
            >
              Enviar
            </Button>
          </Flex>
        </form>
      </Box>






    </div>



  ) :
    (<SubmissionsClosedView />);
};

export default UserView;
