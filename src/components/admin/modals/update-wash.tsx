/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { calculateWashPrice, getFWAdminToken } from "../../../utils/functions";
import { Counter } from "../../schedule-pickup/customize-wash";
import { WASH_PRICES } from "../../../utils";
import { AdminRequest, WashItemDataNames } from "../../../utils/types";
import writtenNumber from "written-number";
import axios from "axios";
import { handleGroupWashOrders } from "../../../pages/schedule-pickup";
import shortUUID from "short-uuid";

export function UpdateWash({ wash }: { wash: AdminRequest | null }) {
  const [extras, setExtras] = useState({
    bleach: 0,
    softner: 0,
    colorcatcher: 0,
    mediumLaundryBags: 0,
    stainremover: 0,
    largeLaundryBags: 0,
    washes: 0,
  });
  const [extraDifference, setExtraDifference] = useState<WashItemDataNames>({});
  const adminToken = getFWAdminToken();

  useEffect(() => {
    if (!wash) return;
    const {
      washOrderData: { washItemData },
    } = wash;
    const washItemDataMapped = new Map(
      washItemData.map((el) => [el.itemName.toLowerCase(), el])
    );
    const extraMapped: WashItemDataNames = {
      washes: washItemDataMapped.get("washes")?.numberOfItem || 0,
      bleach: washItemDataMapped.get("bleach")?.numberOfItem || 0,
      softner: washItemDataMapped.get("softner")?.numberOfItem || 0,
      stainremover: washItemDataMapped.get("stain remover")?.numberOfItem || 0,
      colorcatcher: washItemDataMapped.get("color catcher")?.numberOfItem || 0,
      largeLaundryBags:
        washItemDataMapped.get("laundry bags (x)")?.numberOfItem || 0,
      mediumLaundryBags:
        washItemDataMapped.get("laundry bags (e)")?.numberOfItem || 0,
    };
    setExtras({ ...extras, ...extraMapped });
  }, [wash]);

  console.log({ extraDifference });

  const handleExtraCount = (extra: string, operator: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const value = extras[extra as keyof {}] as number;
    if (operator === "add") {
      const difference: { [key: string]: any } = extraDifference;
      setExtraDifference({
        ...extraDifference,
        [extra]: (difference[extra] || 0) + 1,
      });
      return setExtras({ ...extras, [extra]: value + 1 });
    }
    // if (operator === "minus" && value > 0)
    //   return setExtras({ ...extras, [extra]: value - 1 });
  };

  const total = useMemo(() => {
    // return calculateWashPrice(extraDifference.washes || 0) + extraDifference;
    let total = 0;
    if (extraDifference.washes)
      total += calculateWashPrice(extraDifference.washes);
    if (extraDifference.softner)
      total += extraDifference.softner * WASH_PRICES.SOFTENER;
    if (extraDifference.bleach)
      total += extraDifference.bleach * WASH_PRICES.BLEACH;
    if (extraDifference.stainremover)
      total += extraDifference.stainremover * WASH_PRICES.STAIN_REMOVER;
    if (extraDifference.largeLaundryBags)
      total += extraDifference.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS;
    if (extraDifference.mediumLaundryBags)
      total += extraDifference.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS;
    if (extraDifference.colorcatcher)
      total += extraDifference.colorcatcher * WASH_PRICES.COLOR_CATCHER;
    return total;
  }, [extraDifference]);

  console.log({ extras });

  console.log({ total });

  const handleUpdateWash = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/${wash?.washOrderId}/add/additionalorder`,
        {
          sharedTransactionData: {
            transactionReference: shortUUID.generate(),
            transactionAmount: total,
          },
          washItemData: handleGroupWashOrders({
            ...extraDifference,
            washcount: extraDifference?.washes,
            softener: extraDifference?.softner,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
    } catch (error) {
      console.log("updating wash", error);
    }
  };

  return (
    <div
      className='modal fade'
      id='update-wash-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <button
        data-bs-toggle='modal'
        data-bs-target='#update-wash-modal'
        id='update-wash-modal-btn'
        style={{ display: "none" }}
      >
        Add Wash
      </button>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Add Wash
            </h1>
          </div>
          <div className='modal-body'>
            <div className='update-wash-container'>
              <div className='_header'>
                <div>
                  <h4>
                    {writtenNumber(extras.washes)} Wash
                    {extras.washes > 1 ? "es" : ""}
                  </h4>
                  <Counter
                    handleAdd={() => handleExtraCount("washes", "add")}
                    handleMinus={() => handleExtraCount("washes", "minus")}
                    count={extras.washes}
                  />
                </div>
                <h3>
                  N{calculateWashPrice(1)} <span>per wash</span>
                </h3>
              </div>
              <div className='_body'>
                <h3>Extras</h3>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Softner</p>
                    <p className='_price'>N{WASH_PRICES.SOFTENER}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() => handleExtraCount("softner", "add")}
                      handleMinus={() => handleExtraCount("softner", "minus")}
                      count={extras.softner}
                    />
                  </div>
                </div>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Bleach</p>
                    <p className='_price'>N{WASH_PRICES.BLEACH}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() => handleExtraCount("bleach", "add")}
                      handleMinus={() => handleExtraCount("bleach", "minus")}
                      count={extras.bleach}
                    />
                  </div>
                </div>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Color Catcher</p>
                    <p className='_price'>N{WASH_PRICES.COLOR_CATCHER}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() => handleExtraCount("colorcatcher", "add")}
                      handleMinus={() =>
                        handleExtraCount("colorcatcher", "minus")
                      }
                      count={extras.colorcatcher}
                    />
                  </div>
                </div>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Stain Remover</p>
                    <p className='_price'>N{WASH_PRICES.STAIN_REMOVER}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() => handleExtraCount("stainremover", "add")}
                      handleMinus={() =>
                        handleExtraCount("stainremover", "minus")
                      }
                      count={extras.stainremover}
                    />
                  </div>
                </div>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Laundry Bags (E)</p>
                    <p className='_price'>N{WASH_PRICES.E_LAUNDRY_BAGS}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() =>
                        handleExtraCount("mediumLaundryBags", "add")
                      }
                      handleMinus={() =>
                        handleExtraCount("mediumLaundryBags", "minus")
                      }
                      count={extras.mediumLaundryBags}
                    />
                  </div>
                </div>
                <div className='extra'>
                  <div className='-info'>
                    <p className='_name'>Laundry Bags (X)</p>
                    <p className='_price'>N{WASH_PRICES.X_LAUNDRY_BAGS}</p>
                  </div>
                  <div className='extra-count'>
                    <Counter
                      handleAdd={() =>
                        handleExtraCount("largeLaundryBags", "add")
                      }
                      handleMinus={() =>
                        handleExtraCount("largeLaundryBags", "minus")
                      }
                      count={extras.largeLaundryBags}
                    />
                  </div>
                </div>
                <button className='btn modal-button' onClick={handleUpdateWash}>
                  Update Wash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
