import { connectDB, desconnectDB } from "./ConectDB.js";
import db from "./ConectOneDB.js";
import bcrypt from "bcrypt";

const db_name = "users_db",
  collectionName = "users";

const SALT_ROUNDS = 10; // number of salt rounds for bcrypt

//CREATE USER
// CREATE DESK
//CREAE CARD
// Updata card
//GOOD
const getAllUser = async () => {
  const collection = db.collection(collectionName);
  const result = await collection.find({}).toArray();
  return result.map((user) => ({ username: user.username, _id: user._id }));
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

  // First find user by username only
  const user = await collection.findOne({ username });

  if (!user) {
    return null;
  }

  // Compare provided password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return user;
  }

  return null;
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
    return { mensaje: "Este usuario ya existe", error: true };
  } else {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    const userWithHashedPassword = {
      ...input,
      password: hashedPassword,
    };

    const result = await collection.insertOne(userWithHashedPassword);
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

const deleteAllUser = async () => {
  const collection = db.collection(collectionName);
  const result = await collection.deleteMany({});

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
  deleteAllUser,
};
