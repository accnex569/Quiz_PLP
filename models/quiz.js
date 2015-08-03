/**
 * Created by luis on 02/07/15.
 */

//definicion del modelo quiz y validacion

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            pregunta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta Pregunta"}}
            },

            respuesta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta Respuesta"}}
            },
            indice: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta Indice Tematico"}}
            }
        }
    );
};