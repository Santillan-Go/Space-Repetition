import express from "express";
import cors from "cors";
import { User_DB_M } from "./MODEL/Users_DB_M.js";
import  {PORT } from "./config.js";


//PROBAR API EN TODOS LOS CASOS




const app=express();

app.use(cors());

app.use(express.json())

//GET ALL USER
app.get("/",async(req,res)=>{
    
    const result=await User_DB_M.getAllUser();
    res.json(result); 
        // res.json({msg:"GOOD"});
    })

//GET ONE USER
app.get("/one-user/:id",async(req,res)=>{
let id=req.params.id;
const body=req.body;
    if(id){
const result=await User_DB_M.getOneUserById({id});

if(result){
    res.json(result);
    }else{
res.status(404).json({error:true,Message:"This acount doesn't exist"})
    }

    }else{
 const result=await User_DB_M.getOneUser({body});
    if(result){
        res.json(result);
        }else{
    res.status(404).json({error:true,Message:"This acount doesn't exist"})
        }
    }
    //const id=parseInt(req.params.id);

   
    // res.json({msg:"GOOD"});
})

app.post("/one-user/",async(req,res)=>{
    const body=req.body;
    const result=await User_DB_M.getOneUser({body});
    if(result){
        res.json(result);
        }else{ 
    res.status(404).json({error:true,Message:"This acount doesn't exist"})
        }
})

///PARA CREAR USER
app.post("/users",async(req,res)=>{
    let input=req.body;
    input={...input,decks:[]}
    const result=await User_DB_M.createOneUser({input});
    if(result){
    res.json(result);
    }else{
res.status(404).json({error:true,Message:"This acount doesn't exist"})
    }

        // res.json({msg:"GOOD"});
    })

//PARA CREAR DECKS
//ID=> USER_ID
app.post("/decks/:id",async(req,res)=>{
    let deck=req.body;
    let id=parseInt(req.params.id);
  
    const result=await User_DB_M.createOneDeck({deck,id}); 
    res.json(result);
        // res.json({msg:"GOOD"});
    })
  
// PARA CREAR CARTAS
app.post("/decks/cards/:user/:deck",async(req,res)=>{
    //id  deck
    let {user,deck}=req.params;
    let card=req.body;
    // input={...input,decks:[]}
    const result=await User_DB_M.createOneCard({card,user,deck});
    res.json(result);
        // res.json({msg:"GOOD"});
    })

// PARA ACTUALIZAR CARTAS

app.patch("/decks/cards/:user/:deck/:card",async(req,res)=>{
    let {user,card,deck}=req.params;
    const input=req.body;
    // input={...input,decks:[]}
    const result=await User_DB_M.updateCardOne({input,user,card,deck});
    res.json(result);
        // res.json({msg:"GOOD"});
    })


app.listen(PORT,()=>{
    console.log(`server running on http://localhost:`+PORT);
});

// {

//     "username": "Santy",
//      "password": "San129?"
     
//  }
//http://localhost:4000/decks/cards/9/1