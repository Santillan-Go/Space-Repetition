import { Home, Add, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function Header({ addDeck }) {
  const navigate = useNavigate();

  const goSomewhere = (e, where) => {
    navigate(where);
  };

  return (
    <header className="fixed bottom-0 mb-2 sm:sticky sm:top-5 z-[999] w-[90%] sm:w-[80%] mx-auto left-0 right-0 bg-white/10 backdrop-blur-md rounded-t-lg sm:rounded-2xl shadow-2xl sm:mt-4">
      <nav className="flex items-center justify-evenly sm:justify-center sm:gap-16 p-1 sm:p-4">
        <button
          onClick={(e) => goSomewhere(e, "/")}
          className="transition-colors duration-200 hover:bg-gray-100/10 rounded-full p-1 sm:p-2"
        >
          <Home
            className="text-[var(--main-color)] text-2xl sm:text-5xl"
            fontSize="large"
          />
        </button>

        <button
          onClick={addDeck}
          className="transition-colors duration-200 hover:bg-gray-100/10 rounded-full p-1 sm:p-2"
        >
          <Add
            className="text-[var(--main-color)] text-2xl sm:text-5xl"
            sx={{
              fontSize: "2rem",
              fontWeight: 900,
              "@media (min-width: 640px)": {
                // Changed from 768px to 640px
                fontSize: "4rem",
              },
            }}
          />
        </button>

        <button
          onClick={(e) => goSomewhere(e, "setting")}
          className="transition-colors duration-200 hover:bg-gray-100/10 rounded-full p-1 sm:p-2"
        >
          <Settings
            className="text-[var(--main-color)] text-2xl sm:text-5xl"
            fontSize="large"
          />
        </button>
      </nav>
    </header>
  );
}
