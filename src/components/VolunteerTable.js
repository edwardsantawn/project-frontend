import React, { useState } from "react";
import api from "../services/api";

const VolunteerTable = ({ volunteers, onRefresh }) => {
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    email: "",
    skills: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddVolunteer = async (e) => {
    e.preventDefault();
    try {
      await api.volunteers.add(newVolunteer);
      setNewVolunteer({ name: "", email: "", skills: "" });
      setShowAddForm(false);
      onRefresh();
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };

  const handleRemoveVolunteer = async (volunteerId) => {
    try {
      await api.volunteers.remove(volunteerId);
      onRefresh();
    } catch (error) {
      console.error("Error removing volunteer:", error);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Volunteers</h2>
        <button
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Volunteer"}
        </button>
      </div>

      {showAddForm && (
        <form className="add-volunteer-form" onSubmit={handleAddVolunteer}>
          <input
            type="text"
            placeholder="Name"
            value={newVolunteer.name}
            onChange={(e) =>
              setNewVolunteer({ ...newVolunteer, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newVolunteer.email}
            onChange={(e) =>
              setNewVolunteer({ ...newVolunteer, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Skills"
            value={newVolunteer.skills}
            onChange={(e) =>
              setNewVolunteer({ ...newVolunteer, skills: e.target.value })
            }
          />
          <button type="submit">Add Volunteer</button>
        </form>
      )}

      {!volunteers || volunteers.length === 0 ? (
        <p>No volunteers found.</p>
      ) : (
        <table className="volunteers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id || volunteer.id}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.skills}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemoveVolunteer(volunteer._id || volunteer.id)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VolunteerTable;
