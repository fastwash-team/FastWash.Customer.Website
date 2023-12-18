import { CLASSIC_WASH, PRESCHEDULED_WASH } from ".";

export interface PickupDeliveryProps {
  selectedWashType: string;
  address: string;
  changePDInfo: (e: string, f: string) => void;
}

export interface CounterComponentProps {
  handleAdd: () => void;
  handleMinus: () => void;
  count: number;
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
  area: string;
}
