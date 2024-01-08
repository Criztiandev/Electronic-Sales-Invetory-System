import { ReactNode } from "react";

export interface ServerErrorResponse {
  message: string;
  status: string;
}

export interface Route {
  path: string;
  element: ReactNode;
  children?: Route[];
}
