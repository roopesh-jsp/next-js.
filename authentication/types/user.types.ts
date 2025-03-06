export type UserT = {
  name: string;
  email: string;
  password: string;
};

export type userResT = {
  message: string;
  success: boolean;
  newUser?: UserT;
  user?: UserT;
};
