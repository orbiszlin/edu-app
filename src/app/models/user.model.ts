export interface User {
  id: number;
  email: string;
  password: string;
  avatar: Avatar;
}

export interface Avatar {
  body_id: number;
  hat_id: number;
  name: string;
}
