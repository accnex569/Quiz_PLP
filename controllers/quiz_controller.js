/**
 * Created by luis on 26/06/15.
 */
// GET /quizes/question
exports.question = function (req, res) {
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function (req, res) {
    if (req.query.respuesta === 'Roma') {
        res.render('quizes/answer', {respuesta: 'tu respuesta es Correcta'});
    } else {
        res.render('quizes/answer', {respuesta: 'tu respuesta es Incorrecta'});
    }
};