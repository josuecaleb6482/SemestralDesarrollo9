const jwt = require("jsonwebtoken");
const User = require("../components/users/usuarios.service");
const { secret } = require('../config.json');

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) return res.status(403).json({ message: "No token provider" });

    const decode = await jwt.verify(token, secret);
    const {sub} = decode;

    req.userId = sub

    const user = await User.getById(sub);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

exports.isAdmin = async(req, res, next) => {
    const {user, rol} = await User.getById(req.userId);

    if(rol != 'A') return res.status(401).json({message: 'Usuario no autorizado'})

    next();
}

exports.isUser = async(req, res, next) => {
  const {user, rol} = await User.getById(req.userId);

  if(rol != 'U' || rol != 'A') return res.status(401).json({message:'Usuario no autorizado'})

  next();
}