const sgMail = require("@sendgrid/mail");
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registerEmail = fs
    .readFileSync(require.resolve("../../media/registerEmail.html"))
    .toString();

const confirmationEmail = fs
    .readFileSync(require.resolve("../../media/confirmationEmail.html"))
    .toString();

const rejectionEmail = fs
    .readFileSync(require.resolve("../../media/rejectionEmail.html"))
    .toString();

const mentorEmailTemplate = fs
    .readFileSync(require.resolve("../../media/mentorEmail.html"))
    .toString();

async function sendEmail(
    to,
    content,
    subject = "Inscripción HackITBA",
    html = true
) {
    let msg = {
        to,
        from: "no-reply@hackitba.com.ar", //Mail de nuestro dominio
        subject,
    };

    if (html) {
        msg.html = content;
    } else {
        msg.text = content;
    }

    try {
        await sgMail.send(msg);
        return { status: "success" };
    } catch (err) {
        console.log(err.response.body.errors);
        throw new Error("Sendgrid error");
    }
}

async function sendConfirmationEmail(email) {
    return sendEmail(email, confirmationEmail);
}

async function sendRejectionEmail(email) {
    return sendEmail(email, rejectionEmail);
}

async function sendRegisterConfirmationEmail(email) {
    return sendEmail(email, registerEmail);
}

async function sendMentorEmail(email, mentorPassword) {
    const data = {
        email: email,
        password: mentorPassword,
    };

    const mentorEmail = mentorEmailTemplate.replace(
        /{{\w+}}/g,
        (placeholder) =>
            data[placeholder.substring(2, placeholder.length - 2)] ||
            placeholder
    );

    return sendEmail(email, mentorEmail, "Credenciales Hackitba");
}

async function sendContactEmail(subject, content) {
    return sendEmail("computersociety@itba.edu.ar", content, subject, false);
}

module.exports = {
    sendRegisterConfirmationEmail,
    sendConfirmationEmail,
    sendRejectionEmail,
    sendMentorEmail,
    sendContactEmail,
};
