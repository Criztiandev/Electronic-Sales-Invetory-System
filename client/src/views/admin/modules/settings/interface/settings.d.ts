export interface MutationPayload<T> {
  UID: string;
  payload: T;
}

export interface Password {
  password: string;
  confirmPassword: string;
}
