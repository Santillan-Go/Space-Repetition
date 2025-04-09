import React, { useContext, useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
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
  const [currentD, setCurrentD] = useState(deck);
  const { user, loader, setLoader, setUser } = useContext(UserDataInContext);
  const { studyToday, setStudyToday, showCardFocusOn } =
    useContext(StudyTodayContext);
  const inU = JSON.parse(localStorage.getItem("in"));
  //----------------
  //MODASLS
  const [study, setStudy] = useState(false);
  const [create, setCreate] = useState(false);
  const URL =
    import.meta.env.VITE_BACKEND || "https://server-henna-ten.vercel.app";
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
    };
    UpdateTime();
    setDeck(UpdateTimeDeck);
  };
  let { name, cards } = currentD || { name: "Default Name", cards: [] };

  useEffect(() => {
    const deckReal = decks.find((d) => d.id === parseInt(id));

    setCurrentD(deckReal);
  }, [decks]);
  useEffect(() => {
    const root = document.documentElement;
    const color_user = localStorage.getItem("color");
    root.style.setProperty("--main-color", color_user);
  }, [user]);

  const inUser = JSON.parse(localStorage.getItem("in"));

  useEffect(() => {
    if (user._id && decks.length > 0) {
      deck = decks.find((d) => d.id === parseInt(id));
      // name = deck.name;
      // cards = deck.cards;
      setCurrentD(deck);
    } else {
      setLoader(true);
      async function GetUserIn() {
        // THIS NEEDS CARDS TO UPDATE
        const result = await FechRequest.getOneUserById(
          `${URL}/one-user/${inUser._id}`
        );
        let decks = result.decks;
        deck = decks.find((d) => d.id === parseInt(id));
        setCurrentD(deck);
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

  const studyViewProps = {
    validate,
    decks,
    setSudy: setStudy,
    study,
    id,
    showCard,
  };

  const createViewProps = {
    NewCardToCurrentDeck,
    validate,
    create,
    setCreate,
  };

  return (
    <>
      {!loader ? (
        <main className="min-h-screen bg-gradient-to-br from-[var(--main-color)]/5 to-[var(--main-color)]/20 backdrop-blur-sm p-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-colors duration-200"
          >
            <ArrowBack fontSize="large" />
          </Link>

          <div className="max-w-4xl mx-auto mt-8">
            <article className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
              <h2 className="text-white/80 text-lg">
                Cards: <span className="font-semibold">{cards.length}</span>
              </h2>
            </article>

            <article className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={(e) => validate(e, setCreate, create)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <span className="text-lg">+ Add Card</span>
              </button>

              <button
                onClick={(e) => {
                  validate(e, setStudy, study);
                  showCardFocusOn({ id, decks });
                }}
                className="px-6 py-3 bg-[var(--main-color)] hover:bg-[var(--main-color)]/80 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <span className="text-lg">Study Now</span>
              </button>
            </article>

            {study && <StudyView {...studyViewProps} />}
            {create && <CreateView {...createViewProps} />}
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default DeckPage;
