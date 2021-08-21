export enum MeetingState {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

export enum PaymentState {
  PAYD = "PAYD",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_PROVIDED = "NOT_PROVIDED",
}

export interface User {
  firstName: String;
  lastName: String;
  pasword: String;
  email: String;
  age?: Number;
  description?: String;
  address?: {
    country: String;
    city: String;
    street: String;
    number: Number;
  };
  formation?: {
    studies: String;
    establishment: String;
    level: String;
  };
}

export type LoginFormValues = {
  email: string;
  password: string;
};

export type OpenState = {
  isOpen: boolean;
  type: "success" | "error" | undefined;
  message: string[] | undefined;
  messageOptions?: any;
};

export type ErrorState = {
  email: boolean;
  password: boolean;
};
