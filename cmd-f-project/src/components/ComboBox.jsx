import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this imports your Firestore instance

export default function ComboBox() {
  const [businessNames, setBusinessNames] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Track input value
  const [filteredOptions, setFilteredOptions] = useState([]); // Control displayed options

  useEffect(() => {
    const fetchBusinessNames = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const usersSnapshot = await getDocs(usersCollection);
        let namesList = [];

        for (const userDoc of usersSnapshot.docs) {
          const businessCollection = collection(db, "Users", userDoc.id, "businessInfo");
          const businessSnapshot = await getDocs(businessCollection);

          businessSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.businessName) {
              namesList.push(data.businessName);
            }
          });
        }

        setBusinessNames(namesList);
      } catch (error) {
        console.error("Error fetching business names:", error);
      }
    };

    fetchBusinessNames();
  }, []);

  useEffect(() => {
    if (inputValue.length > 0) {
      // Filter business names based on input
      setFilteredOptions(
        businessNames.filter((name) =>
          name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]); // Hide options if input is empty
    }
  }, [inputValue, businessNames]);

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions} // Show options only when user types
      sx={{ width: 300 }}
      onInputChange={(event, value) => setInputValue(value)} // Track user input
      renderInput={(params) => <TextField {...params} label="Select Business" />}
    />
  );
}
