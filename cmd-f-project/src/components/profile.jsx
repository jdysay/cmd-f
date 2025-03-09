import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";


function Profile({ userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [inputs, setInputs] = useState({
    businessName: "",
    description: "",
    website: "",
    businessEmail: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setInputs({
              businessName: docSnap.data().businessName || "",
              description: docSnap.data().description || "",
              website: docSnap.data().website || "",
              businessEmail: docSnap.data().businessEmail || "",
            });
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

   // Handle form change
   const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle form submit to update user data
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Reference to the specific user document
      const userDocRef = doc(db, "Users", userId);

      // Update the user details in Firestore
      await updateDoc(userDocRef, {
        businessName: inputs.businessName,
        description: inputs.description,
        website: inputs.website,
        businessEmail: inputs.businessEmail,
      });

      toast.success("Profile updated successfully!", { position: "top-center" });

      // Re-fetch the user data after updating
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());  // Set updated data
        setInputs({
          businessName: docSnap.data().businessName || "",
          description: docSnap.data().description || "",
          website: docSnap.data().website || "",
          businessEmail: docSnap.data().businessEmail || "",
        });
      } else {
        console.log("User document not found");
      }

      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

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
            <h3 className="text-2xl font-semibold text-rose-600 mb-4">
              Welcome, {userDetails.firstName}! 🙏
            </h3>
            <div className="text-gray-700 text-left mb-6">
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>First Name:</strong> {userDetails.firstName}</p>
              {/* Display the business info */}
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <label>
                    Business Name
                    <input
                      type="text"
                      name="businessName"
                      value={inputs.businessName}
                      onChange={handleChange}
                    />
                  </label>
                  <br />

                  <label>
                    Description of your business
                    <textarea
                      name="description"
                      value={inputs.description}
                      onChange={handleChange}
                    />
                  </label>
                  <br />

                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      value={inputs.website}
                      onChange={handleChange}
                    />
                  </label>
                  <br />

                  <label>
                    Business Email
                    <input
                      type="text"
                      name="businessEmail"
                      value={inputs.businessEmail}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="mb-6">
                  <p><strong>Business Name:</strong> {userDetails.businessName}</p>
                  <p><strong>Description:</strong> {userDetails.description}</p>
                  <p><strong>Website:</strong> {userDetails.website}</p>
                  <p><strong>Business Email:</strong> {userDetails.businessEmail}</p>
                </div>
              )}
            </div>

            {/* Edit Profile or Logout Button */}
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200 mt-4"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}


export default Profile;
