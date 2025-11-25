import React from "react";

const MembersTable = ({ members, onRemove, onRefresh }) => {
  if (!members || members.length === 0) {
    return (
      <div className="table-container">
        <h2>Team Members</h2>
        <p>No team members found.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Team Members</h2>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id || member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role || "Member"}</td>
              <td>{new Date(member.dateJoined).toLocaleDateString()}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(member._id || member.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
