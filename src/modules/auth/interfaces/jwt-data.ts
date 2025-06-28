export interface IJwtData {
  sub: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}
