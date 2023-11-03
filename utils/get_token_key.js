// api.js

export function getAuthToken() {
  const token = localStorage.getItem(
    "84e10b8e8a7669c7ad3ba94272d13d6f2fc807ac8a51fa9f1d96e04ba2557fa8f63095879cabad8e1170d09ff615eb930f4f6f0760bafbc6cba1c8a75fe3ee4a"
  );

  if (!token) {
    // Handle the case where the token is not available (e.g., user is not authenticated)
    console.error("Authentication token not available");
    return null;
  }

  return token;
}
