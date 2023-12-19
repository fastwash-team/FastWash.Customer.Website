import { CLASSIC_WASH, PRESCHEDULED_WASH } from ".";

export interface PickupDeliveryProps {
  selectedWashType: string;
  address: string;
  changePDInfo: (e: string, f: string) => void;
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
  pickupRange: string;
  address: string;
  pickupday: string;
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
}

export interface CustomizeWashProps {
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string | number) => void;
}
