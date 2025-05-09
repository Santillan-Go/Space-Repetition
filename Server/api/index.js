import express from "express";
import cors from "cors";
import { User_DB_M } from "../MODEL/Users_DB_M.js";
// import serverlessExpress from "@codegenie/serverless-express";
import { PORT } from "../config.js";

//PROBAR API EN TODOS LOS CASOS

const app = express();

app.use(
  cors({
    origin: true,
    // origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

//GET ALL USER
app.get("/", async (req, res) => {
  const result = await User_DB_M.getAllUser();
  res.json(result);

  // res.json({msg:"GOOD"});
});

//GET ONE USER
app.get("/one-user/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const body = req.body;
  if (id) {
    const result = await User_DB_M.getOneUserById({ id });

    if (result) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ error: true, Message: "This acount doesn't exist" });
    }
  } else {
    const result = await User_DB_M.getOneUser({ body });
    if (result) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ error: true, Message: "This acount doesn't exist" });
    }
  }
  //const id=parseInt(req.params.id);

  // res.json({msg:"GOOD"});
});

app.post("/one-user/", async (req, res) => {
  const body = req.body;
  // console.log(body);
  const result = await User_DB_M.getOneUser({ body });

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: true, Message: "This acount doesn't exist" });
  }
});

///PARA CREAR USER
app.post("/users", async (req, res) => {
  let input = req.body;

  const username = req.body.username;
  input = { ...input, decks: [] };
  if (!input._id) {
    input._id = Date.now();
  }
  try {
    const userFound = await User_DB_M.getUserByName({ username });
    if (userFound)
      return res.status(400).json({ message: "User Already exist" });
    const result = await User_DB_M.createOneUser({ input });
    if (!result.error) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Error to create the user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Server Internal" });
  }
});

//PARA CREAR DECKS
//ID=> USER_ID
app.post("/decks/:id", async (req, res) => {
  let deck = req.body;
  let id = parseInt(req.params.id);

  const result = await User_DB_M.createOneDeck({ deck, id });
  res.json(result);
  // res.json({msg:"GOOD"});
});

// PARA CREAR CARTAS
app.post("/decks/cards/:user/:deck", async (req, res) => {
  //id  deck
  let { user, deck } = req.params;
  let card = req.body;
  // input={...input,decks:[]}
  const result = await User_DB_M.createOneCard({ card, user, deck });
  res.json(result);
  // res.json({msg:"GOOD"});
});

// PARA ACTUALIZAR CARTAS

app.patch("/decks/cards/:user/:deck/:card", async (req, res) => {
  let { user, card, deck } = req.params;
  const input = req.body;
  // input={...input,decks:[]}
  const result = await User_DB_M.updateCardOne({ input, user, card, deck });
  res.json(result);
  // res.json({msg:"GOOD"});
});

//REMEMBER TO COMMENT THIS, VERCEL DOESN'T NEED THIS, OKAY??
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// module.exports = app;

export default app;
