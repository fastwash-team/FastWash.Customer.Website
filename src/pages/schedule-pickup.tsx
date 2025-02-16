import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import shortUUID from "short-uuid";
import Swal from "sweetalert2";
import { phone } from "phone";
import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";

import { PickupDelivery } from "../components/schedule-pickup/pickup-delivery";
import { CustomizeWash } from "../components/schedule-pickup/customize-wash";
import { ContactDetails } from "../components/schedule-pickup/contact-details";

import { PRESCHEDULED_WASH, TRANSACTION_TAG_ENUM, WASH_PRICES } from "../utils";
import { ScheduleSummary } from "../components/schedule-pickup/schedule-summary";
import { Header } from "../components/header";
import { useFormik } from "formik";
import {
  ContactDetailsSchema,
  CustomizeWashSchema,
  PickUpInformationSchema,
} from "../utils/schemas";
import {
  ScheduleFormErrors,
  ScheduleFormTouched,
  ScheduleSummaryProps,
  TransactionChannel,
  UserType,
  WashItemDataNames,
  WashServiceType,
} from "../utils/types";
import { calculateWashPrice, errorHandler } from "../utils/functions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getSchedulePickupInformation } from "../redux-files/schedule-pickup/selector";
import { save_wash_details } from "../redux-files/schedule-pickup/reducer";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";
import { Overlay } from "../components/overlay";

export const handleGroupWashOrders = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  values: WashItemDataNames | ScheduleSummaryProps
) => {
  const washItems = [];
  if (values.washcount)
    washItems.push({
      itemName: "Washes",
      numberOfItem: values.washcount,
      itemAmount: calculateWashPrice(values.washcount),
    });
  if (values.bleach)
    washItems.push({
      itemName: "bleach",
      numberOfItem: values.bleach,
      itemAmount: values.bleach * WASH_PRICES.BLEACH,
    });
  if (values.colorcatcher)
    washItems.push({
      itemName: "Color Catcher",
      numberOfItem: values.colorcatcher,
      itemAmount: values.colorcatcher * WASH_PRICES.COLOR_CATCHER,
    });
  if (values.softener)
    washItems.push({
      itemName: "Softner",
      numberOfItem: values.softener,
      itemAmount: values.softener * WASH_PRICES.SOFTENER,
    });
  if (values.extradetergent)
    washItems.push({
      itemName: "Extra Detergent",
      numberOfItem: values.extradetergent,
      itemAmount: values.extradetergent * WASH_PRICES.EXTRA_DETERGENT,
    });
  if (values.dryersheets)
    washItems.push({
      itemName: "Dryer Sheets",
      numberOfItem: values.dryersheets,
      itemAmount: values.dryersheets * WASH_PRICES.DRYER_SHEETS,
    });
  if (values.largeLaundryBags)
    washItems.push({
      itemName: "Laundry Bags (X)",
      numberOfItem: values.largeLaundryBags,
      itemAmount: values.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS,
    });
  if (values.mediumLaundryBags)
    washItems.push({
      itemName: "Laundry Bags (E)",
      numberOfItem: values.mediumLaundryBags,
      itemAmount: values.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS,
    });
  return washItems;
};

export function SchedulePickup() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schedulePickupData = useSelector(getSchedulePickupInformation);
  const { id } = useParams();
  const [step] = useState(Number(id || 1));
  const [loading, setLoading] = useState(false);
  const [savedWashOrder] = useState<ScheduleSummaryProps | null>(
    schedulePickupData
  );

  console.log({ loading });

  console.log({ savedWashOrder });

  useEffect(() => {
    return () => {
      console.log("i am leaving schedile pickup");
    };
  }, []);

  useEffect(() => {
    if (Number(id) < 1) window.location.replace("/schedule-pickup/1");
  }, []);

  const validateScheduleFlow = () => {
    if (step === 1) return PickUpInformationSchema;
    if (step === 2) return CustomizeWashSchema;
    if (step === 3) return ContactDetailsSchema;
  };

  const handleNextStep = (values: ScheduleSummaryProps) => {
    if (Object.keys(values).length) dispatch(save_wash_details({ ...values }));
    if (step < 3) {
      window.location.replace(`/schedule-pickup/${step + 1}`);
    }
    if (step === 3) {
      const phoneNumber = values.phonenumber || "";
      const { isValid: numberIsValid, phoneNumber: formattedPhoneNumber } =
        phone(phoneNumber, {
          country: "NG",
        });
      if (!numberIsValid)
        return formik.setFieldError("phonenumber", "Invalid Phone Number");
      handleFinishScheduling({ ...values, phonenumber: formattedPhoneNumber });
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      window.location.replace(`/schedule-pickup/${step - 1}`);
      window.scrollTo({ top: 0 });
    } else navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      selectedWashType: savedWashOrder?.selectedWashType
        ? savedWashOrder.selectedWashType
        : PRESCHEDULED_WASH,
      address: savedWashOrder?.address
        ? savedWashOrder.address
        : location?.state?.address || "",
      pickupDay: savedWashOrder?.pickupDay ? savedWashOrder.pickupDay : "",
      area: savedWashOrder?.area ? savedWashOrder.area : "",
      pickupWindow: savedWashOrder?.pickupWindow
        ? savedWashOrder.pickupWindow
        : "",
      washcount: savedWashOrder?.washcount ? savedWashOrder.washcount : 0,
      softener: savedWashOrder?.softener ? savedWashOrder.softener : 0,
      largeLaundryBags: savedWashOrder?.largeLaundryBags
        ? savedWashOrder.largeLaundryBags
        : 0,
      mediumLaundryBags: savedWashOrder?.mediumLaundryBags
        ? savedWashOrder.mediumLaundryBags
        : 0,
      bleach: savedWashOrder?.bleach ? savedWashOrder.bleach : 0,
      colorcatcher: savedWashOrder?.colorcatcher
        ? savedWashOrder.colorcatcher
        : 0,
      extradetergent: savedWashOrder?.extradetergent
        ? savedWashOrder.extradetergent
        : 0,
      contactperson: savedWashOrder?.contactperson
        ? savedWashOrder.contactperson
        : "",
      contactemail: savedWashOrder?.contactemail
        ? savedWashOrder.contactemail
        : "",
      phonenumber: savedWashOrder?.phonenumber
        ? savedWashOrder.phonenumber
        : "",
      laundryInstructions: savedWashOrder?.laundryInstructions
        ? savedWashOrder.laundryInstructions
        : "",
      logisticsAmount: savedWashOrder?.logisticsAmount
        ? savedWashOrder.logisticsAmount
        : 0,
      dryersheets: savedWashOrder?.dryersheets ? savedWashOrder.dryersheets : 0,
    },
    onSubmit: (values) => {
      handleNextStep(values);
    },
    validationSchema: validateScheduleFlow,
  });

  const scheduleInfo = formik.values;

  const handleChangeInfo = (key: string, value: string | number) => {
    return formik.setFieldValue(key, value);
  };

  const handleFinishScheduling = (values: ScheduleSummaryProps) =>
    handleCreateWash(values);

  const total = useMemo(() => {
    return (
      calculateWashPrice(scheduleInfo.washcount) +
      scheduleInfo.softener * WASH_PRICES.SOFTENER +
      scheduleInfo.logisticsAmount +
      scheduleInfo.bleach * WASH_PRICES.BLEACH +
      scheduleInfo.colorcatcher * WASH_PRICES.COLOR_CATCHER +
      scheduleInfo.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS +
      scheduleInfo.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS +
      scheduleInfo.extradetergent * WASH_PRICES.EXTRA_DETERGENT +
      scheduleInfo.dryersheets * WASH_PRICES.DRYER_SHEETS
    );
  }, [scheduleInfo]);

  const handleCreateTransaction = async (
    email: string,
    amount: number,
    reference: string
  ) => {
    try {
      const {
        data: { responseObject },
      } = await axios.post(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/payment/initiate`,
        { email, amount: amount * 100, reference }
      );
      return responseObject;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  const handleCreateWash = async (values: ScheduleSummaryProps) => {
    setLoading(true);
    try {
      if (!values.contactemail) return;
      const transaction = await handleCreateTransaction(
        values.contactemail || "23",
        total,
        shortUUID.generate()
      );
      const washItems = handleGroupWashOrders(values);
      const body = {
        streetAddress: values.address,
        location: values.area,
        orderDate: values.orderDate,
        serviceType:
          values.selectedWashType === "classic-wash"
            ? WashServiceType.CLASSIC_WASH
            : WashServiceType.PRESCHEDULED_WASH,
        internalNotes: values.laundryInstructions,
        logisticsAmount: values.logisticsAmount,
        estimatedDeliveryTime: values.orderDate,
        pickupTime: values.pickupWindow,
        washItemData: washItems,
        orderNote: values.laundryInstructions,
        userData: {
          fullName: values.contactperson,
          email: values.contactemail.toLowerCase(),
          phoneNumber: values.phonenumber,
          userType: UserType.CUSTOMER,
        },
        transactionData: {
          transactionReference: transaction.reference,
          transactionAmount: total,
          transactionChannel: TransactionChannel.PAYSTACK,
          transactionTag: TRANSACTION_TAG_ENUM.MainOrder,
        },
      };
      if (values.pickupDay) {
        // we add 45 mins to maintain the date within a UTC range
        body.orderDate = moment(moment(values.pickupDay, "Do, MMM YYYY"))
          .hour(Number(values.pickupWindow.split("-")[1].split(":")[0]))
          .minute(Number(values.pickupWindow.split("-")[1].split(":")[1]))
          .add(45, "minutes")
          .utc()
          .format();
        // body.estimatedDeliveryTime = body.orderDate;
        body.estimatedDeliveryTime = moment(
          moment(values.pickupDay, "Do, MMM YYYY")
        )
          .hour(Number(values.pickupWindow.split("-")[1].split(":")[0]))
          .minute(Number(values.pickupWindow.split("-")[1].split(":")[1]))
          .add(45, "minutes")
          .utc()
          .format();
      }
      await axios.post(`${REACT_APP_API_BASE_URL}/api/WashOrders`, body);
      window.location.replace(transaction.authorizationUrl);
    } catch (error) {
      const errorMessage = errorHandler(error);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      setLoading(false);
    }
  };

  const handleTitleClick = (pageNumber: number) => {
    if (pageNumber < step)
      window.location.replace(`/schedule-pickup/${pageNumber}`);
  };

  console.log({ formik });

  return (
    <Overlay loading={false}>
      <div className='schedule-pickup'>
        <Header />
        <div className='schedule-pickup__body__flow-tracker-wrapper-mobile'>
          <p>
            <button className='_back' onClick={handleGoBack}>
              <i className='bi bi-chevron-left'></i>
            </button>
            {step === 1
              ? "Pick up & Delivery"
              : step === 2
              ? "Customize Wash"
              : step === 3
              ? "Contact Details"
              : null}
          </p>
          <p className='step-count'>Step {step} of 3</p>
        </div>

        <div className='schedule-pickup__body'>
          <div className='schedule-pickup__body__flow-tracker-wrapper'>
            <span className='_back' onClick={handleGoBack}>
              <i className='bi bi-chevron-left'></i>
            </span>
            <div
              className='schedule-pickup__body__flow-tracker'
              onClick={() => handleTitleClick(1)}
            >
              <img
                src={
                  step === 1 || step > 1 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Pick up & Delivery</p>
            </div>
            <div
              className='schedule-pickup__body__flow-tracker disabled'
              onClick={() => handleTitleClick(2)}
            >
              <img
                src={
                  step === 2 || step > 2 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Customize Wash</p>
            </div>
            <div
              className='schedule-pickup__body__flow-tracker disabled'
              onClick={() => handleTitleClick(3)}
            >
              <img
                src={step === 3 ? RadioChecked : RadioCheckedDisabled}
                alt=''
              />
              <p>Payment</p>
            </div>
          </div>

          <div className='schedule-pickup__body__steps-view'>
            <div className='row'>
              <div className='col-md-5 col-sm-12'>
                {step === 1 ? (
                  <PickupDelivery
                    selectedWashType={scheduleInfo.selectedWashType}
                    changePDInfo={(key: string, value: string | number) => {
                      handleChangeInfo(key, value);
                    }}
                    scheduleInfo={scheduleInfo}
                    touched={formik.touched as ScheduleFormTouched}
                    errors={formik.errors as ScheduleFormErrors}
                  />
                ) : step === 2 ? (
                  <CustomizeWash
                    scheduleInfo={scheduleInfo}
                    changePDInfo={(key: string, value: string | number) => {
                      handleChangeInfo(key, value);
                    }}
                  />
                ) : step === 3 ? (
                  <ContactDetails
                    scheduleInfo={scheduleInfo}
                    changePDInfo={(key: string, value: string | number) => {
                      handleChangeInfo(key, value);
                    }}
                    errors={formik.errors as ScheduleFormErrors}
                    setError={(key: string, value: string) =>
                      formik.setFieldError(key, value)
                    }
                  />
                ) : null}
                <button
                  className='mt-4 mb-5 next-button'
                  disabled={loading}
                  onClick={() => formik.handleSubmit()}
                >
                  {loading ? (
                    <div
                      className='spinner-border text-success app-spinner'
                      role='status'
                    >
                      <span className='sr-only'></span>
                    </div>
                  ) : step === 3 ? (
                    "Make Payment"
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
              <div className='col-2'></div>
              <div className='col-md-5 col-sm-12 col-summary'>
                <ScheduleSummary
                  total={total}
                  selectedWashType={scheduleInfo.selectedWashType}
                  pickupWindow={scheduleInfo.pickupWindow}
                  address={scheduleInfo.address}
                  pickupDay={scheduleInfo.pickupDay}
                  washcount={scheduleInfo.washcount}
                  area={""}
                  softener={scheduleInfo.softener}
                  bleach={scheduleInfo.bleach}
                  colorcatcher={scheduleInfo.colorcatcher}
                  extradetergent={scheduleInfo.extradetergent}
                  mediumLaundryBags={scheduleInfo.mediumLaundryBags}
                  largeLaundryBags={scheduleInfo.largeLaundryBags}
                  contactemail={scheduleInfo.contactemail}
                  contactperson={scheduleInfo.contactperson}
                  phonenumber={scheduleInfo.phonenumber}
                  logisticsAmount={scheduleInfo.logisticsAmount}
                  dryersheets={scheduleInfo.dryersheets}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
