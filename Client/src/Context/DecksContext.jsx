import { createContext, useContext, useEffect, useState } from "react";
import { UserDataInContext } from "./UserDataIn";

const DeckContext = createContext();

const mazosStorage = [];
const DeckProvider = ({ children }) => {
  const { user, setUser } = useContext(UserDataInContext);

  const mazos = user.decks;
  const validate = (event, state, currentV) => {
    if (currentV) return state(false);
    return state(true);
  };

  const [decks, setDeck] = useState(mazosStorage);
  useEffect(() => {
    setDeck(mazos);
  }, [user, user._id]);

  const data = { decks, setDeck, validate };
  return <DeckContext.Provider value={data}>{children}</DeckContext.Provider>;
};

export default DeckProvider;

export { DeckContext };
