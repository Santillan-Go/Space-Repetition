import React from "react";
import { AutoStories } from "@mui/icons-material";

function Loader_Form({ text }) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 ">
      <div className="bg-white/10 backdrop-blur-md  rounded-2xl shadow-xl flex flex-col items-center gap-4 p-10 max-w-[650px]">
        <div className="animate-spin-slow relative">
          <AutoStories
            className="text-[var(--main-color)] text-4xl sm:text-5xl animate-pulse"
            fontSize="large"
          />
        </div>
        <h2 className="text-white/90 text-lg sm:text-xl font-medium animate-pulse">
          {text}
        </h2>
      </div>
    </div>
  );
}

export default Loader_Form;
