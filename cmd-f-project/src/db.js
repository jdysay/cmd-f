import { collection, getDocs } from "firebase/firestore"; 
import { db } from './config/firestore.js';

const fetchBusinesses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "/business"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };
  
fetchBusinesses();
