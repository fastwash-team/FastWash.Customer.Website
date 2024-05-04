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
  dateCreated: string;
  washOrderId: number;
  washStatus: string;
  washOrderData: { washItemData: WashItemData[]; serviceType: string };
}

export interface WashItemData {
  itemName: string;
  itemAmount?: number;
  numberOfItem?: number;
}

export interface PaymentItem {
  dateCreated: string;
  transactionAmount: number;
  transactionChannel: string;
  transactionReference: string;
  transactionStatus: string;
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

export interface WashScheduleProps {
  scheduleStartTime: string;
  scheduleEndTime: string;
  dateCreated: string;
  totalWashOrders: number;
  logisticsAmount: number;
  totalLogisticsAmount: number;
  totalWashOrdersAmount: number;
  location: string;
  scheduleDate: string;
  washOrderPlanReference: string;
}

export interface AdminRequest {
  orderAmount: number;
  washOrderReference: string;
  washStatus: string;
  serviceType: string;
  washOrderData: {
    streetAddress: string;
    pickupTime: string;
    orderDate: string;
    userData: { fullName: string; phoneNumber: string; email: string };
    washItemData: [
      {
        itemName: string;
        numberOfItem: number;
      }
    ];
  };
}

export interface ScheduleInfo {
  scheduleId: string;
}

export interface WashOrderPlanData {
  logisticsAmount: number;
  scheduleDate: string;
  scheduleEndTime: string;
  scheduleStartTime: string;
}

export interface LocationSchedule {
  location: string;
  washOrderPlanData: WashOrderPlanData[];
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
  CLASSIC_WASH = 2,
}
