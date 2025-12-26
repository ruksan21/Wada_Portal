/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const API_URL = "http://localhost/my-react-app/Backend/api";

  // Admin/Backend Simulation State
  const [allUsers, setAllUsers] = useState([]);
  const [pendingOfficers, setPendingOfficers] = useState([]);
  const [wards, setWards] = useState([]);

  // Load initial data
  useEffect(() => {
    // 1. Load Current User
    const storedUser = localStorage.getItem("user");
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedIn === "true") {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);

      // Load activities for current user
      const storedActivities = localStorage.getItem(
        `activities_${userData.id || "default"}`
      );
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      }
    }

    // 2. Load "Backend" Data (All Users & Pending Officers)
    const storedAllUsers = localStorage.getItem("allUsers");
    if (storedAllUsers) {
      setAllUsers(JSON.parse(storedAllUsers));
    } else {
      // Seed initial data if empty
      const initialUsers = [
        {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          status: "active",
        },
        {
          id: 2,
          name: "Ram Bahadur",
          email: "ram@example.com",
          role: "user",
          status: "active",
        },
      ];
      setAllUsers(initialUsers);
      localStorage.setItem("allUsers", JSON.stringify(initialUsers));
    }

    // 2. Load Pending Officers from Backend
    const fetchPendingOfficers = async () => {
      try {
        const response = await fetch(`${API_URL}/get_pending_officers.php`);
        const data = await response.json();
        if (data.success) {
          setPendingOfficers(data.data);
        }
      } catch (error) {
        console.error("Error fetching pending officers:", error);
      }
    };
    fetchPendingOfficers();

    // 3. Load Wards Data (Mock for now)
    const storedWards = localStorage.getItem("wards");
    if (storedWards) {
      setWards(JSON.parse(storedWards));
    } else {
      // Seed initial Ward data
      const initialWards = Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        name: `Ward ${i + 1}`,
        location: "Kathmandu",
        contact: `01-443322${i}`,
        chairperson: {
          name: "Not Assigned",
          bio: "",
          image: null,
          message: "",
        },
      }));
      setWards(initialWards);
      localStorage.setItem("wards", JSON.stringify(initialWards));
    }

    setLoading(false);
  }, []);

  // --- Auth Functions ---

  const login = (userData) => {
    // In a real app, we'd verify against `allUsers` database here.
    // For now, we trust the `userData` passed from Login component or check mock.

    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    logActivity("login", "Login successfully");
    addNotification("success", "Login successfully");
  };

  const logout = () => {
    if (user) {
      logActivity("logout", "Logged out");
    }
    setUser(null);
    setIsLoggedIn(false);
    setActivities([]);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  // --- User/Profile Functions ---

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));

    // Also update in allUsers list if applicable
    const updatedAllUsers = allUsers.map((u) =>
      u.email === user.email ? { ...u, ...updatedData } : u
    );
    setAllUsers(updatedAllUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedAllUsers));

    logActivity("profile_update", "Profile information updated");
  };

  const updateProfilePhoto = (photoUrl) => {
    const newUserData = { ...user, photoUrl };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));

    // Also update in allUsers list
    const updatedAllUsers = allUsers.map((u) =>
      u.email === user.email ? { ...u, photoUrl } : u
    );
    setAllUsers(updatedAllUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedAllUsers));

    logActivity("photo_change", "Profile photo updated");
    addNotification("success", "Profile photo updated successfully");
  };

  // --- Admin / Management Functions ---

  const registerUser = (userData) => {
    // If officer, add to pendingOfficers
    if (userData.role === "officer") {
      const newOfficer = { ...userData, id: Date.now(), status: "pending" };
      const updatedPending = [...pendingOfficers, newOfficer];
      setPendingOfficers(updatedPending);
      localStorage.setItem("pendingOfficers", JSON.stringify(updatedPending));
      return {
        success: true,
        message: "Officer application submitted for review.",
      };
    }
    // If citizen/user, add to allUsers directly
    else {
      const newUser = { ...userData, id: Date.now(), status: "active" };
      const updatedUsers = [...allUsers, newUser];
      setAllUsers(updatedUsers);
      localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
      return { success: true, message: "Registration successful." };
    }
  };

  // Admin creating officer directly
  const createOfficer = (officerData) => {
    // Check if ID already exists
    const exists = allUsers.some(
      (u) =>
        u.employeeId === officerData.employeeId ||
        u.officerId === officerData.officerId
    );
    if (exists) {
      return { success: false, message: "Officer ID already exists." };
    }

    const newOfficer = {
      ...officerData,
      id: Date.now(),
      role: "officer",
      status: "active", // Created by admin, so active immediately
      joinedDate: new Date().toLocaleDateString("en-GB"),
    };

    const updatedUsers = [...allUsers, newOfficer];
    setAllUsers(updatedUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    addNotification("success", `Officer ${officerData.name} created.`);
    return { success: true, message: "Officer created successfully." };
  };

  const approveOfficer = async (officerId) => {
    try {
      const response = await fetch(`${API_URL}/update_officer_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: officerId, status: "active" }),
      });
      const data = await response.json();
      if (data.success) {
        setPendingOfficers(pendingOfficers.filter((o) => o.id !== officerId));
        addNotification("success", "Officer approved successfully.");
      } else {
        addNotification("error", data.message);
      }
    } catch {
      addNotification("error", "Failed to approve officer.");
    }
  };

  const rejectOfficer = async (officerId) => {
    try {
      const response = await fetch(`${API_URL}/update_officer_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: officerId, status: "rejected" }),
      });
      const data = await response.json();
      if (data.success) {
        setPendingOfficers(pendingOfficers.filter((o) => o.id !== officerId));
        addNotification("info", "Officer application rejected.");
      } else {
        addNotification("error", data.message);
      }
    } catch {
      addNotification("error", "Failed to reject officer.");
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = allUsers.filter((u) => u.id !== userId);
    setAllUsers(updatedUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    addNotification("success", "User deleted successfully.");
  };

  // Ward Management
  const updateWard = (wardId, wardData) => {
    const updatedWards = wards.map((w) =>
      w.id === wardId ? { ...w, ...wardData } : w
    );
    setWards(updatedWards);
    localStorage.setItem("wards", JSON.stringify(updatedWards));
    addNotification("success", `Ward ${wardData.number} updated successfully.`);
  };

  // System Stats (for Reports)
  const getSystemStats = () => {
    const totalUsers = allUsers.filter((u) => u.role === "user").length;
    const totalOfficers = allUsers.filter((u) => u.role === "officer").length;
    const totalWards = wards.length;

    return {
      totalUsers,
      totalOfficers,
      totalWards,
      revenue: 4500000, // Mock
    };
  };

  // --- Utility Functions ---

  const addNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type, // 'success', 'error', 'info', 'warning'
      message,
    };
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const logActivity = (activityType, description) => {
    const activity = {
      id: Date.now(),
      type: activityType,
      description,
      timestamp: new Date().toISOString(),
    };

    const newActivities = [activity, ...activities];
    setActivities(newActivities);
    const userId = user?.id || "default";
    localStorage.setItem(`activities_${userId}`, JSON.stringify(newActivities));
  };

  const hasRole = (role) => user?.role === role;
  const hasPermission = (permission) =>
    user?.permissions?.includes(permission) || false;

  const value = {
    user,
    isLoggedIn,
    loading,
    notifications,
    activities,
    allUsers, // Exposed for Admin
    pendingOfficers, // Exposed for Admin
    wards, // Exposed for Admin
    login,
    logout,
    updateUser,
    updateProfilePhoto,
    registerUser,
    approveOfficer,
    rejectOfficer,
    deleteUser,
    createOfficer,
    updateWard,
    getSystemStats,
    addNotification,
    removeNotification,
    logActivity,
    hasRole,
    hasPermission,
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
