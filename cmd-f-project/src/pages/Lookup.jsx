import React, { useEffect, useState, Suspense } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Ensure this points to your Firebase config

import ComboBox from '../components/ComboBox';
import IconChip from '../components/IconChip';

// Lazy load the MUICardImage component
const MUICardImage = React.lazy(() => import('../components/MUICardImage')); // Adjust the path to MUICardImage if necessary

function Lookup() {
  const [businessData, setBusinessData] = useState([]);
  const [filteredBusinessData, setFilteredBusinessData] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Store the input value for filtering
  const [activeFilters, setActiveFilters] = useState(new Set()); // Store active filters

  // Fetch business info from Firebase
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const businessDataArray = [];

      // Get all users
      const usersSnapshot = await getDocs(collection(db, "Users"));
      
      for (const userDoc of usersSnapshot.docs) {
        // For each user, get their businessInfo subcollection
        const businessInfoRef = collection(doc(db, "Users", userDoc.id), "businessInfo");
        const businessInfoSnapshot = await getDocs(businessInfoRef);

        businessInfoSnapshot.forEach((businessDoc) => {
          const businessData = businessDoc.data();
          businessDataArray.push({
            id: businessDoc.id,
            businessName: businessData.businessName,
            description: businessData.description,
            // Add any additional properties for filtering (e.g., category, tags)
            category: businessData.category || "",
            tags: businessData.tags || [] // Store tags as an array
          });
        });
      }

      setBusinessData(businessDataArray); // Store the fetched data in state
      setFilteredBusinessData(businessDataArray); // Initialize filtered business data
    };

    fetchBusinessInfo();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handle input change and filter business data immediately
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    filterData(inputValue, activeFilters); // Filter with both search and filters
  };

  // Handle filter button click to toggle active filters
  const handleFilterChange = (filterValue) => {
    const updatedFilters = new Set(activeFilters);
    if (updatedFilters.has(filterValue)) {
      updatedFilters.delete(filterValue); // Remove filter if already active
    } else {
      updatedFilters.add(filterValue); // Add filter if not already active
    }
    setActiveFilters(updatedFilters);
    filterData(inputValue, updatedFilters); // Re-filter with updated filters
  };

    // Filter the data based on both the inputValue (search) and activeFilters
    const filterData = (inputValue, activeFilters) => {
        const filtered = businessData.filter((business) => {
        // Check if the business name includes the inputValue (case-insensitive)
        const matchesSearch = business.businessName.toLowerCase().includes(inputValue.toLowerCase());
    
        // Ensure business.tags is an array before calling .every() method
        const businessTags = Array.isArray(business.tags) ? business.tags : [];
    
        // Check if business matches all of the active filters (AND condition for tags)
        const matchesFilters = activeFilters.size === 0 || 
                                activeFilters.has(business.category) || 
                                [...activeFilters].every(filter => businessTags.includes(filter));
    
        // Return true if both search and filter conditions are met
        return matchesSearch && matchesFilters;
    });
  
    setFilteredBusinessData(filtered);
  };

  return (
    <div>
      <ComboBox onInputChange={handleInputChange} /> {/* Pass the input change handler to ComboBox */}
      <IconChip activeFilters={activeFilters} onFilterChange={handleFilterChange} /> {/* Pass active filters to IconChip */}

      {filteredBusinessData.length > 0 ? (
        <Suspense fallback={<p>Loading Cards...</p>}>
          {filteredBusinessData.map((business) => (
            <MUICardImage
              key={business.id}
              businessName={business.businessName}
              description={business.description}
            />
          ))}
        </Suspense>
      ) : (
        <p>No businesses found...</p> // Show a message if no businesses match the search
      )}
    </div>
  );
}

export default Lookup;
