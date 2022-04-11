const jwt = require('jsonwebtoken');
const config = require('config');

exports.authMiddleware = (req,res,next) => {

  const token = req.headers['authorization'].split(' ')[1]
  if(!token) return res.sendStatus(401)
  jwt.verify(token, config.jwtSecretToken, (err, user) => {
    if(err) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

exports.authRole = (roles) => {
  return(req,res,next) => {
    if(!req.user){
      return res.sendStatus(401);
    }
    if(!req.user.idRole || !roles.includes(req.user.idRole)){
      return res.sendStatus(403);
    }
    next()
  }
}