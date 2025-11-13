import { UserProfileValue } from '../constants/users-profiles';

export interface ISession {
  userId: number;
  email: string;
  name: string;
  role: UserProfileValue;
}
