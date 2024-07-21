import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import { HangerIcon } from "../assets/svgs/hanger.icon";
import { formatMoney, getWashServiceType } from "../utils/functions";
import writtenNumber from "written-number";
import { AdminRequest, WashScheduleProps } from "../utils/types";
import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

export function ScheduleDownloadTemplate({
  schedule,
}: {
  schedule: WashScheduleProps;
}) {
  console.log({ schedule });
  const styles = {
    header: {
      "text-align": "center",
      background: "#fff8ec",
      padding: "20px",
    },
    body: {
      marginTop: "20px",
    },
    scheduleTitle: {
      fontSize: "24px",
      color: "#020d1c",
      lineHeight: "29px",
      fontWeight: "600",
      marginBottom: "16px",
    },
    scheduleDetails: { display: "flex", justifyContent: "space-between" },
    scheduleDetailsText: {
      display: "flex",
      gap: "4px",
      color: "#666666",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "15px",
      alignItems: "center",
    },
    scheduleRequest: {
      borderTop: "1px solid #d9d9d9",
      paddingTop: "16px",
      marginBottom: "16px",
    },
    scheduleRequestTitle: {
      color: "#020d1c",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "19.36px",
    },
    scheduleRequestSpanText: {
      background: "#edf3fc",
      "font-size": "12px",
      fontWeight: "600",
      lineHeight: "14px",
      color: "#17499f",
      "text-transform": "capitalize",
      padding: "4px 8px",
      borderRadius: "32px",
      marginLeft: "8px",
    },
    tags: {
      display: "flex",
      gap: "4px",
      marginTop: "16px",
    },
    tagText: {
      background: "#f4f4f4",
      color: "#666666",
      fontSize: "13px",
      lineHeight: "15px",
      fontWeight: "500",
      padding: "4px 8px",
      borderRadius: "4px",
      "text-transform": "capitalize",
    },
    scheduleContactInfo: {
      display: "flex",
      flexFlow: "wrap",
      columnGap: "24px",
    },
    scheduleContactInfoText: {
      color: "#666666",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "15px",
      display: "flex",
      gap: "4px",
      alignItems: "center",
      marginBottom: "8px",
    },
  };
  return (
    <div className='schedule-template' id='schedule-template'>
      <section className='header' style={styles.header}>
        <a className='navbar-brand' href='#'>
          <img src={FashWashLogo} alt='fash-wash' />
        </a>
      </section>
      <div className='body' style={styles.body}>
        <div className='row'>
          <div className='col-md-1 col-sm-1'></div>
          <div className='col-md-10 col-sm-10'>
            <h2 className='schedule-title' style={styles.scheduleTitle}>
              #{schedule.washOrderPlanReference} {schedule.scheduleStartTime} -{" "}
              {schedule.scheduleEndTime}
            </h2>
            <div style={styles.scheduleDetails}>
              <p style={styles.scheduleDetailsText}>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clip-path='url(#clip0_2901_2354)'>
                    <path
                      d='M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2ZM8.66667 11.3333H5.33333C4.96667 11.3333 4.66667 11.0333 4.66667 10.6667C4.66667 10.3 4.96667 10 5.33333 10H8.66667C9.03333 10 9.33333 10.3 9.33333 10.6667C9.33333 11.0333 9.03333 11.3333 8.66667 11.3333ZM10.6667 8.66667H5.33333C4.96667 8.66667 4.66667 8.36667 4.66667 8C4.66667 7.63333 4.96667 7.33333 5.33333 7.33333H10.6667C11.0333 7.33333 11.3333 7.63333 11.3333 8C11.3333 8.36667 11.0333 8.66667 10.6667 8.66667ZM10.6667 6H5.33333C4.96667 6 4.66667 5.7 4.66667 5.33333C4.66667 4.96667 4.96667 4.66667 5.33333 4.66667H10.6667C11.0333 4.66667 11.3333 4.96667 11.3333 5.33333C11.3333 5.7 11.0333 6 10.6667 6Z'
                      fill='#666666'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2901_2354'>
                      <rect width='16' height='16' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
                <span>{getWashServiceType(schedule.serviceType)}</span>
              </p>
              <p style={styles.scheduleDetailsText}>
                <HangerIcon />
                <span>{schedule.totalWashOrders} Washes</span>
              </p>
              <p style={styles.scheduleDetailsText}>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clip-path='url(#clip0_2901_2299)'>
                    <path
                      d='M12.6667 3.99984H11.3333C11.3333 2.15984 9.84 0.666504 8 0.666504C6.16 0.666504 4.66667 2.15984 4.66667 3.99984H3.33333C2.6 3.99984 2.00667 4.59984 2.00667 5.33317L2 13.3332C2 14.0665 2.6 14.6665 3.33333 14.6665H12.6667C13.4 14.6665 14 14.0665 14 13.3332V5.33317C14 4.59984 13.4 3.99984 12.6667 3.99984ZM8 1.99984C9.10667 1.99984 10 2.89317 10 3.99984H6C6 2.89317 6.89333 1.99984 8 1.99984ZM8 8.6665C6.16 8.6665 4.66667 7.17317 4.66667 5.33317H6C6 6.43984 6.89333 7.33317 8 7.33317C9.10667 7.33317 10 6.43984 10 5.33317H11.3333C11.3333 7.17317 9.84 8.6665 8 8.6665Z'
                      fill='#666666'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2901_2299'>
                      <rect width='16' height='16' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
                <span>NGN {formatMoney(schedule.totalWashOrdersAmount)}</span>
              </p>
              <p style={styles.scheduleDetailsText}>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clip-path='url(#clip0_2901_2300)'>
                    <path
                      d='M13.3327 5.33317H11.3327V2.6665H1.99935C1.26602 2.6665 0.666016 3.2665 0.666016 3.99984V11.3332H1.99935C1.99935 12.4398 2.89268 13.3332 3.99935 13.3332C5.10602 13.3332 5.99935 12.4398 5.99935 11.3332H9.99935C9.99935 12.4398 10.8927 13.3332 11.9993 13.3332C13.106 13.3332 13.9993 12.4398 13.9993 11.3332H15.3327V7.99984L13.3327 5.33317ZM3.99935 12.3332C3.44602 12.3332 2.99935 11.8865 2.99935 11.3332C2.99935 10.7798 3.44602 10.3332 3.99935 10.3332C4.55268 10.3332 4.99935 10.7798 4.99935 11.3332C4.99935 11.8865 4.55268 12.3332 3.99935 12.3332ZM12.9993 6.33317L14.306 7.99984H11.3327V6.33317H12.9993ZM11.9993 12.3332C11.446 12.3332 10.9993 11.8865 10.9993 11.3332C10.9993 10.7798 11.446 10.3332 11.9993 10.3332C12.5527 10.3332 12.9993 10.7798 12.9993 11.3332C12.9993 11.8865 12.5527 12.3332 11.9993 12.3332Z'
                      fill='#666666'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2901_2300'>
                      <rect width='16' height='16' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
                <span>NGN {formatMoney(schedule.totalLogisticsAmount)}</span>
              </p>
            </div>
            <div className='schedule-requests-list'>
              {schedule.washOrders.map((wash) => (
                <div className='request' style={styles.scheduleRequest}>
                  <h3 style={styles.scheduleRequestTitle}>
                    #{wash.washOrderReference}{" "}
                    <span style={styles.scheduleRequestSpanText}>
                      {wash.washStatus}
                    </span>
                  </h3>
                  <div className='tags' style={styles.tags}>
                    <p style={styles.tagText}>
                      {writtenNumber(
                        wash.washOrderData.washItemData.find(
                          (el) => el.itemName.toLowerCase() === "washes"
                        )?.numberOfItem
                      )}{" "}
                      Wash
                    </p>
                    <p style={styles.tagText}>
                      {wash.washOrderData.washItemData.length - 1} Extras
                    </p>
                  </div>
                  <div
                    className='contact-information'
                    style={styles.scheduleContactInfo}
                  >
                    <p style={styles.scheduleContactInfoText}>
                      <i className='bi bi-person-fill'></i>
                      {wash.washOrderData.userData.fullName}
                    </p>
                    <p style={styles.scheduleContactInfoText}>
                      <i className='bi bi-telephone-fill'></i>
                      {wash.washOrderData.userData.phoneNumber}
                    </p>
                    <p style={styles.scheduleContactInfoText}>
                      <i className='bi bi-envelope-fill'></i>
                      {wash.washOrderData.userData.email}
                    </p>
                    <p style={styles.scheduleContactInfoText}>
                      <i className='bi bi-geo-alt-fill'></i>
                      {wash.washOrderData.streetAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='col-md-1 col-sm-1'></div>
        </div>
      </div>
    </div>
  );
}
