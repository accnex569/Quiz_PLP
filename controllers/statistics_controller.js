/**
 * Created by luis on 06/08/15.
 */
var models = require('../models/models.js');
exports.statistics = function (req, res, next) {

    models.Quiz.findAll().then(function (quizes) {
        var nP = quizes.length;

        models.Comment.findAll().then(function (comments) {
            var nC = comments.length;

            var media = nC / nP;
            media = Math.round(media*100)/100;
            var psinC = 0;
            var pconC = 0;
            for (var i = 0; i < quizes.length; i++) {
                quizes[i].getComments().then(function (quizesComment) {
                    if (quizesComment.length === 0) {
                        psinC++;
                        calculo(i, nP, nC, media, psinC, pconC, quizes.length - 1);
                    }
                    else {
                        pconC++;
                        calculo(i, nP, nC, media, psinC, pconC, quizes.length - 1);
                    }
                });
            }
        });
    }).catch(function (error) {
        next(error)
    });

    function calculo(i, nP, nC, media, psinC, pconC, quiz) {
        if (pconC + psinC === i) {
            res.render('quizes/statistics', {
                nP: nP,
                nC: nC,
                media: media,
                psinC: psinC,
                pconC: pconC,
                errors: []
            });
        }
    }
};