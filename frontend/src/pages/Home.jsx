import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the currently logged-in customer's profile
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/customers/me");
        setCustomer(data);
      } catch (error) {
        // If the user is not authenticated, redirect to login
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="home-container">
        <div className="welcome-card">
          <div className="welcome-avatar">
            {customer?.fullName?.charAt(0).toUpperCase()}
          </div>
          <h1 className="welcome-title">
            Welcome back, {customer?.fullName}! 👋
          </h1>
          <p className="welcome-subtitle">
            Here's your ShopKart profile information
          </p>

          <div className="profile-details">
            <div className="profile-item">
              <span className="profile-icon">👤</span>
              <div>
                <span className="profile-label">Full Name</span>
                <span className="profile-value">{customer?.fullName}</span>
              </div>
            </div>
            <div className="profile-item">
              <span className="profile-icon">📧</span>
              <div>
                <span className="profile-label">Email</span>
                <span className="profile-value">{customer?.email}</span>
              </div>
            </div>
            <div className="profile-item">
              <span className="profile-icon">📱</span>
              <div>
                <span className="profile-label">Phone</span>
                <span className="profile-value">{customer?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
