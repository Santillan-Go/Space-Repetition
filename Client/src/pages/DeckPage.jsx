import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DeckContext } from "../Context/DecksContext";

import "./DeckPage.css";
import StudyView from "../Components/StudyView";
import CreateView from "../Components/CreateView";
import { StudyTodayContext } from "../Context/StudyTodayContext";
import { FechRequest } from "../Helper/FetchRequest";
import { UserDataInContext } from "../Context/UserDataIn";
import Loader from "../Components/Loader";

let deck = {
  name: "",
  cards: [],
};
function DeckPage() {
  //CONTEXTS
  const { decks, validate, setDeck } = useContext(DeckContext);
 const [currentD,setCurrentD]=useState(deck)
  const { user, loader, setLoader, setUser } = useContext(UserDataInContext);
  const { studyToday, setStudyToday, showCardFocusOn } =
    useContext(StudyTodayContext);
  const inU = JSON.parse(localStorage.getItem("in"));
  //----------------
  //MODASLS
  const [study, setStudy] = useState(false);
  const [create, setCreate] = useState(false);
  const URL =
    import.meta.env.VITE_BACKEND ||
    "https://space-repetition-back.onrender.com";
  //-------

  //ID DECK
  const { id } = useParams();
  // const [showAnswer,setAnswer]=useState(false);
  const NewCardToCurrentDeck = ({ card }) => {
    const newDecks = decks.map((d) =>
      d.id === parseInt(id) ? { ...d, cards: [...d.cards, card] } : d
    );
    const addNewCard = async () => {
      const restult = await FechRequest.createOneCard(
        `${URL}/decks/cards/${inU._id}/${id}`,
        card
      );
    };
    addNewCard();

    setDeck(newDecks);
  };

  // THIS NEEDS CARDS
  const UpdateDeckCards = ({ front, nextTime, id, cardID, lastReviewDate }) => {
    //ADD AN ID TO ALL CARDS
    let dCards = cards.map((c) =>
      c.id === cardID ? { ...c, nextTime: nextTime } : c
    );
    const UpdateTimeDeck = decks.map((d) =>
      d.id === parseInt(id) ? { ...d, cards: dCards } : d
    );
    const UpdateTime = async () => {
      id = parseInt(id);
      const result = await FechRequest.updateCardOne(
        `${URL}/decks/cards/${inU._id}/${id}/${cardID}`,
        { nextTime, lastReviewDate }
      );
      console.log(result);
    };
    UpdateTime();
    setDeck(UpdateTimeDeck);
  };
  let {name,cards}=currentD ||{name: "Default Name", cards: []};

  useEffect(()=>{
    const deckReal=decks.find(d=> d.id===parseInt(id));
   
console.log("I am here becuse this component has rendered")
console.log("new changes")
console.log(deckReal)
setCurrentD(deckReal)
  },[decks])
  useEffect(() => {
    const root = document.documentElement;
    const color_user = localStorage.getItem("color");
    root.style.setProperty("--main-color", color_user);
  }, [user]);

  const inUser = JSON.parse(localStorage.getItem("in"));

  useEffect(() => {
    console.log("user has changed");
    if (user._id && decks.length > 0) {
      deck = decks.find((d) => d.id === parseInt(id));
      // name = deck.name;
      // cards = deck.cards;
      setCurrentD(deck)
    
    } else {
      setLoader(true);
      async function GetUserIn() {
        // THIS NEEDS CARDS TO UPDATE
        const result = await FechRequest.getOneUserById(
          `${URL}/one-user/${inUser._id}`
        );
        let decks = result.decks;
        deck = decks.find((d) => d.id === parseInt(id));
        setCurrentD(deck)
      //  name = deck.name;
      //   cards = deck.cards;
        setUser(result);
        setLoader(false);
      }
      GetUserIn();
    }
  }, [user]);

  let currentDate = new Date();

  // THIS NEEDS CARDS------------
  // CADA QUE SE MUESTRE ESTE COMPONENTE CARGAMOS LAS CARTAS A ESTUDIAR
  useEffect(() => {
    if (user._id && cards.length > 0) {
      const today = cards.filter((c, i) => {
        let dateCard = new Date(c.nextTime);

        return currentDate >= dateCard;
      });
      setStudyToday(today);
    }
  }, [user]);

  ///  CADA QUE SE ACTUALICE CARDS POR SUS NUEVAS PROPIEDADES DE LOS OBJ, DEBE ACTUALIZAR STUDYTODAY
  useEffect(() => {
    // THIS NEEDS CARDS
    //user._id
    //user._id &&cards.length>0
    if (user._id && cards.length > 0) {
      const today = cards.filter((c, i) => {
        let dateCard = new Date(c.nextTime);
        return currentDate >= dateCard;
      });

      setStudyToday(today);
    }
  }, [cards]);

  let showCard = {
    UpdateDeckCards,
  };
  return (
    <>
      {!loader ? (
        <main className="main-deck-page">
          <Link className="a-back" to="/">
            <img src="/back.svg" alt="" />
          </Link>
          <div className="content-deck">
            <article className="deck-info-v">
              <h1> {name}</h1>
              <h2>Cartas: {cards.length}</h2>
            </article>
            <article className="btns-deck">
              <button
                onClick={(e) => validate(e, setCreate, create)}
                className="btn-add"
              >
                Agregar Carta
              </button>

              <button
                onClick={(e) => {
                  validate(e, setStudy, study);
                  showCardFocusOn({ id, decks });
                }}
                className="btn-study"
              >
                Estudiar
              </button>
            </article>

            {study && (
              <StudyView
                validate={validate}
                decks={decks}
                setSudy={setStudy}
                study={study}
                id={id}
                showCard={showCard}
              />
            )}
            {/*ADD NEW CARDS WITH API*/}
            {create && (
              <CreateView
                NewCardToCurrentDeck={NewCardToCurrentDeck}
                validate={validate}
                create={create}
                setCreate={setCreate}
              />
            )}
          </div>
        </main>
      ) : (
       <Loader/>
      )}
    </>
  );
}

export default DeckPage;
