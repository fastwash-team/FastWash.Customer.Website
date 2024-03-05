export interface ScheduleFormErrors {
  address: string;
  area: string;
  pickupDay: string;
  pickupWindow: string;
  contactperson: string;
  contactemail: string;
  phonenumber: string;
}

export interface PickupDeliveryProps {
  selectedWashType: string;
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string) => void;
  errors: ScheduleFormErrors;
}

export interface InfoMessageComponentProps {
  message: string;
  type?: string;
}

export interface CounterComponentProps {
  handleAdd: () => void;
  handleMinus: () => void;
  count: number | undefined;
}

// declare const enum WASH_TYPES {
//   prescheduled_wash = PRESCHEDULED_WASH,
//   classic_wash = CLASSIC_WASH,
// }

// type WASHTYPE = WASH_TYPES.prescheduled_wash | WASH_TYPES.classic_wash;

export interface ScheduleSummaryProps {
  // selectedWashType: WASH_TYPES.classic_wash;
  selectedWashType: string;
  pickupWindow: string;
  address: string;
  pickupDay: string;
  area?: string;
  washcount: number;
  softener: number;
  bleach: number;
  colorcatcher: number;
  stainremover: number;
  mediumLaundryBags: number;
  largeLaundryBags: number;
  contactperson?: string;
  phonenumber?: string;
  contactemail?: string;
  laundryInstructions?: string;
  total?: number;
}

export interface CustomizeWashProps {
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string | number) => void;
  errors?: ScheduleFormErrors;
}

export interface WashItem {
  itemno: string;
  status: string;
  date: string;
  extras: string[];
}

export interface PaymentItem {
  itemno: string;
  currency: string;
  amount: number;
  status: string;
  type: string;
  date: string;
}

export interface GoogleAddressInputProps {
  handleChange: (e: string) => void;
  address: string;
}

export interface FilterScheduleProps {
  filterDay: string;
  setFilterDay: (el: string) => void;
  filterSchedule: string;
  setFilterSchedule: (el: string) => void;
  filterLocation: string;
  setFilterLocation: (el: string) => void;
  priceRange: { max: number; min: number };
  setPriceRange: (el: { max: number; min: number }) => void;
  handleApplyFilter: () => void;
}

export interface FilterRequestProps {
  filterType: string;
  setFilterType: (el: string) => void;
  filterWash: string;
  setFilterWash: (el: string) => void;
  filterStatus: string;
  setFilterStatus: (el: string) => void;
  filterExtra: string;
  setFilterExtra: (el: string) => void;
  filterLocation: string;
  setFilterLocation: (el: string) => void;
  filterNote: string;
  setFilterNote: (el: string) => void;
  priceRange: { max: number; min: number };
  setPriceRange: (el: { max: number; min: number }) => void;
  handleApplyFilter: () => void;
}

export interface ScheduleInfo {
  scheduleId: string;
}

export enum UserType {
  CUSTOMER = 1,
  OPERATIONS,
  SUPERADMIN,
  INFLUENCER,
}

export enum TransactionChannel {
  PAYSTACK = 1,
  OPAY,
  WALLET,
}

export enum WashServiceType {
  PRESCHEDULED_WASH = 1,
  CLASSIC_WASH,
}
