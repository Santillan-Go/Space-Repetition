import React from "react";
import { AutorenewRounded } from "@mui/icons-material";
import "./Loader.css";

function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--main-color)]/20 to-[var(--main-color)]/5 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-[var(--main-color)]/20 animate-spin" />

        {/* Inner spinning circle with gradient */}
        <div className="absolute inset-0 rounded-full border-4 gradient-border animate-spin-slow" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AutorenewRounded className="text-[var(--main-color)] text-2xl sm:text-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
