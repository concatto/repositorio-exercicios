const db = require("../db");
const _ = require("lodash/core");
const keyring = require("../keyring");
const User = require("./user");
const mailer = require("../mailer");
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

  inviteAll(params){


  console.log(params);
      const vals = _.pick(params, "roomId", "id", "invitations", "destinationUrl", "tokenKey");

      var promiseM = vals.invitations.map(function(value) {
          return db.select("id", "email").from("reap_user").where({"username": value.username}).then(row => {
            //row[0].email;
            const resultVals = {
                room_id: vals.roomId,
                id: row[0].id,
                inviterId: vals.id,
                email: row[0].email,
                privilege: 3,
                destinationUrl: vals.destinationUrl,
                tokenKey: vals.tokenKey
            }

             return resultVals;
          });
      });

      Promise.all(promiseM).then( resultadoAleluia => {
        console.log(resultadoAleluia);
        resultadoAleluia.map( value => {
          this.invite(value);
        })
      })


	  /*console.log('se cair aqui, comito e deixo com o halerssandro');
      console.log(params);
      const vals = _.pick(params, "room_id", "id", "invitations", "destinationUrl", "tokenKey");

      /*const inviteVals = vals.invitations.map(function(value, index, arr) {
          db.select("email").from("reap_user").where({"username": value.username}).then(row => {
            arr[index] = row[0].email;
          });
          return arr[index];
      });

      vals.invitations[0].email = "d@f.com";

      vals.invitations.map(function(value, index, arr) {
        console.log(value.email);
          const resultVals = {
              room_id: vals.room_id,
              id: vals.id,
              email: value.email,
              privilege: value.privilege,
              destinationUrl: vals.destinationUrl,
              tokenKey: vals.tokenKey
          }
          return this.invite(resultVals).then(result => {
            if (result === false) {
              arr[index].msg = 'Usuário não cadastrado ou Não enviou.';
            } else {
              arr[index].msg = 'Enviado.';
            }
          });
          return arr[index];
      });*/
  },

  leave(params) {
    // TODO
    return Promise.reject("NYI");
  },

  invite(params) {
    console.log('entrei_invite');
    const tokenData = _.pick(params, "room_id", "id", "email", "privilege");
    console.log(tokenData)

    return this.isMorePrivilegedThan(Constants.Student, params.room_id, params.inviterId).then(result => {
      if (result === false) return false;

      const user = User.retrieve({id: params.inviterId});
      const room = db.first("name").from("room").where({id: params.room_id});

      return Promise.all([user, room]);
    }).then(result => {
      if (result == false) return false;

      const [user, room] = result;

      tokenData.roomName = room.name;
      tokenData.inviter = user.name;
      const token = keyring.createToken(tokenData, {expiresIn: "7d"});

      let { destinationUrl, tokenKey = "token" } = params;
      destinationUrl += `?${tokenKey}=${token}`;

      return mailer.sendInvitation(destinationUrl, params.email, user.name, room.name);
    });
  },

  // The user must already be registered to accept an invitation.
  // Clients should handle the registration process if needs be.
  acceptInvitation(params) {
    const { token, id } = params;
    return keyring.verifyToken(token).then(data => {
      const t = {id: data.id}
      return User.retrieve(t).then(user => {
        console.log(user)
        console.log('emails')
        console.log(user.email)
        console.log(data.email) 
        const b = user.id;
        if (user.email !== data.email) return false;
        console.log('if i get here, i should be joining it');
        return this.join({...data, b});
      });
    });
  },

  verifyInvitation(params) {
    // TODO maybe get the updated room and inviter name?
    return keyring.verifyToken(params.token);
  }
}
