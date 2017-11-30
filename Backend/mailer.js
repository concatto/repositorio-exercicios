const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "reap.univali@gmail.com",
    pass: "f72bbd280d"
  }
});

module.exports = {
  sendInvitation(destinationUrl, recipient, name, roomName) {
    let mailOptions = {
      from: "R.E.A.P. <reap.univali@gmail.com>",
      to: recipient,
      subject: "[R.E.A.P.] Convite para participar: " + roomName,
      text: "Saudações! Você foi convidado para a sala " + roomName + " por " +
        name + ". Visite " + destinationUrl + " para aceitar este convite.",
      html: "<p>Saudações!</p><p>Estamos enviando este e-mail para notificar" +
        " que você foi convidado por " + name + " para participar da sala " + roomName +
        " no R.E.A.P. - Repositório de Exercício de Algoritmos e Programação.</p>" +
        `<p>Siga <a href='${destinationUrl}'>este link</a> para aceitar o convite.</p>`
    };

    return transporter.sendMail(mailOptions);
  },

  sendRegistrationConfirmation(destinationUrl, recipient) {
    let mailOptions = {
      from: "R.E.A.P. <reap.univali@gmail.com>",
      to: recipient,
      subject: "[R.E.A.P.] Confirmação de criação de conta",
      text: "Saudações! ",
      html: "<p>Saudações</p><p>Estamos enviando este e-mail para solicitar" +
        " uma confirmação sobre o registro de uma nova conta em seu nome." +
        " Para verificar sua conta e acessar o Repositório de Exercícios de" +
        ` Algoritmos e Programação, siga <a href='${destinationUrl}'>este link.</p>` +
        "<p>Caso você não tenha interagido com o R.E.A.P. recentemente, considere" +
        " esta mensagem um engano. Você pode simplesmente ignorá-la; sua segurança" +
        " não foi comprometida.",
    };

    return transporter.sendMail(mailOptions);
  },
};
