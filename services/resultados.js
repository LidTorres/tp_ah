import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("datos");
const todoslosResultados = db.collection('resultados');
const todoslosJueces = db.collection('jueces');
const todoslosjuegos = db.collection('juegos');

function filterQueryToMongo(filter)
{
    const filtro = {};

    for(const filed in filter)
    {
        if(isNaN(filter[filed]))
        {
            filtro[filed] = filter[filed];
        }
        else 
        {
            const [field, op] = filed.split('_');

            if(!op)
            {
                filtro[filed] = parseInt(filter[filed]);
            }
            else 
            {
                if(op === 'min')
                {
                    filtro[field] = 
                    {
                        $gte: parseInt(filter[filed])
                    }
                }
                else if(op === 'max')
                {
                    filtro[field] = 
                    {
                        $lte: parseInt(filter[filed])
                    }
                }
            } 
        }  
    }    
    return filtro;
}


async function getJueces(filter = {})
{
    await client.connect();

    const filtroVali = filterQueryToMongo(filter);

    return todoslosJueces.find(filtroVali).toArray();
}

async function getJuegos(filter = {})
{
    await client.connect();

    const filtroVali = filterQueryToMongo(filter);

    return todoslosjuegos.find(filtroVali).toArray();
}

async function getJuecesyId(id)
{
    await client.connect();

    const idJ = todoslosJueces.findOne({_id: new ObjectId(id)});

    console.log(idJ);

    return idJ;
}

async function juegosResul(idJuego)
{
    await client.connect();

    return todoslosResultados.find({juego_id: new ObjectId(idJuego)}).toArray();
}

async function totalResul(idJueces)
{
    await client.connect();

    const juez = await todoslosJueces.findOne({_id: new ObjectId(idJueces)});

    return todoslosResultados.find({juez_name: juez.name}).toArray();
}



async function createResul(idJuego, idJueces, resultado )
{ 
    await client.connect();
    try {
        const juego = await todoslosjuegos.findOne({ _id: new ObjectId(idJuego) });

        const juez = await todoslosJueces.findOne({ _id: new ObjectId(idJueces) });
        
        if (!juego || !juez) 
        {
            throw error;
        }
        
        const nuevoResul = 
        {
            ...resultado,
            juego_name: juego.name,
            judge_name: juez.name,
        }

        const resulJuez = await totalResul(idJueces);

        console.log("resultados:", resulJuez);

        let juegoID;

        const orrar = resulJuez.some( (document) => 
        {
            juegoID = document.juego_name;
            console.log("dentro del orrar:" , juegoID );
            return juegoID === juego.name;
        });

        if (orrar)
        {
            console.log("Hola: ", idJuego);

            throw new Error("voto conseguido");
        } 
        else
        {
            console.log("else");

            await todoslosResultados.insertOne(nuevoResulvo);
        }
        
        return nuevoResulvo;

    } 
    catch (error) 
    {
        throw error; 
    }
}

export default 
{
    totalResul,
    getJueces,
    juegosResul,
    getJuegos,
    getJuecesyId,
    createResul
}