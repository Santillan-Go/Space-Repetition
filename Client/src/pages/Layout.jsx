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

      <section
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm ${
          add ? "" : "hidden"
        }`}
      >
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-xl transition-all">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create New Deck
          </h2>

          <form onSubmit={newDeck} className="space-y-6">
            <input
              type="text"
              name="deck"
              placeholder="Deck Name"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-all"
            />

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[var(--main-color)] text-white font-semibold hover:bg-[var(--main-color)]/80 transition-all duration-200"
              >
                Create
              </button>
              <button
                type="button"
                onClick={addDeck}
                className="px-6 py-2.5 rounded-xl border-2 border-[var(--main-color)] text-white font-semibold hover:bg-[var(--main-color)]/20 transition-all duration-200"
              >
                Cancel
              </button>
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
