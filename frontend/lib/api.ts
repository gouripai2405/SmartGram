// ==============================
// API CONFIG
// ==============================
const API_BASE_URL = "http://smartgram-backend.onrender.com/api";

const getToken = () => {
  const token =
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token");

  return token && token !== "undefined" ? token : null;
};

// 🔥 SAFE HEADER BUILDER
const getAuthHeaders = () => {
  const token = getToken();
  console.log('TOKEN:', token);

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==============================
// RESPONSE HANDLER
// ==============================
const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Invalid response (not JSON)");
  }
};

// ==============================
// AUTH API
// ==============================
export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(res);
  },

  register: async (email: string, password: string, name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password, name }),
    });

    return handleResponse(res);
  },
};

// ==============================
// COMPLAINTS API
// ==============================
export const complaintsAPI = {
  list: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/complaints`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  create: async (data: {
    title: string;
    description: string;
    category: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/complaints`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },
};

// ==============================
// TAXES API
// ==============================
export const taxesAPI = {
  list: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/taxes`, {
      headers: getAuthHeaders(),
    });

    return handleResponse(res);
  },
  pay: async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/taxes/${id}/pay`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
  },
};

// ==============================
// NOTICES API
// ==============================
export const noticesAPI = {
  list: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },
};

// ==============================
// RECEIPTS API
// ==============================
export const receiptsAPI = {
  list: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/receipts`, {
      headers: getAuthHeaders(),
    });

    return handleResponse(res);
  },
};

// ==============================
// SUPPORT API
// ==============================
export const supportAPI = {
  createTicket: async (data: {
    subject: string;
    description: string;
    category: string;
    priority: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/support`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },
};

// ==============================
// PROPERTIES API
// ==============================

export const propertiesAPI = {
  list: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`, {
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(res);
    if (Array.isArray(result)) {
      return result;
    }

    if (result && Array.isArray((result as any).properties)) {
      return (result as any).properties;
    }

    return [];
  },
};