import { connectDB, desconnectDB } from "./ConectDB.js";


const db_name="users_db",
 collectionName="users";

 //CREATE USER
 // CREATE DESK
 //CREAE CARD
 // Updata card
//GOOD
const  getAllUser= async()=>{
let client;
try{
client=await connectDB();

const db= client.db(db_name);

const collection= db.collection(collectionName);
const result= await collection.find({}).toArray();
return result;

}
catch(err){
throw err
}
finally{
    if(client){
await desconnectDB(client)

    }
}
}

//GOOD

const getOneUser= async({body})=>{

    let {username,password}=body;
    let client;
    try{
    client=await connectDB();
    
    const db= client.db(db_name);
    
    const collection= db.collection(collectionName);
    const result= await collection.findOne({username,password});
    return result;
    
    }
    catch(err){
    throw err
    }
    finally{
        if(client){
    await desconnectDB(client)
    
        }
    }
    }

    const getOneUserById= async({id})=>{

        //let {username,password}=body;
        let client;
        try{
        client=await connectDB();
        
        const db= client.db(db_name);
        
        const collection= db.collection(collectionName);
        const result= await collection.findOne({_id:id});
        return result;
        
        }
        catch(err){
        throw err
        }
        finally{
            if(client){
        await desconnectDB(client)
        
            }
        }
        }

//GOOD

const createOneUser= async({input})=>{
    let client;
    try{
    client=await connectDB();
    
    const db= client.db(db_name);
    
    const collection= db.collection(collectionName);
    const result= await collection.insertOne(input);
    return result;
    
    }
    catch(err){
    throw err
    }
    finally{
        if(client){
    await desconnectDB(client)
    
        }
    }
    }


//GOOD
const createOneDeck=async({deck,id})=>{
    let client;
    try{
    client=await connectDB();
    
    const db= client.db(db_name);
    
    const collection= db.collection(collectionName);
    const result= await collection.updateOne({_id:id},{$push:{decks:deck}})
    return result;
    
    }
    catch(err){
    throw err
    }
    finally{
        if(client){
    await desconnectDB(client)
    
        }
    }
}

//GOOD
const createOneCard=async({deck,user,card})=>{
    let client;
    try{
    client=await connectDB();
    
    const db= client.db(db_name);
    
    const collection= db.collection(collectionName);
    const result= await collection.updateOne({_id:parseInt(user), "decks.id":parseInt(deck)},{$push:{"decks.$.cards":card}})
    return result;
    
    }
    catch(err){
    throw err
    }
    finally{
        if(client){
    await desconnectDB(client)
    
        }
    }
}

//===
const updateCardOne=async({user,deck,card,input})=>{
    let client;
    let {nextTime,lastReviewDate}=input
    lastReviewDate=lastReviewDate||"";
    try{
    client=await connectDB();
    
    const db= client.db(db_name);
    const collection=db.collection(collectionName);
   const result=await collection.updateOne(
        { _id: parseInt(user), "decks.id": parseInt(deck), "decks.cards.id": parseInt(card) }, // Filtro para encontrar la carta específica en el mazo del usuario
        { $set: { 
            "decks.$[deckElem].cards.$[cardElem].nextTime": nextTime ,
            "decks.$[deckElem].cards.$[cardElem].lastReviewDate": lastReviewDate
    } }, // Actualizar la propiedad nextTime de la carta
        { arrayFilters: [{ "deckElem.id": parseInt(deck) }, { "cardElem.id": parseInt(card) }] } // Filtros para los elementos del array
      )

    // const result=await collection.updateOne(
    //     { _id: parseInt(user), "decks.id": parseInt(deck), "decks.cards.id": parseInt(card) }, // Filtro para encontrar la tarjeta específica
    //     { 
    //       $set: { 
    //         "decks.$.cards.$[card].nextTime": nextTime, // Actualiza nextTime
    //         "decks.$.cards.$[card].last": last// Agrega/Actualiza last
    //       } 
    //     },
    //     { 
    //       arrayFilters: [ { "card.id": card } ] // Filtra el array de tarjetas para encontrar la tarjeta específica
    //     }
    //   );
    return result;
    
    }
    catch(err){
    throw err
    }
    finally{
        if(client){
    await desconnectDB(client)
    
        }
    }
}




export const User_DB_M={
    getOneUser,
    createOneUser
    ,createOneCard,
   createOneDeck,
   updateCardOne,
   getAllUser,
   getOneUserById
};