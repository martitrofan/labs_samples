export interface Ticket {
  id: number;
  number: string;
  title: string;
  siteId: number;
  description: string;
  status: 'New' | 'InProgress' | 'Closed' | 'Cancelled';
  createdByUserId?: number;
  assigneeUserId?: number;
}

export interface Site {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  role: 'dispatcher' | 'engineer';
}

export type Screen = 'list' | 'new' | 'login' | 'docs';
export type ListState = 'loading' | 'empty' | 'data' | 'error';
