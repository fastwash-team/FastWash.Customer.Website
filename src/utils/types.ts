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
  changePDInfo: (e: string, f: string | number) => void;
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

export interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  defaultPageSize: number;
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
  orderDate?: string;
  total?: number;
  logisticsAmount?: number;
}

export interface CustomizeWashProps {
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string | number) => void;
  errors?: ScheduleFormErrors;
  setError?: (key: string, value: string) => void;
}

export interface AdminOverviewProps {
  pendingClassic: number;
  pendingReschedule: number;
  allRequests: number;
}

export interface WashItem {
  dateCreated: string;
  washOrderId: number;
  washStatus: string;
  washOrderData: {
    washItemData: WashItemData[];
    serviceType: string;
  };
  washOrderReference: string;
}

export interface WashItemData {
  itemName: string;
  itemAmount?: number;
  numberOfItem?: number;
}

export interface WashItemDataNames {
  bleach: number;
}

export interface AdminPayment {
  washOrderReference: string;
  washOrder: {
    washStatus: string;
    serviceType: string;
    location: string;
    orderAmount: number;
    dateCreated: string;
  };
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
  resetFilters: () => void;
  timeRange: { startTime: string | null; endTime: string | null };
  setTimeRange: (el: {
    startTime: string | null;
    endTime: string | null;
  }) => void;
}

export interface FilterRequestProps {
  filterType: string;
  setFilterType: (el: string) => void;
  filterStatus: { el: string; statusEnum: number };
  setFilterStatus: (val: { el: string; statusEnum: number }) => void;
  filterLocation: string;
  setFilterLocation: (el: string) => void;
  filterNote: string;
  setFilterNote: (el: string) => void;
  priceRange: { max: number; min: number };
  setPriceRange: (el: { max: number; min: number }) => void;
  timeRange: { startTime: string | null; endTime: string | null };
  setTimeRange: (el: {
    startTime: string | null;
    endTime: string | null;
  }) => void;
  handleApplyFilter: () => void;
}

export interface WashScheduleProps {
  serviceType: string;
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
  washOrders: AdminRequest[];
}

export interface AdminRequest {
  orderAmount: number;
  orderNotes: string;
  washOrderReference: string;
  washStatus: string;
  serviceType: string;
  washOrderId: number;
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
    transactionData: { transactionAmount: number };
    orderNote: string;
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

export enum WashStatus {
  "Received" = 1,
  "Pick up" = 2,
  "Wash" = 3,
  "Dry" = 4,
  "Delivered" = 5,
  "Completed" = 6,
}

export interface RequestTracking {
  washStatus: string;
  statusNotes: string;
  dateCreated: string;
}
