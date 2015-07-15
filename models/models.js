/**
 * Created by luis on 02/07/15.
 */

var path = require('path');

    //cargar modelo ORM
var Sequelize = require('sequelize');

    //usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
    {
        dialect:"sqlite", storage:"quiz.sqlite"
    });

    //Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

    //exportar definicion de tabla quiz
exports.Quiz = Quiz

    //sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
        Quiz.count().success(function(count){
            if (count===0){
                Quiz.create({
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                })
                    .success(function(){console.log('BD inicializada')})
            };
        });
    }
);