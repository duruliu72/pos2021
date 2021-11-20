
module.exports = function(err, req, res, next){
    console.error(err, req, res, next);
    res.status(500).send('Something failed.',err);
}