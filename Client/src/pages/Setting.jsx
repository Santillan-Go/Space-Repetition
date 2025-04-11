import { useContext, useState } from "react";
import { UserDataInContext } from "../Context/UserDataIn";
import { useNavigate } from "react-router-dom";
import {
  LogoutRounded,
  ColorLens,
  KeyboardArrowDown,
} from "@mui/icons-material";

function Setting() {
  const { user } = useContext(UserDataInContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const [showColorPicker, setShowColorPicker] = useState(false);

  const logOut = () => {
    localStorage.removeItem("in");
    navigate("/login");
    // window.location.reload();
  };

  const changeColor = (e) => {
    const newColor = e.target.value;
    document.documentElement.style.setProperty("--main-color", newColor);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* User Profile Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-xl mx-auto shadow-xl">
        <div className="flex flex-col  md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--main-color)]/20 flex items-center justify-center">
              <span className="text-xl text-white font-semibold">
                {user.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              {user.username || "User"}
            </h1>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all duration-200"
          >
            <LogoutRounded /> Logout
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="max-w-xl mx-auto space-y-4">
        {/* Settings Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Settings</h2>
            <KeyboardArrowDown
              className={`text-white transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Settings Content */}
        {isOpen && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ColorLens className="text-[var(--main-color)]" />
                <span className="text-white text-lg">Theme Color</span>
              </div>
              <input
                type="color"
                onChange={changeColor}
                className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-2 border-white/10"
                value={getComputedStyle(document.documentElement)
                  .getPropertyValue("--main-color")
                  .trim()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Setting;
