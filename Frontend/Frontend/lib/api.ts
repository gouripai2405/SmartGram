// Mock API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper for simulating API delays
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers = [
  {
    id: '1',
    email: 'citizen@example.com',
    password: 'password123',
    name: 'Raj Kumar',
    role: 'citizen' as const,
    aadhar: '1234-5678-9012',
    phone: '9876543210',
    address: 'Village XYZ, Panchayat ABC',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Sarpanch Admin',
    role: 'admin' as const,
    phone: '9876543211',
    createdAt: new Date().toISOString(),
  },
];

// Mock data storage
const mockComplaints = [
  {
    id: '1',
    userId: '1',
    title: 'Pothole in Village Road',
    description: 'There is a large pothole near the market that needs repair',
    category: 'roads',
    status: 'in-progress' as const,
    priority: 'high' as const,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: '2',
    userId: '1',
    title: 'Water Supply Issue',
    description: 'Low water pressure in the eastern part of the village',
    category: 'utilities',
    status: 'open' as const,
    priority: 'medium' as const,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
];

const mockTaxes = [
  {
    id: '1',
    userId: '1',
    type: 'Property Tax',
    amount: 2500,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '1',
    type: 'Water Tax',
    amount: 500,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'overdue' as const,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockNotices = [
  {
    id: '1',
    title: 'Annual Panchayat Meeting',
    content: 'You are cordially invited to the annual panchayat meeting on 15th May at 3 PM',
    category: 'meetings',
    issuedDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Road Construction Work',
    content: 'Main road will be closed for construction from 1st May to 15th May',
    category: 'infrastructure',
    issuedDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

const mockReceipts = [
  {
    id: '1',
    userId: '1',
    type: 'Tax Payment',
    amount: 2500,
    transactionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    referenceNumber: 'TXN20240101001',
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    await delay();
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = Buffer.from(JSON.stringify(userWithoutPassword)).toString('base64');
    return { user: userWithoutPassword, token };
  },

  register: async (email: string, password: string, name: string) => {
    await delay();
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password,
      name,
      role: 'citizen' as const,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    const token = Buffer.from(JSON.stringify(userWithoutPassword)).toString('base64');
    return { user: userWithoutPassword, token };
  },

  verifyToken: async (token: string) => {
    await delay(100);
    try {
      const user = JSON.parse(Buffer.from(token, 'base64').toString());
      return user;
    } catch {
      throw new Error('Invalid token');
    }
  },
};

// Complaints API
export const complaintsAPI = {
  list: async () => {
    await delay();
    return mockComplaints;
  },

  get: async (id: string) => {
    await delay();
    return mockComplaints.find(c => c.id === id);
  },

  create: async (data: { title: string; description: string; category: string; priority: string }) => {
    await delay();
    const newComplaint = {
      id: String(mockComplaints.length + 1),
      userId: '1',
      ...data,
      status: 'open' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    mockComplaints.push(newComplaint);
    return newComplaint;
  },

  addComment: async (complaintId: string, comment: string) => {
    await delay();
    const complaint = mockComplaints.find(c => c.id === complaintId);
    if (!complaint) throw new Error('Complaint not found');
    const newComment = {
      id: String(Date.now()),
      userId: '1',
      userName: 'You',
      content: comment,
      createdAt: new Date().toISOString(),
    };
    if (!complaint.comments) complaint.comments = [];
    complaint.comments.push(newComment);
    return newComment;
  },
};

// Taxes API
export const taxesAPI = {
  list: async () => {
    await delay();
    return mockTaxes;
  },

  pay: async (taxId: string) => {
    await delay();
    const tax = mockTaxes.find(t => t.id === taxId);
    if (!tax) throw new Error('Tax not found');
    tax.status = 'paid' as const;
    tax.paidAt = new Date().toISOString();
    return tax;
  },
};

// Notices API
export const noticesAPI = {
  list: async () => {
    await delay();
    return mockNotices;
  },

  get: async (id: string) => {
    await delay();
    return mockNotices.find(n => n.id === id);
  },
};

// Support API
export const supportAPI = {
  createTicket: async (data: { subject: string; description: string; category: string; priority: string }) => {
    await delay();
    const newTicket = {
      id: String(Date.now()),
      userId: '1',
      ...data,
      status: 'open' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
    };
    return newTicket;
  },
};

// Receipts API
export const receiptsAPI = {
  list: async () => {
    await delay();
    return mockReceipts;
  },

  get: async (id: string) => {
    await delay();
    return mockReceipts.find(r => r.id === id);
  },
};
