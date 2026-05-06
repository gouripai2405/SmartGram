const API_URL = "https://smartgram-backend.onrender.com/api";

export async function apiRequest(
  endpoint: string,
  method = "GET",
  body?: any
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
}