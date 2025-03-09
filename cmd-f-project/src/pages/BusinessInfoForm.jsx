import { useState } from 'react';
import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from './../config/firestore.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './../css/BIF.css';
import React from 'react';

function BusinessInfoForm({ userId }) {
  const navigate = useNavigate(); // Initialize navigate function

  async function addToDatabase(name, desc, site, email, categories) {
    try {
      const userDocRef = doc(db, "Users", userId);
      const ordersCollectionRef = collection(userDocRef, "businessInfo");

      const docRef = await addDoc(ordersCollectionRef, {
        businessName: name,
        description: desc,
        website: site,
        businessEmail: email,
        tags: categories, // Store tags as an array
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding to the database: ", e);
    }
  }

  const [inputs, setInputs] = useState({
    businessName: "",
    description: "",
    website: "",
    businessEmail: "",
    tags: "", 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addToDatabase(inputs.businessName, inputs.description, inputs.website, inputs.businessEmail, inputs.tags);
    console.log("submitted");

    // Navigate to the success or dashboard page after submission
    navigate("/profile"); // Change "/success" to your desired route
  };

  console.log(inputs); // Add this line to log the state

  return (
    <>
      <h1>Business Info Form</h1>

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

        <label>
          Tags (comma or newline separated)
          <textarea
            name="tags"
            value={inputs.tags}
            onChange={handleChange}
            placeholder="e.g. Restaurant, Cafe, Bakery"
          />
        </label>
        <br />

        <button
          type="submit"
          className="w-full bg-custom-red text-white mt-5 py-3 px-5 rounded-lg font-medium hover:bg-custom-red-dark focus:outline-none focus:ring-2 focus:ring-rose-400 transition duration-200"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default BusinessInfoForm;
