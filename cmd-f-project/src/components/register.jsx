import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './../css/BIF.css'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

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
      navigate("/business-info-form");
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h3 className="register-title">Sign Up</h3>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister}>
            <div className="container">
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                        <input
                        type="text"
                        placeholder="Enter your last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
            </div>
        
          <div>
            <label>Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>

        <p className="login-link">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
