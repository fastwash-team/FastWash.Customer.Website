/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import { formatMoney } from "../../utils/functions";
import { AdminRequest, WashScheduleProps } from "../../utils/types";
import writtenNumber from "written-number";
import { useReactToPrint } from "react-to-print";
import { EmptyContainer } from "../empty-wash-item-list";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { useEffect, useRef, useState } from "react";
import { BlobProviderParams, PDFDownloadLink } from "@react-pdf/renderer";
import { UpdateWash } from "./modals/update-wash";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import { ScheduleDownloadTemplate } from "../schedule-download-template";
import { AdminRequestView } from "./admin-request-view";

export function ScheduleView({
  goBack,
  schedule,
}: {
  goBack: () => void;
  schedule: WashScheduleProps;
}) {
  const reportTemplateRef = useRef(null);
  const [selectedWash, setSelectedWash] = useState<AdminRequest | null>(null);
  const [washToView, setWashToView] = useState<AdminRequest | null>(null);
  const [selectedSchedule, setSelectedSchedule] =
    useState<WashScheduleProps | null>(null);
  const handlePrint = useReactToPrint({
    content: () => reportTemplateRef.current,
  });

  useEffect(() => {
    if (schedule && !selectedSchedule) setSelectedSchedule(schedule);
  }, []);

  const handleGeneratePDF = async (htmlString: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    const iframedoc: Document | undefined =
      iframe.contentDocument || iframe?.contentWindow?.document;
    if (!iframedoc || iframedoc === undefined) return;
    iframedoc.body.innerHTML = htmlString;

    const canvas = await html2canvas(iframedoc.body, {});

    const componentWidth = iframedoc.body.offsetWidth;
    const componentHeight = iframedoc.body.offsetHeight;
    const orientation = componentWidth >= componentHeight ? "l" : "p";
    // Convert the iframe into a PNG image using canvas.
    const imgData = canvas.toDataURL("image/png");
    // Create a PDF document and add the image as a page.
    const doc = new JsPDF({
      orientation,
      unit: "px",
      format: "a4",
    });
    doc.setFont("Helvetica");
    doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

    doc.save("document-1");

    // Remove the iframe from the document when the file is generated.
    document.body.removeChild(iframe);
  };

  const handleUpdateRequestInList = (wash: AdminRequest) => {
    if (!selectedSchedule?.washOrders.length) return;
    const requestIndex = selectedSchedule?.washOrders.findIndex(
      (el) => el.washOrderReference === wash.washOrderReference
    );
    selectedSchedule.washOrders[requestIndex] = { ...wash };
    setSelectedSchedule({ ...schedule });
  };

  return washToView ? (
    <AdminRequestView
      selectedRequest={washToView}
      goBack={() => setWashToView(null)}
    />
  ) : (
    <div className='schedule-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='schedule-view-header'>
        <div className='details'>
          <h3>
            #{schedule.washOrderPlanReference} {schedule.scheduleStartTime} -{" "}
            {schedule.scheduleEndTime}
          </h3>
          <div className='extras'>
            <p>
              <i className='bi bi-duffle-fill'></i>
              <span>{schedule.totalWashOrders} Washes</span>
            </p>
            <p>
              <i className='bi bi-bag-check-fill'></i>
              <span>NGN {formatMoney(schedule.totalWashOrdersAmount)}</span>
            </p>
            <p>
              <i className='bi bi-truck'></i>
              <span>NGN {formatMoney(schedule.totalLogisticsAmount)}</span>
            </p>
            <p>
              <i className='bi bi-geo-alt-fill'></i>
              <span>{schedule.location}</span>
            </p>
          </div>
        </div>
        {/* {(schedule?.washOrders || []).length ? (
          <PDFDownloadLink
            document={<ScheduleDownloadTemplate wash={selectedWash} />}
            fileName='schedule.pdf'
          >
            {({ blob, url, loading, error }: BlobProviderParams) => (
              <button
                onClick={() => {
                  console.log({ url, loading });
                  // You can trigger the download here if needed
                  // For example:
                  // if (url) {
                  //   window.open(url, "_blank");
                  // }
                }}
              >
                Download
              </button>
            )}
          </PDFDownloadLink>
        ) : null} */}
        {(schedule?.washOrders || [])?.length ? (
          <button
            onClick={() => {
              handlePrint();
              // const template: string = ReactDOMServer.renderToString(
              //   <ScheduleDownloadTemplate schedule={schedule} />
              // );
              // console.log({ template });
              // if (!template) return;
              // handleGeneratePDF(template);
            }}
            // onClick={() => {
            //   const report = new JsPDF("portrait", "pt", "a4");
            // const template: HTMLElement | null =
            //   document.querySelector("#schedule-template");
            // console.log({ template });
            // if (!template) return;
            //   report.html(template).then(() => {
            //     report.save("report.pdf");
            //   });
            // }}
          >
            Download
          </button>
        ) : null}
      </div>
      {(schedule?.washOrders || []).length ? (
        (schedule.washOrders || []).map((el, key) => (
          <div
            className='schedule-view-body'
            key={key}
            onClick={() => setWashToView(el)}
          >
            <div className='_left'>
              <div className='_title status'>
                <h2>#{el.washOrderReference}</h2>
                <span className={el.washStatus.toLowerCase()}>
                  {el.washStatus}
                </span>
              </div>
              <div className='_extras'>
                {el.washOrderData.washItemData.find(
                  (el) => el.itemName === "Washes"
                )?.numberOfItem ? (
                  <p>
                    {writtenNumber(
                      el.washOrderData.washItemData.find(
                        (el) => el.itemName === "Washes"
                      )?.numberOfItem
                    )}{" "}
                    Wash
                    {el?.washOrderData?.washItemData.filter(
                      (el) => el.itemName !== "Washes"
                    ).length > 1
                      ? "es"
                      : ""}
                  </p>
                ) : null}
                <p>
                  {el?.washOrderData?.washItemData.filter(
                    (el) => el.itemName !== "Washes"
                  ).length
                    ? writtenNumber(
                        el?.washOrderData?.washItemData.filter(
                          (el) => el.itemName !== "Washes"
                        ).length
                      )
                    : "No"}{" "}
                  Extra
                  {el?.washOrderData?.washItemData?.length - 1 > 1 ? "s" : ""}
                </p>
                {/* <p>Notes: Yes</p> */}
              </div>
              <div className='_contact'>
                <p>
                  <i className='bi bi-person-fill'></i>
                  <span>{el?.washOrderData?.userData?.fullName}</span>
                </p>
                <p>
                  <i className='bi bi-phone-fill'></i>
                  <span>{el?.washOrderData?.userData?.phoneNumber}</span>
                </p>
                <p>
                  <i className='bi bi-envelope-fill'></i>
                  <span>{el?.washOrderData?.userData?.email}</span>
                </p>
                <p>
                  <i className='bi bi-geo-alt-fill'></i>
                  <span>{el?.washOrderData?.streetAddress}</span>
                </p>
              </div>
            </div>
            <div className='date'>
              <p>{moment(el?.washOrderData?.orderDate).format("Do MMM")}</p>
              <div className='dropdown' onClick={(e) => e.stopPropagation()}>
                <i
                  className='bi bi-three-dots'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                ></i>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className='dropdown-item'
                      onClick={() => {
                        document
                          .getElementById("update-request-status-modal-btn")
                          ?.click();
                        setSelectedWash(el);
                      }}
                    >
                      Update Status
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      onClick={() => {
                        document
                          .getElementById("update-wash-modal-btn")
                          ?.click();
                        setSelectedWash(el);
                      }}
                    >
                      Add Wash
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Reschedule Wash
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Add Complaints
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyContainer
          emptyText='There are no requests for this schedule.'
          showAction={false}
        />
      )}
      <UpdateRequestStatus
        wash={selectedWash}
        handleUpdateRequestInList={(wash: AdminRequest) =>
          handleUpdateRequestInList(wash)
        }
      />
      <UpdateWash wash={selectedWash} handleFetchAdditionalOrder={() => null} />
      <div style={{ display: "none" }}>
        <div className='' ref={reportTemplateRef}>
          {schedule && schedule?.washOrders ? (
            <ScheduleDownloadTemplate schedule={schedule} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
