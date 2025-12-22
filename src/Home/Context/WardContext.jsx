import React, { createContext, useContext, useState } from "react";
// import axios from 'axios'; // पछि axios प्रयोग गर्दा सजिलो हुन्छ

const WardContext = createContext(null);

export function WardProvider({ children }) {
  // सुरुमा खाली वा डिफल्ट डाटा राख्ने
  const [municipality, setMunicipality] = useState(
    "Kathmandu Metropolitan City"
  );
  const [ward, setWard] = useState(1);

  // यो useEffect ले पेज लोड हुने बित्तिकै डाटा तान्छ
  // अहिलेको लागि Backend API नभएकोले यो code comment गरेका छौँ।
  // पछि Backend रेडी भएपछि यसलाई uncomment गर्नुहोला।

  /*
  useEffect(() => {
    // Backend API लाई बोलाउने
    fetch("http://localhost/your-backend-api/get-ward-info.php") 
      .then((response) => response.json()) // डाटालाई JSON मा बदल्ने
      .then((data) => {
        // Backend बाट आएको डाटा यहाँ set गर्ने
        setMunicipality(data.municipality);
        setWard(data.ward);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  */

  const value = {
    municipality,
    ward,
    setMunicipality,
    setWard,
  };

  return <WardContext.Provider value={value}>{children}</WardContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWard() {
  return useContext(WardContext);
}
