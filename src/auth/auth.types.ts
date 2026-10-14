export interface SafeUser {
  id: string;
  email: string;
  fullName?: string | null;
  phoneNumber?: string | null;
  createdAt: Date;
}

export const AUTH_COOKIE = 'cycleeazy_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
