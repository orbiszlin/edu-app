export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: Avatar;
}

export interface Avatar {
  bodyId: number;
  hatId: number;
  name: string;
}
