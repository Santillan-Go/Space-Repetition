// PASAR LA URL CON PARAMETRO=>ID_USER

const getOneUser = async(url,options) => {
    
   const res= await fetch(url,options);

   const json= await res.json();
  
 return json;
};

const getOneUserById = async(url,options) => {
    
    const res= await fetch(url);
 
    const json= await res.json();
   
  return json;
 };
const createOneDeck=async(url,deck)=>{
    
const res= await fetch(url,{
    method:"POST",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify(deck)
});
const json=await res.json()

return json;

};

const createOneCard=async(url,card)=>{
const res=await fetch(url,{
    method:"POST",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify(card)

})

const json=await res.json();

return json
};


const updateCardOne=async(url,input)=>{
    const res=await fetch(url,{
        method:"PATCH",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(input)
    
    })
    
    const json=await res.json();
    
    return json

}



export const FechRequest={
    getOneUser,
    createOneCard,
    createOneDeck,
    updateCardOne,
    getOneUserById
    
}













// getOneUser("http://localhost:4000/4")
// .then(data=>{
//     console.log(data)
// })


// createOneDeck("http://localhost:4000/decks/4",{name:"English7",id:Date.now(),cards:[]})
// .then(json=>{
//     console.log(json)
// })

const date=new Date();
// createOneDeck("http://localhost:4000/decks/cards/4/1714513639720",{front:"Rythm",id:Date.now(),nextTime:date,back:"Ritmo"})
// .then(json=>{
//     console.log(json)
// })

// updateCardOne("http://localhost:4000/decks/cards/4/1714513639720/1714513701802",{nextTime:date,lastReviewDate:date})
// .then(json=>{
//     console.log(json)
// })
