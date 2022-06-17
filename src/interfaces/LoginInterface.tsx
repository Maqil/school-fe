export interface LoginInterface {
  email: string;
  password: string;
  rememberEmail: boolean;
}

export interface SchoolUserInterface {
  iat: number,
  role: string,
  sub: string
}