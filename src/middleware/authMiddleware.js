import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];


  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token, "Segurança", (err, usuarioDecodificado) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido' });
    }

    // Armazena o usuário no request, com o role incluído
    req.usuario = usuarioDecodificado;
    next();
  });
}
