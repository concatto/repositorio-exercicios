const db = require("../db");
const _ = require("lodash/core");
const auth = require("../auth");
const User = require("./user");
const nodemailer = require("nodemailer");
const Constants = require("../constants");
const table = "user_room";

module.exports = {
  isMorePrivilegedThan(value, room_id, user_id) {
    return this.retrieveUser(room_id, user_id, "privilege").then(row => {
      return Promise.resolve(row !== undefined && row.privilege < value);
    });
  },

  retrieveRoomsFor(params) {
    const { id: user_id } = params;

    return db.select("*").from(table).where({user_id})
      .innerJoin("room", {"room.id": `${table}.room_id`})
      .innerJoin("room_stats", {"room_stats.room_id": `${table}.room_id`});
  },

  retrieveUser(room_id, user_id, cols) {
    return this.retrieveUsers({room_id}, cols).where({user_id}).first();
  },

  retrieveUsers(params, cols) {
    const { room_id } = params;
    cols = cols || ["id", "name", "experience", "privilege", "joined_at"];

    return db.select(cols).from(table).where({room_id})
      .innerJoin("reap_user", {"id": "user_id"});
  },

  join(params) {
    const vals = _.pick(params, "room_id", "privilege");

    // TODO check if the user already belongs to the room.
    return db.insert({user_id: params.id, ...vals}).into(table);
  },

  leave(params) {
    // TODO
    return Promise.reject("NYI");
  },

  invite(params) {
    const tokenData = _.pick(params, "room_id", "id", "email", "privilege");

    return this.isMorePrivilegedThan(Constants.Student, params.room_id, params.id).then(result => {
      const token = auth.createToken(tokenData, {expiresIn: "7d"});

      nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass  // generated ethereal password
              }
          });

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"R.E.A.P" <reap@reap.com>', // sender address
              to: 'fernandoconcatto@gmail.com', // list of receivers
              subject: 'Hello ✔', // Subject line
              text: 'Hello world? ' + token, // plain text body
              html: '<b>Hello world?</b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });
      console.log("Should be in an email:", token);

      return true;
    }).catch(console.log);
  },

  // The user must already be registered to accept an invitation.
  // Clients should handle the registration process if needs be.
  acceptInvitation(params) {
    const { token, id } = params;

    return auth.verifyToken(token).then(data => {
      return User.retrieve({id}).then(user => {
        if (user.email !== data.email) return false;

        return this.join({...data, id});
      });
    });
  }
}
