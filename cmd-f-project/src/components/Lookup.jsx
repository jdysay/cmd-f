"use client"

import React, { useEffect, useState, Suspense } from "react"
import { collection, getDocs, doc } from "firebase/firestore"
import { db } from "../components/firebase" // Ensure this points to your Firebase config

import ComboBox from "../components/ComboBox"
import IconChip from "../components/IconChip"

import "../css/lookup.css"

import Navbar from "../components/navbar"

import defaultImage from "../images/Rectangle-41.png"

// Array of images
const images = [
  "../src/assets/totes.jpg",
  "../src/assets/clothing.jpg",
  "../src/assets/earring.jpg",
  "../src/assets/sticker.jpg",
  "../src/assets/bracelets.jpg",
  "../src/assets/candle1.jpg",
  "../src/assets/candle2.jpg",
  "../src/assets/corchet animals.jpg",
  "../src/assets/crochet.jpg",
  "../src/assets/earring.jpg",
];

const MUICardImage = React.lazy(() => import("../components/MUICardImage"))

function Lookup() {
  const [businessData, setBusinessData] = useState([])
  const [filteredBusinessData, setFilteredBusinessData] = useState([])
  const [inputValue, setInputValue] = useState("") 
  const [activeFilters, setActiveFilters] = useState(new Set())
  
  // Declare state for shuffled image pool
  const [shuffledImages, setShuffledImages] = useState([])

  // Shuffle images and store the shuffled array
  useEffect(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5); // Shuffle the images array
    setShuffledImages(shuffled);
  }, []);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const businessDataArray = []
      let imageIndex = 0; // Index to keep track of which image to use

      // Get all users
      const usersSnapshot = await getDocs(collection(db, "Users"))

      for (const userDoc of usersSnapshot.docs) {
        const businessInfoRef = collection(doc(db, "Users", userDoc.id), "businessInfo")
        const businessInfoSnapshot = await getDocs(businessInfoRef)

        businessInfoSnapshot.forEach((businessDoc) => {
          const businessData = businessDoc.data()
          
          // Assign the next image from shuffledImages
          const randomImage = shuffledImages[imageIndex % shuffledImages.length]; // Loop back to the start if all images are used
          imageIndex++;

          businessDataArray.push({
            id: businessDoc.id,
            uid: userDoc.id, // Store the UID
            businessName: businessData.businessName,
            description: businessData.description,
            category: businessData.category || "",
            tags: businessData.tags || [],
            splashImage: randomImage,
          })
        })
      }

      setBusinessData(businessDataArray)
      setFilteredBusinessData(businessDataArray)
    }

    // Only run this effect once all images have been shuffled
    if (shuffledImages.length > 0) {
      fetchBusinessInfo()
    }
  }, [shuffledImages]) // Re-run when shuffledImages is updated

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue)
    filterData(inputValue, activeFilters)
  }

  const handleFilterChange = (filterValue) => {
    const updatedFilters = new Set(activeFilters)
    if (updatedFilters.has(filterValue)) {
      updatedFilters.delete(filterValue)
    } else {
      updatedFilters.add(filterValue)
    }
    setActiveFilters(updatedFilters)
    filterData(inputValue, updatedFilters)
  }

  const filterData = (inputValue, activeFilters) => {
    const filtered = businessData.filter((business) => {
      const matchesSearch = business.businessName.toLowerCase().includes(inputValue.toLowerCase())
      const businessTags = Array.isArray(business.tags) ? business.tags : []
      const matchesFilters =
        activeFilters.size === 0 ||
        activeFilters.has(business.category) ||
        [...activeFilters].every((filter) => businessTags.includes(filter))

      return matchesSearch && matchesFilters
    })

    setFilteredBusinessData(filtered)
  }

  return (
    <>
      <Navbar/>
      <div className="lookup-container">
        <div className="mt-40 mb-20">
          <h1>Marketplace</h1>
          <p>A marketplace to discover and support Canadian small businesses, including women-owned, BIPOC-owned, and eco-friendly options.</p>
        </div>
        
        <div className="search-filter-container">
          <ComboBox onInputChange={handleInputChange} />
          <IconChip activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        </div>

        {filteredBusinessData.length > 0 ? (
          <Suspense fallback={<div className="loading-cards">Loading Cards...</div>}>
            <div className="business-cards-grid">
              {filteredBusinessData.map((business) => (
                <div key={business.id} className="business-card-wrapper text-left">
                  <MUICardImage
                    uid={business.uid} // Pass UID to the component
                    businessName={business.businessName}
                    description={business.description}
                    splashImage={business.splashImage} // Pass random splashImage
                  />
                </div>
              ))}
            </div>
          </Suspense>
        ) : (
          <div className="no-results">No businesses found...</div>
        )}
      </div>
    </>
  )
}

export default Lookup
