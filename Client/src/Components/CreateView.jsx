import React, { useState } from "react";

const initialForm = {
  front: "",
  back: "",
  nextTime: "",
  lastReviewDate: "",
};

function CreateView({ validate, setCreate, create, NewCardToCurrentDeck }) {
  const [card, setCard] = useState(initialForm);

  const handleChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = (e) => {
    const nextTime = new Date();
    e.preventDefault();
    if (!card.front || !card.back) return;
    card.nextTime = nextTime;
    card.id = Date.now();
    NewCardToCurrentDeck({ card });
    setCard(initialForm);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b]/80 backdrop-blur-md rounded-2xl w-full max-w-4xl animate-fadeIn">
        <form onSubmit={handleForm} className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Create New Card</h2>
            <button
              type="button"
              onClick={(e) => validate(e, setCreate, create)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Card Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Front of card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/10">
              <label className="block text-white/60 text-sm mb-2">Front</label>
              <textarea
                onChange={handleChange}
                placeholder="Front side of the card..."
                value={card.front}
                name="front"
                className="w-full h-48 bg-transparent text-white placeholder-white/30 resize-none p-4 border-none outline-none focus:ring-2 focus:ring-[var(--main-color)] rounded-xl transition-all duration-200"
              />
            </div>

            {/* Back of card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-white/10">
              <label className="block text-white/60 text-sm mb-2">Back</label>
              <textarea
                onChange={handleChange}
                placeholder="Back side of the card..."
                value={card.back}
                name="back"
                className="w-full h-48 bg-transparent text-white placeholder-white/30 resize-none p-4 border-none outline-none focus:ring-2 focus:ring-[var(--main-color)] rounded-xl transition-all duration-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={(e) => validate(e, setCreate, create)}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[var(--main-color)] hover:bg-[var(--main-color)]/80 text-white font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-[var(--main-color)] focus:ring-offset-2 focus:ring-offset-[#1e293b]"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateView;
