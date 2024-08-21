import { formatMoney } from "../utils/functions";

export const AdditionalOrderComponent = ({ additionalOrder }) => {
  return (
    <>
      <div className='additional-order-container'>
        <div className='header status'>
          <h5>Additional Order</h5>
          <span className={additionalOrder?.washStatus.toLowerCase()}>
            {additionalOrder?.washStatus}
          </span>
        </div>
        <div className='body'>
          <section>
            <div className='_section'>
              <h3>Wash Quantity</h3>
              <p>
                {additionalOrder?.washItemData?.find(
                  (el) => el.itemName.toLowerCase() === "washes"
                )?.numberOfItem || 0}{" "}
                Washes
              </p>
            </div>
            <div className='_section'>
              <h3>Payment</h3>
              <p>
                N
                {formatMoney(
                  additionalOrder?.washItemData?.reduce(
                    (acc, curr) => acc + Number(curr.itemAmount),
                    0
                  )
                )}
              </p>
            </div>
          </section>
          <section>
            <div className='_section'>
              <h3>Extras</h3>
              <p>
                {additionalOrder?.washItemData
                  ?.filter((el) => el.itemName?.toLowerCase() !== "washes")
                  ?.map(
                    (el, key) =>
                      `${el.itemName}(${el.numberOfItem})${
                        key <
                        additionalOrder.washItemData.filter(
                          (el) => el.itemName?.toLowerCase() !== "washes"
                        ).length -
                          1
                          ? ", "
                          : ""
                      }`
                  )}
              </p>
            </div>
            <div></div>
          </section>
        </div>
      </div>
      <div className='items hasBorderBottom'></div>
    </>
  );
};
