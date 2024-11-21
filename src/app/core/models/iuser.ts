export interface User {
  email: string;
  password: string;
}

export interface LoginResponse{
  token: string;
  firstTime: boolean;
}

export interface DecodedToken {
  role: string;
  email: string;
  exp: number;
}
