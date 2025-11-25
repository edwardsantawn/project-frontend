import React from "react";

const IncomingRequestTable = ({ requests, onAccept, onReject }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="table-container">
        <h2>Incoming Requests</h2>
        <p>No pending requests at this time.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Incoming Requests</h2>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date Requested</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id || request.id}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{new Date(request.dateRequested).toLocaleDateString()}</td>
              <td>
                <button
                  className="accept-btn"
                  onClick={() => onAccept(request._id || request.id)}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => onReject(request._id || request.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingRequestTable;
