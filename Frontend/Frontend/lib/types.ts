// User and Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'admin' | 'staff';
  aadhar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Complaint types
export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments?: Comment[];
}

// Tax types
export interface Tax {
  id: string;
  userId: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  createdAt: string;
  paidAt?: string;
}

// Notice types
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  issuedDate: string;
  expiryDate?: string;
  attachments?: string[];
  createdAt: string;
}

// Support Ticket types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  responses?: string[];
}

// Receipt types
export interface Receipt {
  id: string;
  userId: string;
  type: string; // tax payment, application fee, etc
  amount: number;
  transactionDate: string;
  referenceNumber: string;
  status: string;
  downloadUrl?: string;
  createdAt: string;
}

// Comment types
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
