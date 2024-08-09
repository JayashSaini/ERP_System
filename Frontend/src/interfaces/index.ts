export interface UserAvatar {
  url: string;
  public_id: string | null;
  _id: string;
}

export interface UserInterface {
  _id: string;
  avatar: UserAvatar;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  favorites: string[];
  enrollments: string[];
  loginType: "EMAIL_PASSWORD" | "GOOGLE";
  isEmailVerified: boolean;
  __v: number;
}

export interface ApiResponse {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface AuthState {
  user: UserInterface | null;
  email: string | null;
  token: string | null;
  isLoading: boolean;
}
