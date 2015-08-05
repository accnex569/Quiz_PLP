/**
 * Created by luis on 04/08/15.
 */

var users = {
    admin: {id: 1, username: "admin", password: "1234"},
    pepe: {id: 2, username: "pepe", password: "5678"},
    Luis: {id: 3, username: "Luis", password: "hola123"}
};


exports.autenticar = function (login, password, callback) {
    if (users[login]) {
        if (password === users[login].password) {
            callback(null, users[login]);
        }
        else {
            callback(new Error('Contraseña errónea.'));
        }
    } else {
        callback(new Error('No existe el usuario.'));
    }
};