import jwt from 'jsonwebtoken';

export function autenticarTokenOptional(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.usuario = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET || "Segurança", (err, decoded) => {
    if (err) {
      req.usuario = null;
    } else {
      req.usuario = decoded;
    }
    next();
  });
}
