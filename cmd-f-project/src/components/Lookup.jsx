"use client"

import React, { useEffect, useState, Suspense } from "react"
import { collection, getDocs, doc } from "firebase/firestore"
import { db } from "./firebase" // Ensure this points to your Firebase config

import ComboBox from "./ComboBox"
import IconChip from "./IconChip"

import "../css/lookup.css"


// Array of images
const images = [
  "https://i.pinimg.com/736x/db/7a/ff/db7aff48113e9d40f144d078a82feea4.jpg",  // Replace with your actual image paths
  "https://preview.redd.it/mqez3qnf5b881.png?width=640&crop=smart&auto=webp&s=cba30b55df1dfd100f0991aa90b42c4cd31c49cd",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdk9v0P_fvxJdmcDdtrsMBUdlpxpjbuJTn3w&s",
  "https://i.pinimg.com/736x/41/1a/de/411ade3c7a747b937f2b2321b2907756.jpg"
];

// Lazy load the MUICardImage component
const MUICardImage = React.lazy(() => import("./MUICardImage")) // Adjust the path to MUICardImage if necessary


//FOR

function Lookup() {
  const [businessData, setBusinessData] = useState([])
  const [filteredBusinessData, setFilteredBusinessData] = useState([])
  const [inputValue, setInputValue] = useState("") // Store the input value for filtering
  const [activeFilters, setActiveFilters] = useState(new Set()) // Store active filters

  // Fetch business info from Firebase
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const businessDataArray = []

      // Get all users
      const usersSnapshot = await getDocs(collection(db, "Users"))

      for (const userDoc of usersSnapshot.docs) {
        // For each user, get their businessInfo subcollection
        const businessInfoRef = collection(doc(db, "Users", userDoc.id), "businessInfo")
        const businessInfoSnapshot = await getDocs(businessInfoRef)

        businessInfoSnapshot.forEach((businessDoc) => {
          const businessData = businessDoc.data()

          const randomImage = images[Math.floor(Math.random() * images.length)];

          businessDataArray.push({
            id: businessDoc.id,
            businessName: businessData.businessName,
            description: businessData.description,
            // Add any additional properties for filtering (e.g., category, tags)
            category: businessData.category || "",
            tags: businessData.tags || [], // Store tags as an array
            splashImage: randomImage,
            
            // businessData.splashImage || "../images/Rectangle-41.png", // Add default image if none exists
          })
        })
      }

      setBusinessData(businessDataArray) // Store the fetched data in state
      setFilteredBusinessData(businessDataArray) // Initialize filtered business data
    }

    fetchBusinessInfo()
  }, []) // Empty dependency array ensures this effect runs only once on mount

  // Handle input change and filter business data immediately
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue)
    filterData(inputValue, activeFilters) // Filter with both search and filters
  }

  // Handle filter button click to toggle active filters
  const handleFilterChange = (filterValue) => {
    const updatedFilters = new Set(activeFilters)
    if (updatedFilters.has(filterValue)) {
      updatedFilters.delete(filterValue) // Remove filter if already active
    } else {
      updatedFilters.add(filterValue) // Add filter if not already active
    }
    setActiveFilters(updatedFilters)
    filterData(inputValue, updatedFilters) // Re-filter with updated filters
  }

  // Filter the data based on both the inputValue (search) and activeFilters
  const filterData = (inputValue, activeFilters) => {
    const filtered = businessData.filter((business) => {
      // Check if the business name includes the inputValue (case-insensitive)
      const matchesSearch = business.businessName.toLowerCase().includes(inputValue.toLowerCase())

      // Ensure business.tags is an array before calling .every() method
      const businessTags = Array.isArray(business.tags) ? business.tags : []

      // Check if business matches all of the active filters (AND condition for tags)
      const matchesFilters =
        activeFilters.size === 0 ||
        activeFilters.has(business.category) ||
        [...activeFilters].every((filter) => businessTags.includes(filter))

      // Return true if both search and filter conditions are met
      return matchesSearch && matchesFilters
    })

    setFilteredBusinessData(filtered)
  }

  return (

    <>
  
    <div className="lookup-container">
      
    <div className="mt-40 mb-20">
      <h1> Marketplace</h1>
      <p> A marketplace to discover and support Canadian small businesses, including women-owned, BIPOC-owned, and eco-friendly options. </p>
      </div>
      <div className="search-filter-container ">


        
        <ComboBox onInputChange={handleInputChange} /> {/* Pass the input change handler to ComboBox */}
        <IconChip activeFilters={activeFilters} onFilterChange={handleFilterChange} />{" "}
        {/* Pass active filters to IconChip */}
      </div>

      {filteredBusinessData.length > 0 ? (
        <Suspense fallback={<div className="loading-cards">Loading Cards...</div>}>
          <div className="business-cards-grid">
            {filteredBusinessData.map((business) => (
              <div key={business.id} className="business-card-wrapper text-left">
                <MUICardImage
                  businessName={business.businessName}
                  description={business.description}
                  splashImage={business.splashImage}
                />
              </div>
            ))}
          </div>
        </Suspense>
      ) : (
        <div className="no-results">No businesses found...</div> // Show a message if no businesses match the search
      )}
    </div>

    </>
  )
}

export default Lookup

