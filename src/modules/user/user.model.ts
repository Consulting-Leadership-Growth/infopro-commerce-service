export interface User {
  id: number;
  email: string;
  name: string;
  userName: string;
  password: string;
  role?: string;
  createdAt: Date;
}
