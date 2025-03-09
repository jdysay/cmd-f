import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully", { position: "top-center" });
      window.location.href = "/profile";
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-[900px] border border-rose-200" style={{ width: '30vw' }}>
        <h3 className="text-2xl font-semibold text-center mb-4 text-rose-600">Login</h3>
        {error && <p className="text-sm text-rose-600 mt-1">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1 text-left">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1 text-left">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-3 text-black">
          New user? <a href="/register" className="font-bold text-black hover:underline">Register Here</a>
        </p>
      </div>

    </div>
  );
}

export default Login;
