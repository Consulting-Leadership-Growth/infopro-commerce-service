export enum UserProfile {
  ADMIN = 'admin',
}

export type UserProfileValue = (typeof UserProfile)[keyof typeof UserProfile];
export type UserProfileCode = keyof typeof UserProfile;
