import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
    <div className="form-container text-center">
      {userDetails ? (
        <>
          <div className="flex justify-center mb-4">
            <img
              src={userDetails.photo || "/default-avatar.png"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
            />
          </div>
          <h3>Welcome, {userDetails.firstName}! 🙏</h3>
          <div className="text-gray-700 text-left">
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
