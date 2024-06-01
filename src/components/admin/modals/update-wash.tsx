/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { calculateWashPrice } from "../../../utils/functions";
import { Counter } from "../../schedule-pickup/customize-wash";
import { WASH_PRICES } from "../../../utils";
import { AdminRequest } from "../../../utils/types";
import writtenNumber from "written-number";
import axios from "axios";

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

  useEffect(() => {
    if (!wash) return;
    const {
      washOrderData: { washItemData },
    } = wash;
    const extraMapped: any = {};
    washItemData.forEach((el) => {
      extraMapped[el.itemName.toLowerCase()] = el.numberOfItem;
    });
    setExtras({ ...extras, ...extraMapped });
  }, [wash]);

  const handleExtraCount = (extra: string, operator: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const value = extras[extra as keyof {}] as number;
    if (operator === "add") return setExtras({ ...extras, [extra]: value + 1 });
    // if (operator === "minus" && value > 0)
    //   return setExtras({ ...extras, [extra]: value - 1 });
  };

  const handleUpdateWash = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/${wash?.washOrderId}/add/additionalorder`,
        {
          sharedTransactionData: {
            transactionReference: "string",
            transactionAmount: 0,
          },
          washItemData: [
            {
              itemName: "string",
              numberOfItem: 0,
              itemAmount: 0,
            },
          ],
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
                <button className='btn modal-button'>Update Wash</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
