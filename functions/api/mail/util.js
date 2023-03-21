const {error} = require('../util')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registerConfirmationEmail = `   <div style="text-align: center; background-color: #1c1c1c; padding: 40px;">
<span style="font-size: 18pt;">
  <span style="font-size: 18pt;">
    <strong>
      <span style="color: #ffffff;">¡Inscripción recibida! 
        <br>
      </span> 
      <br>
      <img src="https://share1.cloudhq-mkt3.net/85daf574819556.png" alt="" width="363" height="80"> 
      <br>
    </strong>
  </span>
</span>
<h3 style="text-align: justify;" align="middle">
  <span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">
    <br>
    <span style="color: #ffffff;">¡Hemos registrado con éxito tu inscripción! En los próximos días te volveremos a contactar para notificarte si fuiste seleccionado dentro de los 25 equipos de la competencia. En caso de ser seleccionado, te pediremos que completes información adicional y elijas tu categoría de preferencia.</span>
  </span> 
  <br>
  <br>
  <span style="color: #ffffff;">
    <strong>
      <span style="font-family: helvetica, arial, sans-serif;">
        <br>
      </span>
    </strong> 
    <span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">Atentamente,</span>
  </span> 
  <br>
  <span style="font-family: arial, helvetica, sans-serif; font-size: 12pt; color: #ffffff;">
    <br>Equipo de Computer Society ITBA
  </span>
</h3>
</div>
<div style="background-color: #1c1c1c;">
<img style="font-size: small; font-weight: normal; float: right; padding: -40px;" src="https://share1.cloudhq-mkt3.net/f7f2777d2cdb63.png" alt="" width="201" height="56"> 
<br>
<br>
<br>
<br>
<br>
<br>
</div>
`
//TODO: change emails
const confirmationEmail = `<div style="background-color: #1c1c1c; text-align: justify;">
<div class="row" style="max-width: 100%; object-fit: cover;">
  <img style="max-width: 100%; object-fit: cover; display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/7adcd562e1286f.png" alt="" height="70pt" align="middle">
</div>
<div style="padding: 7%;">
  <div style="text-align: center;">
    <span style="font-size: 20pt; text-align: center; color: #ffffff;">&nbsp; &nbsp; 
      <br>¡Has sido seleccionado! 
      <br>
      <br>
    </span>
  </div>
  <span style="color: #ffffff;">
    <img style="display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/cbf96787f709cb.png" alt="" width="300pt"> 
    <br>
    <br>
    <span style="font-size: 14pt;">¡Ya casi! 
      <span class="Lm ng" data-ddnwab="PR_1_0" aria-invalid="grammar">Les comunicamos que </span>ahora mismo se encuentran en la lista de preseleccionados para participar de 
      <span class="LI ng" data-ddnwab="PR_217_0" aria-invalid="spelling">HackITBA</span> ‘23 el próximo 31 de marzo, 1 y 2 de abril en las sedes del Instituto Tecnológico de Buenos Aires.
    </span>
  </span> 
  <br>
  <br>
  <br>
  <img src="https://share1.cloudhq-mkt3.net/3b2428aec9ac77.png" alt="" height="30pt"> 
  <br>
  <div class="clear ng-star-inserted">
    <br>
  </div>
  <div class="corrected-text ng-star-inserted">
    <div class="corrected-text__text">
      <div class="corrected-text__text-detail">
        <span style="color: #ffffff; font-size: 14pt;">
          <span class="corrected-phrase corrected-phrase_synonyms-mode ng-star-inserted" style="text-align: left;" data-end="3" data-originaltext="Como" data-start="0" data-text="">
            <img src="https://share1.cloudhq-mkt3.net/73d33b4fef518a.png" alt="" height="14pt"> Competencia completamente gratuita 
            <br>
            <br>
            <img src="https://share1.cloudhq-mkt3.net/73d33b4fef518a.png" alt="" height="14pt"> Se premiarán a los mejores de cada categoría 
            <br>
            <br>
            <img src="https://share1.cloudhq-mkt3.net/73d33b4fef518a.png" alt="" height="14pt"> Se proveerá comida y bebida 
            <br>
            <br>
            <img src="https://share1.cloudhq-mkt3.net/73d33b4fef518a.png" alt="" height="14pt"> Evento presencial de 
            <span class="LI ng" data-ddnwab="PR_3_0" aria-invalid="spelling">
              <span class="LI ng" data-ddnwab="PR_10_0" aria-invalid="spelling">
                <span class="LI ng" data-ddnwab="PR_14_0" aria-invalid="spelling">
                  <span class="LI ng" data-ddnwab="PR_218_0" aria-invalid="spelling">36hs</span>
                </span>
              </span>
            </span> consecutivas 
            <br>
            <br>
            <br>
            <img style="color: #ffffff; font-size: 18.6667px;" src="https://share1.cloudhq-mkt3.net/7826fbc0545881.png" alt="" height="30pt"> 
            <br>
            <br>
          </span> 
          <span class="corrected-phrase__displayed-text corrected-phrase__displayed-text_no-correction corrected-phrase__displayed-text_synonyms-mode ng-star-inserted" style="text-align: justify;">Como podrás notar, este año la tasa de inscriptos fue superior a lo esperado y solo los 25 equipos que, según nuestro criterio, más podrán disfrutar de la experiencia, fueron seleccionados para participar de la competencia. Considerando esto, necesitamos como primer paso que confirmen 
            <span class="Lm ng" data-ddnwab="PR_4_0" aria-invalid="grammar">
              <span class="Lm ng" data-ddnwab="PR_11_0" aria-invalid="grammar">su presencia</span>
            </span> en el evento. Para esto necesitamos que nos envíes:
          </span>
        </span>
      </div>
    </div>
  </div>
  <br>
  <div style="margin-left: 40px;">
    <img src="https://share1.cloudhq-mkt3.net/f610e6bef04489.png" alt="" width="14" height="14"> 
    <span style="color: #ffffff; font-size: 14pt;">Confirmación de asistencia en el evento 
      <br>
      <br>
      <img src="https://share1.cloudhq-mkt3.net/f610e6bef04489.png" alt="" width="14" height="14"> Categoría de preferencia (su categoría será informada el primer día del evento) 
      <br>
      <br>
      <img src="https://share1.cloudhq-mkt3.net/f610e6bef04489.png" alt="" width="14" height="14"> Restricciones alimentarias.
    </span>
  </div>
  <span class="corrected-phrase ng-star-inserted" data-end="212" data-originaltext="." data-start="212" data-text="">
    <span class="corrected-phrase ng-star-inserted" data-end="212" data-originaltext="." data-start="212" data-text="">
      <span class="corrected-phrase__displayed-text corrected-phrase__displayed-text_no-correction ng-star-inserted">
        <br>
        <span style="color: #ffffff; font-size: 14pt;">
          <span class="corrected-phrase corrected-phrase_synonyms-mode ng-star-inserted" data-end="2" data-originaltext="Una" data-start="0" data-text="">
            <span class="corrected-phrase__displayed-text corrected-phrase__displayed-text_no-correction corrected-phrase__displayed-text_synonyms-mode ng-star-inserted">Una vez enviada la confirmación, te recomendamos que revises los documentos adjuntados y leas las recomendaciones para los participantes, todos estos documentos serán entregados y completados durante la acreditación, por lo que saber previamente su contenido puede resultar recomendable. Además, considerar que la lectura del reglamento es de carácter obligatorio. 
              <br>
              <br>
              <span class="corrected-phrase corrected-phrase_synonyms-mode ng-star-inserted" style="text-align: left;" data-end="3" data-originaltext="Como" data-start="0" data-text="">
                <img src="https://share1.cloudhq-mkt3.net/73d33b4fef518a.png" alt="" height="14pt"> <a href="bit.ly/CS_docs">Documentación y Reglamento</a>
              </span>
            </span>
          </span> 
          <br>
        </span> 
        <br>
      </span>
    </span>
  </span>
  <div style="text-align: center;">
    <br>
    <span style="font-size: 20pt; color: #ffffff;">¡Nos vemos pronto! 
      <br>
      <br>
      <br>
    </span>
  </div>
  <div style="text-align: right;">
    <span style="color: #ffffff; font-size: 10pt;">Equipo de 
      <span style="color: #ffa300;">Computer Society ITBA. 
        <br>
        <br>
      </span>
    </span>
  </div>
</div>
<div>
  <img style="max-width: 100%; object-fit: cover; display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/7adcd562e1286f.png" alt="" height="70pt">
</div>
</div>`
const rejectionEmail = `<div style="background-color: #1c1c1c; text-align: justify;">
<div class="row" style="max-width: 100%; object-fit: cover;">
  <img style="max-width: 100%; object-fit: cover; display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/7adcd562e1286f.png" alt="" height="70pt" align="middle">
</div>
<div style="padding: 7%;">
  <div style="text-align: center;">
    <span style="font-size: 20pt; text-align: center; color: #ffffff;">&nbsp; &nbsp; 
      <br>¡Has quedado en lista de espera! 
      <br>
      <br>
    </span>
  </div>
  <span style="color: #ffffff;">
    <img style="display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/cbf96787f709cb.png" alt="" width="300pt"> 
    <br>
    <br>
    <span style="font-size: 14pt;">La tasa de inscriptos fue muy superior al cupo presupuesto por lo que algunos equipos quedaron en lista de espera, atentos a que algun equipo se baje de la competencia. En caso de ser asi, tendrán novedades por parte nuestra!</span>
  </span>
  <span class="corrected-phrase ng-star-inserted" data-end="212" data-originaltext="." data-start="212" data-text="">
    <span class="corrected-phrase ng-star-inserted" data-end="212" data-originaltext="." data-start="212" data-text="">
      <span class="corrected-phrase__displayed-text corrected-phrase__displayed-text_no-correction ng-star-inserted">
        <span style="color: #ffffff; font-size: 14pt;">
          <br>
        </span> 
        <br>
      </span>
    </span>
  </span>
  <div style="text-align: center;">
    <br>
    <span style="font-size: 20pt; color: #ffffff;">¡Gracias por inscribirse! 
      <br>
      <br>
      <br>
    </span>
  </div>
  <div style="text-align: right;">
    <span style="color: #ffffff; font-size: 10pt;">Equipo de 
      <span style="color: #ffa300;">Computer Society ITBA. 
        <br>
        <br>
      </span>
    </span>
  </div>
</div>
<div>
  <img style="max-width: 100%; object-fit: cover; display: block; margin-left: auto; margin-right: auto;" src="https://share1.cloudhq-mkt3.net/7adcd562e1286f.png" alt="" height="70pt">
</div>
</div>
`
async function sendEmail(email, content){
    const msg = {
        to: email, //Mail del equipo
        from:'computersociety@itba.edu.ar', //Mail cuenta Sendgrid
        subject:"Inscripción HackITBA",
        html: content
    }
    try{
        await sgMail.send(msg)
        return {status:"success"}
    }catch(err){
        console.log(err.response.body.errors)
        throw new Error("Sendgrid error")
    }
}

async function sendConfirmationEmail(email){
    return sendEmail(email,confirmationEmail)
}
async function sendRejectionEmail(email){
    return sendEmail(email,rejectionEmail)
}
async function sendRegisterConfirmationEmail(email){
    return sendEmail(email,registerConfirmationEmail)
}
module.exports = {sendRegisterConfirmationEmail,sendConfirmationEmail,sendRejectionEmail}