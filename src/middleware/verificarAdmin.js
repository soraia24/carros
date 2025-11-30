export function verificarAdmin(req, res, next) {
   if (!req.usuario || req.usuario.role !== "admin") {
   return res.status(403).json({ mensagem: 'Acesso restrito a administradores' });
 }
  next();
}
