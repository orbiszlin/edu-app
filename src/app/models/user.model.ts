export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: Avatar;
}

export interface Avatar {
  bodyName: string;
  hatId: number;
  alias: string;
}
