export interface Member {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  splitBetween: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: Member[];
  transactions: Transaction[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}