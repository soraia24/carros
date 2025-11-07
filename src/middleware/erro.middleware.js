
export default function erro (err, req, res, next){
     console.error(`[Erro] ${err.message}`);

    const statusCode = err.statusCode || err.status || 500;

    const response = {
        sucesso: false,
        mensagem: err.message || 'Erro interno do servidor',
    };

    if(err.details){
        response.detalhes = err.details;
    }

    res.status(statusCode).json(response);
}

