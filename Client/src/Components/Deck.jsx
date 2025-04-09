import React from "react";
import { Link } from "react-router-dom";

function Deck({ deck }) {
  let { name, cards, image = false, id } = deck;
  let length = cards.length ? cards.length : "0";

  return (
    <article className="relative group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl w-full">
      {image ? (
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      ) : (
        <Link to={`/deck/${id}`} className="block">
          <div className="w-full h-48 bg-gradient-to-br from-[var(--main-color)]/20 to-[var(--main-color)]/40 flex items-center justify-center">
            <span className="text-6xl text-white/50">🃏</span>
          </div>
        </Link>
      )}

      <div className="p-4 bg-white/5">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[var(--main-color)]/20 text-white text-sm">
            {length} Cards
          </span>
        </div>
      </div>
    </article>
  );
}

export default Deck;
