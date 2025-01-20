export const WASH_PRICES = {
  LOGISTICS: 1000,
  WASH: 3500,
  TWO_WASHES: 6100,
  SOFTENER: 350,
  BLEACH: 300,
  COLOR_CATCHER: 500,
  EXTRA_DETERGENT: 350,
  E_LAUNDRY_BAGS: 3000,
  X_LAUNDRY_BAGS: 5500,
  EXTRA_WASH: 2200,
  DRYER_SHEETS: 350,
};
export const PRESCHEDULED_WASH = "pre-scheduled";

export const CLASSIC_WASH = "classic-wash";

export const supportedAreas = [
  "Yaba/Shomolu",
  "Lekki Phase I",
  "Surulere",
  "Maryland Ikeja",
  "Gbagada",
  "Ikoyi/VI",
];

export const PAYMENT_TYPES = {
  WALLET: "wallet",
  PAYSTACK: "paystack",
  OPAY: "opay",
  PAY_FOR_ME: "pay-for-me",
};

export const WashServiceTypeEnum = {
  PRESCHEDULED_WASH: 1,
  CLASSIC_WASH: 2,
};

export const UserTypeEnum = {
  CUSTOMER: 1,
  OPERATIONS: null,
  SUPERADMIN: null,
  INFLUENCER: null,
};

export const TransactionChannelEnum = {
  PAYSTACK: 1,
  OPAY: null,
  WALLET: null,
};

export const TransactionTagEnum = {
  MainOrder: 1,
  AdditionalOrder: 2,
};
