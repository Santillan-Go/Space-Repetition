import { Home, Add, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function Header({ addDeck }) {
  const navigate = useNavigate();

  const goSomewhere = (e, where) => {
    navigate(where);
  };

  return (
    <header className="bg-opacity-50 mt-4  shadow-2xl bg-white/10 backdrop-blur-md  w-[90%] max-w-6xl mx-auto rounded-2xl ">
      <nav className="flex items-center justify-center gap-16 py-4">
        <button onClick={(e) => goSomewhere(e, "/")} className="">
          <Home
            className="text-[var(--main-color)] text-5xl rounded-full hover:bg-gray-100/10 transition-colors duration-200"
            fontSize="large"
          />
        </button>

        <button className=" " onClick={addDeck}>
          <Add
            className="text-[var(--main-color)] font-bold text-5xl  rounded-full hover:bg-gray-100/10 transition-colors duration-200"
            fontSize="large"
            fontWeight={"bold"}
            sx={{
              fontSize: "4rem",
              fontWeight: 900,
            }}
          />
        </button>

        <button onClick={(e) => goSomewhere(e, "setting")} className="">
          <Settings
            className="text-[var(--main-color)]  rounded-full hover:bg-gray-100/10 transition-colors duration-200 "
            fontSize="large"
          />
        </button>
      </nav>
    </header>
  );
}
