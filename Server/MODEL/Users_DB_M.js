import { connectDB, desconnectDB } from "./ConectDB.js";
import db from "./ConectOneDB.js";

const db_name = "users_db",
  collectionName = "users";

//CREATE USER
// CREATE DESK
//CREAE CARD
// Updata card
//GOOD
const getAllUser = async () => {
  const collection = db.collection(collectionName);
  const result = await collection.find({}).toArray();
  return result;
};

const getUserByName = async ({ username }) => {
  const collection = db.collection(collectionName);

  const result = await collection.findOne({ username });

  return result;
};

//GOOD

const getOneUser = async ({ body }) => {
  let { username, password } = body;

  const collection = db.collection(collectionName);
  const result = await collection.findOne({ username, password });
  return result;
};

const getOneUserById = async ({ id }) => {
  //let {username,password}=body;

  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: id });
  return result;
};

//GOOD

const createOneUser = async ({ input }) => {
  const collection = db.collection(collectionName);

  const userExist = await collection.findOne({ username: input.username });

  if (userExist) {
    return { mensaje: "Este usuario ya exite", error: true };
  } else {
    const result = await collection.insertOne(input);
    return result;
  }
};

//GOOD
const createOneDeck = async ({ deck, id }) => {
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { _id: id },
    { $push: { decks: deck } }
  );
  return result;
};

//GOOD
const createOneCard = async ({ deck, user, card }) => {
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { _id: parseInt(user), "decks.id": parseInt(deck) },
    { $push: { "decks.$.cards": card } }
  );
  return result;
};

//===
const updateCardOne = async ({ user, deck, card, input }) => {
  let client;
  let { nextTime, lastReviewDate } = input;
  lastReviewDate = lastReviewDate || "";

  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    {
      _id: parseInt(user),
      "decks.id": parseInt(deck),
      "decks.cards.id": parseInt(card),
    }, // Filtro para encontrar la carta específica en el mazo del usuario
    {
      $set: {
        "decks.$[deckElem].cards.$[cardElem].nextTime": nextTime,
        "decks.$[deckElem].cards.$[cardElem].lastReviewDate": lastReviewDate,
      },
    }, // Actualizar la propiedad nextTime de la carta
    {
      arrayFilters: [
        { "deckElem.id": parseInt(deck) },
        { "cardElem.id": parseInt(card) },
      ],
    } // Filtros para los elementos del array
  );

  return result;
};

export const User_DB_M = {
  getOneUser,
  createOneUser,
  createOneCard,
  createOneDeck,
  updateCardOne,
  getAllUser,
  getOneUserById,
  getUserByName,
};
