export interface LoginResponse {
      id: number;
      email: string;
      username: string;
      accessToken: string;
      refreshToken: string;
      roles: string[];
      authenticated: boolean;
}
