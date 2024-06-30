import "./StudyView.css";
import { programNextReview } from "../Logic/SpaceRepeticion.js";
import { useContext } from "react";
import { StudyTodayContext } from "../Context/StudyTodayContext.jsx";

function StudyView({ id, validate, study, setSudy, showCard, decks }) {
  const { studyToday, focus, showAnswer, setAnswer, showCardFocusOn } =
    useContext(StudyTodayContext);

  let { UpdateDeckCards } = showCard;

  const spaceR = ({ level }) => {
    let currentDate = new Date();
    let lastReviewDate = "";
    //JUST FOR GOOD
    //let lastReviewDate=focus.lastReviewDate;
    const nextTime = programNextReview({
      level,
      lastReviewDate: focus.lastReviewDate,
    });
    //JUST FOR GOOD
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
    <section className="viex-card">
      <button className="a-back" onClick={(e) => validate(e, setSudy, study)}>
        <img src="/back.svg" alt="" />
      </button>

      <div className="card-content-study box-shadow-1">
        {studyToday.length > 0 ? (
          <>
            <div className="front-content-card-study">
              <h2>FRENTE</h2>
              <p className="text-p">{focus.front}</p>
            </div>
            <div className="back-content-card-study">
              <p className={`text-p ${showAnswer ? "back" : ""}`}>
                {showAnswer && <h2 className="back-response-text">ATRÁS</h2>}
                {showAnswer && focus.back}
              </p>
            </div>
          </>
        ) : (
          <h2 className="congratulation-cards-text">
            !Felicidades Has terminado!
          </h2>
        )}
      </div>

      {studyToday.length > 0 ? (
        <div className="btns-card">
          {showAnswer ? (
            <>
              <button
                className="btn-close-card"
                onClick={(e) => {
                  showCardFocusOn({ id, decks });
                  spaceR({ level: "hard" });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M368 368L144 144M368 144L144 368"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  showCardFocusOn({ id, decks });
                  spaceR({ level: "again" });
                }}
                className="btn-repeat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M320 120l48 48-48 48"
                  />
                  <path
                    d="M352 168H144a80.24 80.24 0 00-80 80v16M192 392l-48-48 48-48"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                  <path
                    d="M160 344h208a80.24 80.24 0 0080-80v-16"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                </svg>
              </button>
              <button
                className="btn-good"
                onClick={(e) => {
                  showCardFocusOn({ id, decks });
                  spaceR({ level: "good" });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button
              className="show-answer-card"
              onClick={() => setAnswer(true)}
            >
              {" "}
              Mostar Respuesta
            </button>
          )}
        </div>
      ) : (
        <h2 className="congratulation-cards-emoji">🥰</h2>
      )}
    </section>
  );
}

export default StudyView;
