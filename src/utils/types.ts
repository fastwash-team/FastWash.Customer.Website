export interface PickupDeliveryProps {
  selectedWashType: string;
  changeWashType: (e: string) => void;
}

export interface CounterComponentProps {
  handleAdd: () => void;
  handleMinus: () => void;
  count: number;
}
