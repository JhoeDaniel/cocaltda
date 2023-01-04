export interface Payload {
  name_user: string;
  iat?: number;
  exp?: number;
}

export interface Auth {
  name_user: string;
  password_user: string;
}
