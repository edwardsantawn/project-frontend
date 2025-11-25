const BASE_URL = "http://localhost:9000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

const api = {
  team: {
    getMembers: (status) =>
      fetch(`${BASE_URL}/get-team-members?status=${status}`).then(
        handleResponse
      ),

    acceptRequest: (userId) =>
      fetch(`${BASE_URL}/accept-request/${userId}`, {
        method: "POST",
      }).then(handleResponse),

    rejectRequest: (userId) =>
      fetch(`${BASE_URL}/reject-request/${userId}`, {
        method: "POST",
      }).then(handleResponse),

    removeMember: (userId) =>
      fetch(`${BASE_URL}/remove-member/${userId}`, {
        method: "DELETE",
      }).then(handleResponse),

    updateMemberRole: (userId, role) =>
      fetch(`${BASE_URL}/update-member-role/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }).then(handleResponse),
  },

  volunteers: {
    getAll: () => fetch(`${BASE_URL}/get-volunteers`).then(handleResponse),

    add: (volunteerData) =>
      fetch(`${BASE_URL}/add-volunteer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteerData),
      }).then(handleResponse),

    remove: (volunteerId) =>
      fetch(`${BASE_URL}/remove-volunteer/${volunteerId}`, {
        method: "DELETE",
      }).then(handleResponse),
  },

  // Other API categories can be added here as needed
};

export default api;
