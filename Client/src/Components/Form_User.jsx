import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initial = {
  username: "",
  password: "",
};

function Form_User({ Status, nameBtn, children }) {
  const [user, setUser] = useState(initial);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username && user.password) {
      Status(user);
    }
    setUser(initial);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl"
    >
      <div className="space-y-4">
        {/* Username Input */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-white/80 text-sm font-medium"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            autoComplete="off"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-all duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-white/80 text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!user.username || !user.password}
        className="w-full py-3 px-4 bg-[var(--main-color)] hover:bg-[var(--main-color)]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 focus:ring-2 focus:ring-[var(--main-color)] focus:ring-offset-2 focus:ring-offset-[#1e293b]"
      >
        {nameBtn}
      </button>

      {children}
    </form>
  );
}

export default Form_User;
