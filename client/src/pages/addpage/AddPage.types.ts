export interface IReservation {
  stay: {
    arrivalDate: string;
    departureDate: string;
  };
  room: {
    roomSize: string;
    roomQuantity: number;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressStreet: {
    streetName: string;
    streetNumber: string;
  };
  addressLocation: {
    zipCode: string;
    state: string;
    city: string;
  };
  extras: string[];
  payment: string;
  note: string;
  tags: string[];
  reminder: boolean;
  newsletter: boolean;
  confirm: boolean;
  id: string;
}

export const initialReservation: IReservation = {
  stay: {
    arrivalDate: "",
    departureDate: "",
  },
  room: {
    roomSize: "Standard Room",
    roomQuantity: 1,
  },
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressStreet: {
    streetName: "",
    streetNumber: "",
  },
  addressLocation: {
    zipCode: "",
    state: "",
    city: "",
  },
  extras: [],
  payment: "",
  note: "",
  tags: [],
  reminder: false,
  newsletter: false,
  confirm: false,
  id: "",
};
