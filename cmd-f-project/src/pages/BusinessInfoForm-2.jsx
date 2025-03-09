import { useState } from 'react';
import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firestore.js';
import './../css/BIF.css'
import React from 'react';

function BusinessInfoForm({userId}){

    async function addToDatabase(name, desc, site, email){
        try {
            // Reference to the specific user document in the 'users' collection
            const userDocRef = doc(db, "Users", userId);

            // Reference to the 'businessInfo' subcollection of the specific user document
            const ordersCollectionRef = collection(userDocRef, "businessInfo");

            // Add a new order document to the 'businessInfo' subcollection
            const docRef = await addDoc(ordersCollectionRef, {
                businessName: name,
                description: desc,
                website: site,
                businessEmail: email
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding to the database: ", e);
        }
    }

    const [inputs, setInputs] = useState({
        businessName: '',
        description: '',
        website: '',
        businessEmail: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        addToDatabase(inputs.businessName, inputs.description, inputs.website, inputs.businessEmail);
        console.log("submitted");
    }

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
              {/* Use <textarea> here */}
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
                id="businessEmail"
              />
            </label>
            <br />
    
            <input id="submit-button" type="submit" value="Submit" />
            </form>
        </>
    )

}

export default BusinessInfoForm