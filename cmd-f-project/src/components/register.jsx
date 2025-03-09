import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }

      toast.success("User Registered Successfully!", { position: "top-center" });
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-[900px]" style={{ width: '30vw' }}>
        <h3 className="text-5xl font-semibold text-center mb-10 text-custom-purple">Sign Up</h3>

        {error && <p className="text-sm text-custom-red mt-1">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-10">
            <label className="block text-xl font-medium text-custom-purple mb-1 text-left">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="mb-10">
            <label className="block text-xl font-medium text-custom-purple mb-1 text-left">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="mb-10">
            <label className="block text-xl font-medium text-custom-purple mb-1 text-left">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="mb-10">
            <label className="block text-xl font-medium text-custom-purple mb-1 text-left">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-red text-white py-2 px-4 rounded-lg font-medium hover:bg-custom-red-dark focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-3 text-custom-purple">
          Already registered? <a href="/login" className="font-bold text-custom-peach-dark hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
