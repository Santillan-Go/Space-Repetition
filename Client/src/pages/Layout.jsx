import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { DeckContext } from "../Context/DecksContext";
import { UserDataInContext } from "../Context/UserDataIn";
import { FechRequest } from "../Helper/FetchRequest";
import Loader from "../Components/Loader";

function Layout() {
  const { user, setUser, setLoader, loader } = useContext(UserDataInContext);
  const navigate = useNavigate();
  const inUser = JSON.parse(localStorage.getItem("in")) || "";
  const URL =
    import.meta.env.VITE_BACKEND || "https://server-henna-ten.vercel.app";
  useEffect(() => {
    if (!user._id) {
      setLoader(true);
      async function GetUserIn() {
        const result = await FechRequest.getOneUserById(
          `${URL}/one-user/${inUser._id}`
        );

        setUser(result);
        setLoader(false);
      }
      GetUserIn();
    }
  }, []);

  const [add, setAdd] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const color_user = localStorage.getItem("color");
    root.style.setProperty("--main-color", color_user);
  }, []);

  if (!inUser) {
    navigate("/login");
  }

  const { setDeck, decks } = useContext(DeckContext);

  const addDeck = (e) => {
    if (add) return setAdd(false);

    return setAdd(true);
  };

  const newDeck = (e) => {
    e.preventDefault();
    const name = e.target.deck.value;
    if (!name) return;

    setDeck((oldstate) => {
      const CreateDeck = async () => {
        await FechRequest.createOneDeck(`${URL}/decks/${inUser._id}`, {
          name,
          cards: [],
          id: Date.now(),
        });
      };
      CreateDeck();
      setAdd(false);
      return [...oldstate, { name, cards: [], id: Date.now() }];
    });

    e.target.reset();
  };

  return (
    <>
      <Header setAdd={setAdd} add={add} addDeck={addDeck} />

      <section className={`modal-add ${add ? "" : "none"}`}>
        <div className="content-modal">
          <h2 className="text-center">Crear Mazo</h2>

          <form onSubmit={newDeck} className="form-add-modal">
            <input
              type="text"
              name="deck"
              placeholder="Nombre del Mazo"
              autoComplete="off"
            />
            <div className="btns-add">
              <input type="submit" value="Crear" />
              <input type="button" onClick={addDeck} value="Cancelar" />
            </div>
          </form>
        </div>
      </section>
      <main className="main">
        <Outlet />
      </main>

      {loader && <Loader />}
    </>
  );
}

export default Layout;
