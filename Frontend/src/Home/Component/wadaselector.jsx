import { useState, useEffect } from "react";
import { useWard } from "../Context/WardContext";
import "./wadaselector.css";

// Mock data from API (example)
const mockMunicipalities = [
  {
    name: "Kathmandu Metropolitan City",
    totalWards: 32,
  },
  {
    name: "Lalitpur Metropolitan City",
    totalWards: 29,
  },
  {
    name: "Bhaktapur Municipality",
    totalWards: 10,
  },
  {
    name: "Kirtipur Municipality",
    totalWards: 10,
  },
  { name: "Tokha Municipality", totalWards: 11 },
  {
    name: "Chandragiri Municipality",
    totalWards: 15,
  },
];

const WardSelector = ({ onWardSelect }) => {
  const { municipality, ward, setMunicipality, setWard } = useWard();
  const [isOpen, setIsOpen] = useState(false);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Future API call will be here
    setMunicipalities(mockMunicipalities);
    // Initialize from context
    if (municipality) {
      const muniObj = mockMunicipalities.find((m) => m.name === municipality);
      if (muniObj) setSelectedMunicipality(muniObj);
    }
    if (ward) setSelectedWard(ward);
  }, [municipality, ward]);

  const filteredMunicipalities = municipalities.filter((municipality) => {
    return municipality.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setMunicipality(municipality.name);
    setSearchTerm("");
  };

  const selectWard = (wardNumber) => {
    setSelectedWard(wardNumber);
    if (selectedMunicipality) {
      setWard(wardNumber);
      setMunicipality(selectedMunicipality.name);
      onWardSelect && onWardSelect(selectedMunicipality.name, wardNumber);
    }
    setIsOpen(false);
  };

  const handleBack = () => {
    setSelectedMunicipality(null);
    setSelectedWard(null);
  };

  // Text to display on button
  const getDisplayText = () => {
    if (selectedMunicipality && selectedWard) {
      return isMobile
        ? `Ward ${selectedWard}`
        : `${selectedMunicipality.name} - Ward ${selectedWard}`;
    }
    if (municipality && ward) {
      return isMobile ? `Ward ${ward}` : `${municipality} - Ward ${ward}`;
    }
    return "Select Ward";
  };

  const displayText = getDisplayText();

  return (
    <div className="ward-selector-container">
      <button className="ward-selector-button" onClick={toggleDropdown}>
        <i className="icon-map-pin">📍</i>
        <span>{displayText}</span>
        <i className={`arrow-icon ${isOpen ? "up" : ""}`}>▲</i>
      </button>

      {isOpen && (
        <>
          <div
            className="ward-selector-backdrop"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="ward-selector-dropdown">
            <button
              className="close-dropdown-mobile"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            {!selectedMunicipality ? (
              <>
                <h3 className="dropdown-title">Municipality</h3>
                <div className="search-box">
                  <i className="icon-search">🔍</i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search municipality..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ul className="municipality-list">
                  {filteredMunicipalities.map((muni) => (
                    <li
                      key={muni.name}
                      className="municipality-list-item"
                      onClick={() => selectMunicipality(muni)}
                    >
                      <span className="municipality-name">{muni.name}</span>
                      <span className="ward-count">
                        {muni.totalWards} Wards
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="ward-grid-view">
                <button className="back-button" onClick={handleBack}>
                  &larr; Back
                </button>
                <h4 className="selected-municipality-title">
                  {selectedMunicipality.name}
                </h4>
                <div className="ward-grid">
                  {Array.from(
                    { length: selectedMunicipality.totalWards },
                    (_, i) => i + 1
                  ).map((wardNum) => (
                    <button
                      key={wardNum}
                      className="ward-grid-item"
                      onClick={() => selectWard(wardNum)}
                    >
                      {wardNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WardSelector;
