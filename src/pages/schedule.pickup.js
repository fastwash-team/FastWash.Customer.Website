import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Overlay } from "../components/overlay";
import { useEffect, useMemo, useState } from "react";
import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";
import { PickUpDelivery } from "../components/booking-steps/pickup.delivery";
import { useFormik } from "formik";
import {
  PRESCHEDULED_WASH,
  TransactionChannelEnum,
  TransactionTagEnum,
  UserTypeEnum,
  WASH_PRICES,
  WashServiceTypeEnum,
} from "../utils/constants";
import { PickUpInformationSchema } from "../schemas/PickupDelivery.Schema";
import { ContactDetailsSchema } from "../schemas/ContactDetails.Schema";
import { CustomizeWashSchema } from "../schemas/CustomizeWash.Schema";
import { OrderSummary } from "../components/booking-steps/order.summary";
import { calculateWashPrice, errorHandler } from "../utils/functions";
import { CustomizeWash } from "../components/booking-steps/customize.wash";
import { ContactDetails } from "../components/booking-steps/contact.details";
import Swal from "sweetalert2";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import axios from "axios";
import moment from "moment";
import shortUUID from "short-uuid";
import phone from "phone";

export function SchedulePickup() {
  const { id } = useParams();
  const location = useLocation();
  const [step] = useState(Number(id || 1));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [savedWashOrder] = useState({ ...location.state });

  useEffect(() => {
    if (![1, 2, 3].includes(Number(id)))
      return window.location.replace(`/schedule-pickup/1`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateScheduleFlow = () => {
    if (step === 1) return PickUpInformationSchema;
    if (step === 2) return CustomizeWashSchema;
    if (step === 3) return ContactDetailsSchema;
  };

  const formik = useFormik({
    initialValues: {
      selectedWashType: savedWashOrder?.selectedWashType
        ? savedWashOrder.selectedWashType
        : PRESCHEDULED_WASH,
      address: savedWashOrder?.address ? savedWashOrder.address : "",
      pickupDay: savedWashOrder?.pickupDay ? savedWashOrder.pickupDay : "",
      area: savedWashOrder?.area ? savedWashOrder.area : "",
      pickupWindow: savedWashOrder?.pickupWindow
        ? savedWashOrder.pickupWindow
        : "",
      washCount: savedWashOrder?.washCount ? savedWashOrder.washCount : 1,
      softener: savedWashOrder?.softener ? savedWashOrder.softener : 1,
      largeLaundryBags: savedWashOrder?.largeLaundryBags
        ? savedWashOrder.largeLaundryBags
        : 0,
      mediumLaundryBags: savedWashOrder?.mediumLaundryBags
        ? savedWashOrder.mediumLaundryBags
        : 0,
      bleach: savedWashOrder?.bleach ? savedWashOrder.bleach : 0,
      colorCatcher: savedWashOrder?.colorCatcher
        ? savedWashOrder.colorCatcher
        : 0,
      extraDetergent: savedWashOrder?.extraDetergent
        ? savedWashOrder.extraDetergent
        : 0,
      contactPerson: savedWashOrder?.contactPerson
        ? savedWashOrder.contactPerson
        : "",
      contactEmail: savedWashOrder?.contactEmail
        ? savedWashOrder.contactEmail
        : "",
      phoneNumber: savedWashOrder?.phoneNumber
        ? savedWashOrder.phoneNumber
        : "",
      laundryInstructions: savedWashOrder?.laundryInstructions
        ? savedWashOrder.laundryInstructions
        : "",
      logisticsAmount: savedWashOrder?.logisticsAmount
        ? savedWashOrder.logisticsAmount
        : 0,
      dryerSheets: savedWashOrder?.dryerSheets ? savedWashOrder.dryerSheets : 0,
    },
    onSubmit: (values) => {
      handleNextStep(values);
    },
    validationSchema: validateScheduleFlow,
  });
  const scheduleInfo = formik.values;

  const handleNextStep = (values) => {
    if (step < 3) {
      navigate(`/schedule-pickup/${step + 1}`, {
        state: { ...values },
      });
      return window.location.replace(`/schedule-pickup/${step + 1}`);
    }
    if (step === 3) {
      const phoneNumber = values.phoneNumber || "";
      const { isValid: numberIsValid, phoneNumber: formattedPhoneNumber } =
        phone(phoneNumber, {
          country: "NG",
        });
      if (!numberIsValid)
        return formik.setFieldError("phoneNumber", "Invalid Phone Number");
      handleFinishScheduling({ ...values, phoneNumber: formattedPhoneNumber });
    }
  };

  const handleFinishScheduling = (values) => handleCreateWash(values);

  const handleGoBack = () => {
    if (step > 1) {
      navigate(`/schedule-pickup/${step - 1}`, {
        state: { ...savedWashOrder },
      });
      window.location.replace(`/schedule-pickup/${step - 1}`);
      window.scrollTo({ top: 0 });
    } else navigate(-1);
  };

  const handleTitleClick = (pageNumber) => {
    if (pageNumber < step)
      window.location.replace(`/schedule-pickup/${pageNumber}`);
    return;
  };

  const handleChangeInfo = (key, value) => formik.setFieldValue(key, value);

  const total = useMemo(() => {
    return (
      calculateWashPrice(scheduleInfo.washCount) +
        scheduleInfo.softener * WASH_PRICES.SOFTENER +
        scheduleInfo.logisticsAmount +
        scheduleInfo.bleach * WASH_PRICES.BLEACH +
        scheduleInfo.colorCatcher * WASH_PRICES.COLOR_CATCHER +
        scheduleInfo.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS +
        scheduleInfo.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS +
        scheduleInfo.extraDetergent * WASH_PRICES.EXTRA_DETERGENT +
        scheduleInfo.dryerSheets * WASH_PRICES.DRYER_SHEETS || 0
    );
  }, [scheduleInfo]);

  const handleCreateTransaction = async (email, amount, reference) => {
    try {
      const {
        data: { responseObject },
      } = await axios.post(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/payment/initiate`,
        { email, amount: amount * 100, reference }
      );
      return responseObject;
    } catch (error) {
      throw error;
    }
  };

  const handleGroupWashOrders = (values) => {
    const washItems = [];
    if (values.washCount)
      washItems.push({
        itemName: "Washes",
        numberOfItem: values.washCount,
        itemAmount: calculateWashPrice(values.washCount),
      });
    if (values.bleach)
      washItems.push({
        itemName: "bleach",
        numberOfItem: values.bleach,
        itemAmount: values.bleach * WASH_PRICES.BLEACH,
      });
    if (values.colorCatcher)
      washItems.push({
        itemName: "Color Catcher",
        numberOfItem: values.colorCatcher,
        itemAmount: values.colorCatcher * WASH_PRICES.COLOR_CATCHER,
      });
    if (values.softener)
      washItems.push({
        itemName: "Softner",
        numberOfItem: values.softener,
        itemAmount: values.softener * WASH_PRICES.SOFTENER,
      });
    if (values.extraDetergent)
      washItems.push({
        itemName: "Extra Detergent",
        numberOfItem: values.extraDetergent,
        itemAmount: values.extraDetergent * WASH_PRICES.EXTRA_DETERGENT,
      });
    if (values.dryerSheets)
      washItems.push({
        itemName: "Dryer Sheets",
        numberOfItem: values.dryerSheets,
        itemAmount: values.dryerSheets * WASH_PRICES.DRYER_SHEETS,
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

  const handleCreateWash = async (values) => {
    setLoading(true);
    try {
      if (!values.contactEmail) return;
      const transaction = await handleCreateTransaction(
        values.contactEmail,
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
            ? WashServiceTypeEnum.CLASSIC_WASH
            : WashServiceTypeEnum.PRESCHEDULED_WASH,
        internalNotes: values.laundryInstructions,
        logisticsAmount: values.logisticsAmount,
        estimatedDeliveryTime: values.orderDate,
        pickupTime: values.pickupWindow,
        washItemData: washItems,
        orderNote: values.laundryInstructions,
        userData: {
          fullName: values.contactPerson,
          email: values.contactEmail.toLowerCase(),
          phoneNumber: values.phoneNumber,
          userType: UserTypeEnum.CUSTOMER,
        },
        transactionData: {
          transactionReference: transaction.reference,
          transactionAmount: total,
          transactionChannel: TransactionChannelEnum.PAYSTACK,
          transactionTag: TransactionTagEnum.MainOrder,
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

  return (
    <Overlay loading={false}>
      <div className='schedule-pickup'>
        <Header />
        <div className='schedule-pickup body mobile'>
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

        <div className='schedule-pickup body'>
          <div className='flow-tracker-wrapper desktop'>
            <span className='_back' onClick={handleGoBack}>
              <i className='bi bi-chevron-left'></i>
            </span>
            <div className='tracker' onClick={() => handleTitleClick(1)}>
              <img
                src={
                  step === 1 || step > 1 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Pick up & Delivery</p>
            </div>
            <div
              className='tracker disabled'
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
              className='tracker disabled'
              onClick={() => handleTitleClick(3)}
            >
              <img
                src={step === 3 ? RadioChecked : RadioCheckedDisabled}
                alt=''
              />
              <p>Payment</p>
            </div>
          </div>

          <div className='steps'>
            <div className='row'>
              <div className='col-md-5 col-sm-12'>
                {step === 1 ? (
                  <PickUpDelivery
                    selectedWashType={scheduleInfo.selectedWashType}
                    changePDInfo={(key, value) => handleChangeInfo(key, value)}
                    scheduleInfo={scheduleInfo}
                    touched={formik.touched}
                    errors={formik.errors}
                  />
                ) : step === 2 ? (
                  <CustomizeWash
                    scheduleInfo={scheduleInfo}
                    changePDInfo={(key, value) => handleChangeInfo(key, value)}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                ) : step === 3 ? (
                  <ContactDetails
                    scheduleInfo={scheduleInfo}
                    changePDInfo={(key, value) => handleChangeInfo(key, value)}
                    errors={formik.errors}
                    touched={formik.touched}
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
              <div className='col-md-5 col-sm-12 summary-container'>
                <OrderSummary {...{ ...scheduleInfo, total }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
