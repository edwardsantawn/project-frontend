import React, { useEffect, useState } from "react";
import api from "../services/api";
import IncomingRequestTable from "./IncomingRequestTable";
import MembersTable from "./MembersTable";
import VolunteerTable from "./VolunteerTable";
import "../styles/user-management.css";

const UserManagement = () => {
  const [showIncomingRequests, setShowIncomingRequests] = useState(true);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncomingRequests();
    fetchTeamMembers();
    fetchVolunteers();
  }, []);

  const fetchIncomingRequests = async () => {
    try {
      const data = await api.team.getMembers("pending");
      setIncomingRequests(data);
    } catch (error) {
      setError("Error fetching incoming requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const data = await api.team.getMembers("accepted");
      setTeamMembers(data);
    } catch (error) {
      setError("Error fetching team members");
    }
  };

  const fetchVolunteers = async () => {
    try {
      const data = await api.volunteers.getAll();
      setVolunteers(data);
    } catch (error) {
      setError("Error fetching volunteers");
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      await api.team.acceptRequest(userId);
      // Refresh the data
      fetchIncomingRequests();
      fetchTeamMembers();
    } catch (error) {
      setError("Error accepting request");
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      await api.team.rejectRequest(userId);
      fetchIncomingRequests();
    } catch (error) {
      setError("Error rejecting request");
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await api.team.removeMember(userId);
      fetchTeamMembers();
    } catch (error) {
      setError("Error removing member");
    }
  };

  const toggleVolunteers = () => {
    setShowVolunteers(!showVolunteers);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-management-main-container">
      <div className="user-management-header">
        <h1>User Management</h1>
        <div className="view-toggles">
          <button
            className={`toggle-btn ${showIncomingRequests ? "active" : ""}`}
            onClick={() => setShowIncomingRequests(true)}
          >
            Incoming Requests ({incomingRequests.length})
          </button>
          <button
            className={`toggle-btn ${!showIncomingRequests ? "active" : ""}`}
            onClick={() => setShowIncomingRequests(false)}
          >
            Team Members ({teamMembers.length})
          </button>
          <button
            className={`toggle-btn ${showVolunteers ? "active" : ""}`}
            onClick={toggleVolunteers}
          >
            Volunteers ({volunteers.length})
          </button>
        </div>
      </div>

      <div className="user-management-content">
        {showVolunteers ? (
          <VolunteerTable volunteers={volunteers} onRefresh={fetchVolunteers} />
        ) : showIncomingRequests ? (
          <IncomingRequestTable
            requests={incomingRequests}
            onAccept={handleAcceptRequest}
            onReject={handleRejectRequest}
          />
        ) : (
          <MembersTable
            members={teamMembers}
            onRemove={handleRemoveMember}
            onRefresh={fetchTeamMembers}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
