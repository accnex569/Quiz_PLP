/**
 * Created by luis on 26/06/15.
 */

var models = require('../models/models.js');

//autoload

exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe la pregunta: quizId=' + quizId))
            }
        }
    ).catch(function (error) {
            next(error)
        });
};

// GET /quizes/question
exports.index = function (req, res) {
    var busquedas = req.query.search;
    var condition = ('%' + busquedas + '%').replace(/ /g, '%');
    if (req.query.search) {
        models.Quiz.findAll({
            where: ['pregunta like ?', condition],
            order: 'pregunta ASC'
        }).then(function (quizes) {
            res.render('quizes/index.ejs', {quizes: quizes, errors: []});
        }).catch(function (error) {
            next(error)
        });
    } else {
        models.Quiz.findAll().then(
            function (quizes) {
                res.render('quizes/index.ejs', {quizes: quizes, errors: []});
            }).catch(function (error) {
                next(error);
            })
    }
};

// GET /quizes/:id
exports.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = 'tu respuesta es Incorrecta';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'tu respuesta es Correcta';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});

};

// GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build(
        {pregunta: "Pregunta", respuesta: "Respuesta"}
    );

    res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

//Valida y  guarda en DB los campos pregunta y respuesta de quiz
    quiz
        .validate()
        .then(
        function (err) {
            if (err) {
                res.render('quizes/new', {quiz: quiz, errors: err.errors});
            } else {
                quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta"]})
                    .then(function () {
                        res.redirect('/quizes')
                    })
            }      // res.redirect: Redirección HTTP a lista de preguntas
        }
    ).catch(function (error) {
            next(error)
        });
};


// GET /quizes/:id/edit
exports.edit = function (req, res) {
    var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

    res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz
        .validate()
        .then(
        function (err) {
            if (err) {
                res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
            } else {
                req.quiz     //save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta"]})
                    .then(function () {
                        res.redirect('/quizes');
                    });
            }     // res.redirect: Redirección HTTP a lista de preguntas
        }
    ).catch(function (error) {
            next(error)
        });
};
// DELETE /quizes/:id
exports.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('/quizes');
    }).catch(function (error) {
        next(error)
    });
};