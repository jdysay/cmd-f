import React, { useEffect, useState, Suspense } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Ensure this points to your Firebase config

import ComboBox from '../components/ComboBox'

import "../css/lookup.css";

// Lazy load the MUICardImage component
const MUICardImage = React.lazy(() => import('../components/MUICardImage')); // Adjust the path to MUICardImage if necessary

function Lookup() {
  const [businessData, setBusinessData] = useState([]);

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
            description: businessData.description
          });
        });
      }

      setBusinessData(businessDataArray); // Store the fetched data in state
    };

    fetchBusinessInfo();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
        <ComboBox />

        {businessData.length > 0 ? (
        <Suspense fallback={<p>Loading Cards...</p>}>
            {businessData.map((business) => (
            <MUICardImage
                key={business.id}
                businessName={business.businessName}
                description={business.description}
            />
            ))}
        </Suspense>
        ) : (
        <p>Loading...</p> // Show loading state while data is being fetched
        )}
    </div>
  );
}

export default Lookup;
