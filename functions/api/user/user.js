const express = require("express");
const router = express.Router();
const {
  roleMiddleware,
  ROLE_ADMIN,
  ROLE_MENTOR,
  ROLE_JURY,
  ROLE_USER,
} = require("../middleware/roleMiddleware");
const {
  getUser,
  getUsers,
  changePassword,
  setRoleToUser,
} = require("./auth_util");
const authMiddleware = require("../middleware/authMiddleware");
const selfMiddleware = require("../middleware/selfMiddleware");
const { error } = require("../util");
const {
  signInWithEmailAndPassword,
  clientAuth,
  createUserWithEmailAndPassword,
} = require("../config");
const {
  addMember,
  editMember,
  deleteMember,
  getMembers,
  editQualification,
  saveDocument,
  verifyDocument,
  setUserInfo,
} = require("./firestore_util");
const { schema } = require("./schema");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  sendRegisterConfirmationEmail,
  sendConfirmationEmail,
  sendRejectionEmail,
} = require("../mail/util");
const { getSubmission } = require("../submission/firestore_util");

// Todos los endpoints necesitan autenticacion (se require en el nivel de api.js)
// /user endpoints

//Para crear un equipo en un llamado, con toda la informacion necesaria
router.post("/team", async (req, res) => {
  const { name, email, password, participants, teamDescription, motivation } =
    req.body;
  //Validad datos de usuario
  try {
    await schema.validateAsync({
      full_name: name,
      email,
      password,
      teamDescription,
      motivation,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(error(1, "Invalid team data"));
  }
  //Validar a cada participante
  for (const participant of participants) {
    try {
      await schema.validateAsync({
        full_name: participant.name,
        dni: participant.dni,
        email: participant.email,
        edad: participant.edad,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send(error(1, "Invalid particpant data"));
    }
  }
  //hacer llamados a la BD
  try {
    //creamos el usuario
    const createdUser = await createUserWithEmailAndPassword(
      clientAuth,
      email,
      password
    );
    const userData = {
      name,
      teamDescription,
      motivation,
    };
    await setRoleToUser(createdUser.user.uid);
    //seteamos su nombre y descripciones
    const data = setUserInfo(createdUser.user.uid, userData);
    if (data.error) throw data.error;
    //agregamos a cada uno de sus participantes
    for (const participant of participants) {
      const aux = await addMember(
        createdUser.user.uid,
        participant.dni,
        participant.email,
        participant.name,
        participant.edad
      );
      if (aux.error) throw error;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(error(2, "Unknown error"));
  }
  try {
    await sendRegisterConfirmationEmail(email);
  } catch (err) {
    console.log(err);
    return res.status(400).send(error(2, err.message));
  }
  return res.status(200).send({ message: "Success" });
});

router.post("/login", async (req, res) => {
  // SOLO algunos roles deberían poder acceder
  //lista todos los usuarios

  const { email, password } = req.body;
  try {
    await schema.validateAsync({ email: email, password: password });
  } catch (err) {
    return res.status(400).send(error(1, "Missing email or password"));
  }
  try {
    await signInWithEmailAndPassword(clientAuth, email, password);
    const token = await clientAuth.currentUser.getIdToken();
    res.status(200).send({ token: token });
  } catch (err) {
    console.log(err);
    res.status(401).send(error(3, "Incorrect email or password"));
  }
});

// router.post('/', async (req, res) => {
//     // SOLO algunos roles deberían poder acceder
//     //lista todos los usuarios
//     const { email, password } = req.body
//     try {
//         await schema.validateAsync({ email: email, password: password })

//     } catch (err) {
//         return res.status(400).send(error(1, "Missing email or password"))
//     }
//     try {
//         const createdUser = await createUserWithEmailAndPassword(clientAuth, email, password)
//         res.status(200).send({ email: createdUser.user.email, uid: createdUser.user.uid })
//     }
//     catch (err) {
//         res.status(400).send({ 'result': 'User already exists or password invalid' })
//     }

//     return //hacer send no hace que se deje de ejecutar

// })

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLE_ADMIN]),
  async (req, res) => {
    // SOLO algunos roles deberían poder acceder
    //lista todos los usuarios
    const ans = await getUsers();
    if (ans.error) {
      res.status(404).send({ result: ans });
      return;
    }
    res.status(200).send({ users: ans });
    return; //hacer send no hace que se deje de ejecutar
  }
);
router.get("/:userId", authMiddleware, async (req, res) => {
  const uid = req.params.userId;
  if (uid === res.locals.userInfo.uid) {
    //busca la informacion de su usuario
    const ans = await getUser(uid);

    if (ans == null || ans.error) {
      return res.status(404).send(ans);
    }
    return res.status(200).send(ans);
  }
  //procesar request
  roleMiddleware([ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR])(req, res, async () => {
    const ans = await getUser(uid);
    if (ans.error) {
      return res.status(404).send(ans);
    }
    res.status(200).send(ans);
  });
});
//No se si es necesario agregar el middleware de rol o directamente lo dejamos para todos
router.put(
  "/:userId/password",
  authMiddleware,
  selfMiddleware,
  async (req, res) => {
    const uid = req.params.userId;
    const password = req.body.password;
    try {
      await schema.validateAsync({ password: password });
    } catch (err) {
      return res.status(400).send(error(1, "Missing or invalid password"));
    }
    const ans = await changePassword(uid, password);
    if (ans.error) {
      return res.status(400).send(ans);
    }
    res.status(200).send(ans);
  }
);
//TODO: agregar middleware de auth cuando se haya mergeado con el de cambiar contraseña
router.put(
  "/:userId/qualified",
  authMiddleware,
  roleMiddleware([ROLE_ADMIN]),
  async (req, res) => {
    const qualifiedValue = req.body.qualified;
    try {
      await schema.validateAsync({ qualified: qualifiedValue });
    } catch (err) {
      return res
        .status(400)
        .send(error(1, "Missing or invalid qualified body field"));
    }
    const user = await getUser(req.params.userId);
    if (user.error) {
      return res.status(400).send(ans);
    }
    const ans = await editQualification(req.params.userId, qualifiedValue);
    if (ans.error) {
      return res.status(400).send(ans);
    }
    try {
      if (qualifiedValue) {
        await sendConfirmationEmail(user.email);
      } else {
        await sendRejectionEmail(user.email);
      }
    } catch (err) {
      return res.status(400).send(error(1, "Error sending email"));
    }
    res.status(200).send(ans);
  }
);

router.get(
  "/:userId/submission",
  authMiddleware,
  selfMiddleware,
  async (req, res) => {
    const uid = req.params.userId;
    try {
      const ans = await getSubmission(uid);
      if (ans == null || ans.error) {
        return res.status(404).send(ans);
      }

      res.status(200).send(ans);
    } catch (err) {
      console.log(err);
      return res.status(404).send(error(1, "Error getting submission"));
    }
  }
);
//Estas funciones son muy parecidas, despues veo como puedo juntarlo
// router.post('/:userId/members', authMiddleware, selfMiddleware, roleMiddleware([ROLE_USER]), async (req, res) => {
//     const { full_name, dni, email,edad } = req.body
//     try {
//         await schema.validateAsync({ full_name: full_name, dni: dni, email: email, edad: edad })
//     } catch (err) {
//         return res.status(400).json(error(1, "Missing or invalid member information"))
//     }
//     const ans = await addMember(res.locals.userInfo.uid, dni, email, full_name ,edad)
//     if (ans.error) {
//         return res.status(400).send(ans)
//     }
//     res.status(200).send(ans)
// })
// router.patch('/:userId/members/:memberId', authMiddleware, selfMiddleware, roleMiddleware([ROLE_USER]), async (req, res) => {
//     const { full_name, dni, email } = req.body
//     const uid = req.params.userId
//     const memberId = req.params.memberId
//     try {
//         await schema.validateAsync({ full_name: full_name, dni: dni, email: email })
//     } catch (err) {
//         return res.status(400).json(error(1, "Missing or invalid member information"))
//     }
//     const ans = await editMember(uid, memberId, dni, email, full_name,edad)
//     if (ans.error) {
//         return res.status(400).send(ans)
//     }
//     res.status(200).send(ans)
// })
// router.delete('/:userId/members/:memberId', authMiddleware, selfMiddleware, roleMiddleware([ROLE_USER]), async (req, res) => {
//     const uid = req.params.userId
//     const memberId = req.params.memberId
//     const ans = await deleteMember(uid, memberId)
//     if (ans.error) {
//         return res.status(400).send(ans)
//     }
//     res.status(200).send(ans)
// })
router.get("/:userId/members", authMiddleware, async (req, res) => {
  const uid = req.params.userId;
  if (uid === res.locals.userInfo.uid) {
    const ans = await getMembers(uid);
    if (ans.error) {
      return res.status(400).send(ans);
    }
    return res.status(200).send(ans);
  }
  roleMiddleware([ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR])(req, res, async () => {
    const ans = await getMembers(uid);
    if (ans.error) {
      return res.status(400).send(ans);
    }
    res.status(200).send(ans);
  });
});

router.post(
  "/:userId/members/:memberId/documents",
  authMiddleware,
  roleMiddleware(ROLE_USER),
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No se encontro un archivo.");
    }
    const response = await saveDocument(
      req.params.userId,
      req.params.memberId,
      req.file
    );
    if (response.error) {
      res.status(400).send(response);
      return;
    }

    res.status(200).send(response);
    return;
  }
);

router.put(
  "/:userId/members/:memberId/documents/:documentId/verified",
  authMiddleware,
  roleMiddleware(ROLE_ADMIN),
  async (req, res) => {
    const response = await verifyDocument(
      req.params.userId,
      req.params.memberId,
      req.params.documentId
    );
    if (response.error) {
      res.status(400).send(response);
      return;
    }

    res.status(204).send();
    return;
  }
);

module.exports = router;
