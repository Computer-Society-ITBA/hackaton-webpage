const {error} = require('../util')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendRegisterConfirmationEmail(email){
    const msg = {
        to: email, //Mail del equipo
        from:'computersociety@itba.edu.ar', //Mail cuenta Sendgrid
        subject:"Inscripción HackITBA",
        html: `   <div style="text-align: center; background-color: #1c1c1c; padding: 40px;">
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
    }
    try{
        await sgMail.send(msg)
        return {status:"success"}
    }catch(err){
        console.log(err.response.body.errors)
        throw new Error("Sendgrid error")
    }
}

module.exports = {sendRegisterConfirmationEmail}