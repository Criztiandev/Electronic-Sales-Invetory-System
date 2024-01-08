export interface User {
  profileImg?: string;
  _id?: string;
  userName?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
}
