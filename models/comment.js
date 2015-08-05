/**
 * Created by luis on 03/08/15.
 */

// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comment',
        { texto: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta Comentario"}}
        },
            Validado:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
};