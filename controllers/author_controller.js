/**
 * Created by luis on 26/06/15.
 */
// GET /author
/*exports.author = function (req, res) {
   res.render('author', {nombres: 'Luis Prieto'});
};*/

exports.author = function autor (req, res, next){
    res.locals.correo = 'accnex569@hotmail.com';
    res.locals.edad = '31';
    res.locals.ubicacion = 'Maracay - Venezuela';
    res.render('author', { nombres: 'Luis Prieto C'});
};
