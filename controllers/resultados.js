import ResultadoJuego from '../services/resultados.js';

function getJuegos(req,res)
{
    ResultadoJuego.getJuegos(req.query)

    .catch(function(err)
    {
        res.status(500).json({msg: "no se encontro"});
    })

    .then(function(juegos)
    {
        res.status(200).json(juegos); 
    })
}

function getJueces(req,res)
{
    const {idJueces} = req.params;

    ResultadoJuego.getJueces(idJueces)

    .catch(function (err)
    {
        res.status(500).json({msg: err.msg})
    })

    .then(function(jueces)
    {
        res.json(jueces)
    })
}

function getJuecesyId(req,res)
{
    const {idJueces} = req.params;
    
    ResultadoJuego.getJuecesId(idJueces)

    .catch(function(err)
    {
        if(err?.code)
        {
            res.status(err.code).json({msg: err.msg});
        }

        else
        {
            res.status(500).json({msg: "no se logro"});
        }
    })

    .then(function(juez)
    {
        return res.status(200).json(juez)
    })
}

function getResulJueces(req,res)
{
    const {idJueces} = req.params;

    ResultadoJuego.totalResul(idJueces)

    .catch(function (err)
    {
        res.status(500).json({msg: err.msg})
    })

    .then(function(resultados)
    {
        res.json(resultados)
    })
}

function getResulJuego(req,res)
{
    const {idJuego} = req.params;

    ResultadoJuego.juegosResul(idJuego)

    .catch(function (err)
    {
        res.status(500).json({msg: err.msg})
    })

    .then(function(resultados)
    {
        res.json(resultados)
    })
}

function createResul(req,res){
    
    const {idJuego} = req.params;
    
    const {idJueces} = req.params;

    ResultadoJuego.createResul(idJuego, idJueces, req.body)
    
    .catch(function (err)
    {
        res.status(500).json({msg: "no se pudo"})
    })

    .then(function(resultados)
    {    
        res.json(resultados)
    })
}

export default {
    getResulJueces,
    getResulJuego,
    createResul,
    getJueces,
    getJuecesyId,
    getJuegos
}