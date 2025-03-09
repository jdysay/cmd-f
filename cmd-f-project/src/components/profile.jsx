import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";


function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User document not found");
          }
        }
      });
    };
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      toast.success("User logged out successfully!", { position: "top-center" });
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-[900px] border border-rose-200 text-center">
        {userDetails ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={userDetails.photo || "/default-avatar.png"}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
              />
            </div>
            <h3 className="text-2xl font-semibold text-rose-600 mb-4">Welcome, {userDetails.firstName}! 🙏</h3>
            <div className="text-gray-700 text-left mb-6">
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>First Name:</strong> {userDetails.firstName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>

      {/* Temporary button to get to business info form */}
      <Link to="/business-info-form" className="btn">
        Go to Profile
      </Link>
    </div>
  );
}

export default Profile;
