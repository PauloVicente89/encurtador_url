export interface ILoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}