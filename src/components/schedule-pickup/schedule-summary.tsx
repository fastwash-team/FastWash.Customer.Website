import { ScheduleSummaryProps } from "../../utils/types";
import { CLASSIC_WASH, PRESCHEDULED_WASH, WASH_PRICES } from "../../utils";
import { calculateWashPrice, formatMoney } from "../../utils/functions";
import { CustomTooltip } from "../tooltip";

const BillingItems = (props: ScheduleSummaryProps) => {
  return (
    <div className='billing-items'>
      <div className='item'>
        <span>Service Type</span>
        <b>
          {props.selectedWashType === PRESCHEDULED_WASH
            ? "Pre-Scheduled Wash"
            : props.selectedWashType === CLASSIC_WASH
            ? "Classic Wash"
            : ""}
        </b>
      </div>
      <div className='item'>
        <span>Pick up Time</span>
        <b>{props.pickupWindow}</b>
      </div>
      <div className='item'>
        <span>Est Delivery Time</span>
        <b>{props.pickupDay}</b>
      </div>
      <div className='item'>
        <span>
          Logistics{" "}
          <CustomTooltip text={"Laundry Pickup and delivery fee"}>
            <i className='bi bi-info-circle-fill' />
          </CustomTooltip>
        </span>
        <b>N {formatMoney(WASH_PRICES.LOGISTICS)}</b>
      </div>
      {props.washcount > 0 && (
        <div className='item'>
          <span>Wash({props.washcount})</span>
          <b>N {formatMoney(calculateWashPrice(props.washcount))}</b>
        </div>
      )}
      {props.softener > 0 && (
        <div className='item'>
          <span>Softener ({props.softener})</span>
          <b>N {formatMoney(WASH_PRICES.SOFTENER * props.softener)}</b>
        </div>
      )}
      {props.bleach > 0 && (
        <div className='item'>
          <span>Bleach ({props.bleach})</span>
          <b>N {formatMoney(WASH_PRICES.BLEACH * props.bleach)}</b>
        </div>
      )}
      {props.colorcatcher > 0 && (
        <div className='item'>
          <span>Color Catcher ({props.colorcatcher})</span>
          <b>N {formatMoney(WASH_PRICES.COLOR_CATCHER * props.colorcatcher)}</b>
        </div>
      )}
      {props.stainremover > 0 && (
        <div className='item'>
          <span>Stain Remover ({props.stainremover})</span>
          <b>N {formatMoney(WASH_PRICES.STAIN_REMOVER * props.stainremover)}</b>
        </div>
      )}
      {props.mediumLaundryBags > 0 && (
        <div className='item'>
          <span>Laundry Bags (E) ({props.mediumLaundryBags})</span>
          <b>
            N{" "}
            {formatMoney(WASH_PRICES.E_LAUNDRY_BAGS * props.mediumLaundryBags)}
          </b>
        </div>
      )}
      {props.largeLaundryBags > 0 && (
        <div className='item'>
          <span>Laundry Bags (X) ({props.largeLaundryBags})</span>
          <b>
            N {formatMoney(WASH_PRICES.X_LAUNDRY_BAGS * props.largeLaundryBags)}
          </b>
        </div>
      )}
    </div>
  );
};

const ContactDetails = (props: ScheduleSummaryProps) => {
  return props.contactemail || props.contactperson || props.phonenumber ? (
    <div className='contact-details'>
      <p>Contact</p>
      <b>
        {props?.contactperson && (
          <>
            {props.contactperson} <i className='bi bi-dot'></i>
          </>
        )}
        {props?.phonenumber && (
          <>
            {props.phonenumber} <i className='bi bi-dot'></i>
          </>
        )}
        {props?.contactemail && (
          <>
            {props.contactemail} <i className='bi bi-dot'></i>
          </>
        )}
      </b>
    </div>
  ) : null;
};

export function ScheduleSummary(props: ScheduleSummaryProps) {
  const total = props.total;
  return (
    <>
      <div className='schedule-pickup__body__steps-summary'>
        <h3>Request Summary</h3>
        <div className='address-block'>
          <p>Address</p>
          <b>{props.address || "-"}</b>
        </div>
        <BillingItems {...props} />
        <ContactDetails {...props} />
        <div className='total'>
          <span>Total</span>
          <b>NGN {formatMoney(total)}</b>
        </div>
      </div>
      <div className='schedule-pickup__body__steps-summary_mobile'>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header'>
              <button
                className='accordion-button'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseOne'
                aria-expanded='false'
                aria-controls='collapseOne'
              >
                Request Summary
              </button>
            </h2>
            <div
              id='collapseOne'
              className='accordion-collapse collapse'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <div className='address-block'>
                  <p>Address</p>
                  <b>{props.address || "-"}</b>
                </div>
                <BillingItems {...props} />
                <ContactDetails {...props} />
              </div>
            </div>
          </div>
        </div>
        <div className='total'>
          <span>Total</span>
          <b>NGN {formatMoney(total)}</b>
        </div>
      </div>
    </>
  );
}
