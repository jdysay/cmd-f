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
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center" >
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 sm:p-8 w-full max-w-[800px]" style={{ width: '100vw' }}>
      <h3 className="text-5xl font-semibold text-center mb-4 text-custom-purple">Login</h3>
      {error && <p className="text-sm text-rose-600 mt-1">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-xl font-medium text-custom-purple mb-2 mt-10 text-left">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-custom-peach-medium bg-white focus:outline-none focus:ring-2 focus:ring-custom-peach-dark text-gray-700 placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-custom-purple mb-1 text-left">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-custom-peach-medium bg-white focus:outline-none focus:ring-2 focus:ring-custom-peach-dark text-gray-700 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custom-red text-white mt-5 py-3 px-5 rounded-lg font-medium hover:bg-custom-red-dark focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-5 text-custom-purple">
        New user? <a href="/register" className="font-bold text-custom-peach-dark hover:underline">Register Here</a>
      </p>
    </div>
  </div>

  );
}

export default Login;
