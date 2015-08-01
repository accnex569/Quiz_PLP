/**
 * Created by luis on 26/06/15.
 */

var models = require('../models/models.js');

//autoload

exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else { next(new Error('No existe la pregunta: quizId=' + quizId)); }
        }
    ).catch(function(error) { next(error);});
};

// GET /quizes/question
exports.index = function (req, res) {
    models.Quiz.findAll().then(function(quizes) {
        res.render('quizes/index', {quizes: quizes});
    }).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz});
   };

// GET /quizes/:id/answer
exports.answer = function (req, res) {
        var resultado = 'tu respuesta es Incorrecta';
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'tu respuesta es Correcta';
        }
        res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});

};