import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("datos");
const todoslosjuegos = db.collection('juegos');
const todoslosresultado = db.collection('resultados');


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

async function getJuegos(filter = {})
{
    await client.connect();

    const filtroVali = filterQueryToMongo(filter);

    return todoslosjuegos.find(filtroVali).toArray();
}

async function getJuegosyId(id)
{
    await client.connect();

    const juego = await todoslosjuegos.findOne({_id: new ObjectId(id)});

    let juegoName = juego.name;

    const resultados = await todoslosresultado.find({ juego_name: juegoName }).toArray();

    let jugabilidad = 0;
    let arte = 0;
    let sonido = 0;
    let tematica = 0;  
   
    resultados.forEach(g => 
    {
        jugabilidad += g.Jugabilidad;
        arte += g.Arte;
        sonido += g.Sonido;
        tematica += g.Tematica;
    }) 

    const object = 
    {
        ...juego,
        "puntajes": 
        {
            Jugabilidad: jugabilidad/(resultados.length),
            Arte: arte/(resultados.length),
            Sonido: sonido/(resultados.length),
            Tematica: tematica/(resultados.length),
        }
        
    }

    console.log(juego);
    
   return object
}

async function getPuntaje(id)
{
    await client.connect();

    const juego = await todoslosjuegos.findOne({_id: new ObjectId(id)});

    let juegoName = juego.name;

    const resultados = await todoslosresultado.find({ juego_name: juegoName }).toArray();

     const object =
     {
         ...resultados,     
     }


    console.log(juego);
    
    return object
}

async function createJuego(juego)
{
    await client.connect();

    const nuevoJuego = { ...juego};

    await todoslosjuegos.insertOne(nuevoJuego);

    return juego;
}

async function actuJuego(id, actuDatos)
{

    await client.connect();

    const result = await todoslosjuegos.updateOne({ _id: new ObjectId(id) }, { $set: actuDatos });

    if (result.matchedCount === 1)
    {
        return todoslosjuegos.findOne({_id: new ObjectId(id)});
    } 
}

async function restaJuego(id, reDatos)
{
    await client.connect();

    const result = await todoslosjuegos.replaceOne({ _id: new ObjectId(id) }, reDatos);

    if (result.matchedCount === 1)
    {
        return todoslosjuegos.findOne({_id: new ObjectId(id)});
    }
}

const getTodosdatos = async (edicion, genero) =>
{
    try {
        await client.connect();

        const juegos = await todoslosjuegos.find({ edicion: edicion }).toArray();
      
        const totales = juegos.map(async (juego) =>
        {
            const resultados = await todoslosresultado.find({ juego_name: juego.name }).toArray();

            juego.resultados = resultados; 

            return juego;
        });
  
        const totalesJuego = await Promise.all(totales);
      
        totalesJuego.forEach((juego) =>
        {
        juego.score = juego.resultados.reduce((acc, resultado) => acc + resultado.Jugabilidad + resultado.Arte + resultado.Sonido + resultado.Tematica, 0);
        });

        totalesJuego.forEach((juego) =>
        {
            delete juego.resultados;
        });

        const juegoPuntos = totalesJuego.sort((a, b) => b.score - a.score);

        let todo;

        if(genero)
        {
            todo = juegoPuntos.filter((juego) =>
            {
                return juego.genero == genero;
            });

            if(!todo.length >= 1)
            {
                throw error;
            }

           console.log("dentro del juego: ", todo);
        }
        else
        {
            todo = juegoPuntos;
        }

        client.close();

        console.log("se esta ejecutando: ", juegoPuntos);

        return todo;
      
    }
    
    catch (error)
    {
        console.error('error:', error);
        throw error; 
    }
  };

async function deleteTodo(id)
{
    try {
            await client.connect();

            const juego = await todoslosjuegos.findOne({ _id: new ObjectId(id) });

        console.log(juego);

            juego.deleted = true; 

            const resultado = await todoslosjuegos.deleteOne({_id: new ObjectId(juego._id)});

            console.log(resultado);

            if (resultado.deletedCount === 1)
            {
                return resultado;
            }
            else
            {
                throw error;
            }
        }
        catch (error) 
        {
        console.error('error:', error);
        throw error; 
        }
}

export {
    getJuegos,
    getJuegosyId,
    createJuego,
    actuJuego,
    restaJuego,
    getTodosdatos,
    getPuntaje,
    deleteTodo
}

export default {
    getJuegos,
    getJuegosyId,
    createJuego,
    actuJuego,
    restaJuego,
    getTodosdatos,
    getPuntaje,
    deleteTodo
}
