const API_URL = "https://smartgram-backend.onrender.com/api";

async function request(
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

export const authAPI = {
  login: (data: any) =>
    request("/auth/login", "POST", data),

  register: (data: any) =>
    request("/auth/register", "POST", data),
};

export const taxesAPI = {
  getTaxes: () =>
    request("/taxes"),

  payTax: (id: string) =>
    request(`/taxes/${id}/pay`, "PUT"),
};