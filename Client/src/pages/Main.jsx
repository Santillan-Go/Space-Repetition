import React, { useContext } from "react";

import "./Main.css";
import Deck from "../Components/Deck";
import { DeckContext } from "../Context/DecksContext";

function Main() {
  const { decks } = useContext(DeckContext);

  return (
    <>
      {Array.isArray(decks) ? (
        <>
          <section className="sticky top-2 sm:top-16 md:top-24 z-40 px-1 sm:px-2 md:px-4 py-1 sm:py-2 mb-8 bg-white/15 backdrop-blur-md rounded-xl shadow-lg max-w-[600px] mt-4 mx-auto border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
                  <span className="text-[var(--main-color)] font-bold">
                    DECKS:
                  </span>{" "}
                  {decks.length}
                </h2>
              </div>

              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-[var(--main-color)]/10 p-2">
                <img
                  src="/brain.png"
                  alt="Brain Logo"
                  className="w-full h-full object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
          </section>

          {/* <h2 className='title-decks'>  Decks</h2> */}
          <section className="container mx-auto px-4">
            {decks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {decks.map((d, i) => (
                  <Deck key={i} deck={d} />
                ))}
              </div>
            ) : (
              <h2 className="text-white text-xl text-center">
                No decks created yet
              </h2>
            )}
          </section>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default Main;
