import "./StudyView.css";
import { programNextReview } from "../Logic/SpaceRepeticion.js";
import { ArrowBack, Close, Replay, CheckCircle } from "@mui/icons-material";
import { useContext } from "react";
import { StudyTodayContext } from "../Context/StudyTodayContext.jsx";

function StudyView({ id, validate, study, setSudy, showCard, decks }) {
  const { studyToday, focus, showAnswer, setAnswer, showCardFocusOn } =
    useContext(StudyTodayContext);

  let { UpdateDeckCards } = showCard;

  const spaceR = ({ level }) => {
    let currentDate = new Date();
    let lastReviewDate = "";
    const nextTime = programNextReview({
      level,
      lastReviewDate: focus.lastReviewDate,
    });
    if (level === "good") {
      lastReviewDate = currentDate;
      focus.lastReviewDate = lastReviewDate;
    }
    focus.nextTime = nextTime;
    let UpdataCard = {
      front: focus.front,
      nextTime,
      id,
      cardID: focus.id,
      lastReviewDate,
    };
    UpdateDeckCards(UpdataCard);
  };

  return (
    <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-[#1e293b]/80 backdrop-blur-md rounded-2xl p-6 animate-fadeIn">
        {/* Back Button */}
        <button
          onClick={(e) => validate(e, setSudy, study)}
          className="mb-6 text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowBack /> <span>Back to Deck</span>
        </button>

        {/* Card Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 min-h-[300px] flex flex-col">
          {studyToday.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-white/60 text-sm mb-2">Front</h2>
                <p className="text-white text-xl">{focus.front}</p>
              </div>

              <div
                className={`mt-auto transition-all duration-300 ${
                  showAnswer ? "opacity-100" : "opacity-0"
                }`}
              >
                {showAnswer && (
                  <>
                    <h2 className="text-white/60 text-sm mb-2">Back</h2>
                    <p className="text-white text-xl">{focus.back}</p>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold text-white mb-4">
                Congratulations! You've finished! 🎉
              </h2>
              <span className="text-6xl">🥰</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {studyToday.length > 0 && (
          <div className="flex justify-center gap-4">
            {showAnswer ? (
              <>
                <button
                  onClick={(e) => {
                    showCardFocusOn({ id, decks });
                    spaceR({ level: "hard" });
                  }}
                  className="p-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-500 transition-all duration-200"
                >
                  <Close className="text-3xl" />
                </button>
                <button
                  onClick={(e) => {
                    showCardFocusOn({ id, decks });
                    spaceR({ level: "again" });
                  }}
                  className="p-4 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 transition-all duration-200"
                >
                  <Replay className="text-3xl" />
                </button>
                <button
                  onClick={(e) => {
                    showCardFocusOn({ id, decks });
                    spaceR({ level: "good" });
                  }}
                  className="p-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-500 transition-all duration-200"
                >
                  <CheckCircle className="text-3xl" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setAnswer(true)}
                className="px-8 py-3 bg-[var(--main-color)] hover:bg-[var(--main-color)]/80 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Show Answer
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default StudyView;
