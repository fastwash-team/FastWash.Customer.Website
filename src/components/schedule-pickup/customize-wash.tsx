import React, { useEffect } from "react";
import {
  CounterComponentProps,
  CustomizeWashProps,
  ScheduleSummaryProps,
} from "../../utils/types";
import { WASH_PRICES } from "../../utils";
import { CustomTooltip } from "../tooltip";

export const Counter = (props: CounterComponentProps) => {
  return (
    <div className='wash-counter'>
      <button className='sign _minus' onClick={props.handleMinus}>
        -
      </button>
      <p>{props.count}</p>
      <button className='sign _add' onClick={props.handleAdd}>
        +
      </button>
    </div>
  );
};

export function CustomizeWash(props: CustomizeWashProps) {
  useEffect(() => {
    if (props.scheduleInfo.washcount < 1) {
      props.changePDInfo("washcount", 1);
      props.changePDInfo("softener", 1);
    }
  }, []);

  const handleExtraCount = (extra: string, variant: string) => {
    const val = (props.scheduleInfo[extra as keyof ScheduleSummaryProps] ||
      0) as number;
    if (variant === "add") return props.changePDInfo(extra, val + 1);
    if (variant === "minus" && val > 0)
      return props.changePDInfo(extra, val - 1);
  };

  const handleWashCount = (variant: string) => {
    if (variant === "add") {
      props.changePDInfo("washcount", props.scheduleInfo.washcount + 1);
      return props.changePDInfo("softener", props.scheduleInfo.softener + 1);
    }
    if (variant === "minus" && props.scheduleInfo.washcount > 1) {
      props.changePDInfo("washcount", props.scheduleInfo.washcount - 1);
      if (props.scheduleInfo.softener > 0)
        return props.changePDInfo("softener", props.scheduleInfo.softener - 1);
    }
  };
  return (
    <div className='schedule-pickup__body__steps-view-render customize-wash'>
      <h2>Customize Wash</h2>
      <p>How many clothes do you want to wash?</p>
      <div className='__options'>
        <div className='option'>
          <h3>One Wash</h3>
          <p>
            Every wash comes with free detergent, you can add more options in
            the Extras section below.
          </p>
          <div className='wash-counter-flex'>
            <div className='wash-counter'>
              <button
                className='sign _minus'
                onClick={() => handleWashCount("minus")}
              >
                -
              </button>
              <p>{props.scheduleInfo.washcount}</p>
              <button
                className='sign _add'
                onClick={() => handleWashCount("add")}
              >
                +
              </button>
            </div>
            <h3>
              N{WASH_PRICES.WASH}
              <span>per wash </span>
            </h3>
          </div>
        </div>
      </div>
      <p className='wash-description'>
        What is a Wash?
        <CustomTooltip
          text={
            "It is one wash, dry, and fold cycle. One Wash load usually consists of 10-25 items, but thicker fabrics like duvets count as one full load."
          }
        >
          <i className='bi bi-info-circle-fill' />
        </CustomTooltip>
      </p>
      <h2>Extras</h2>
      <p>Add extra bags for 10% discount per bag</p>
      <div className='extras'>
        <div className='extra'>
          <div className='-info'>
            <p className='_name'>Softner</p>
            <p className='_price'>N{WASH_PRICES.SOFTENER}</p>
          </div>
          <div className='extra-count'>
            <Counter
              handleAdd={() => handleExtraCount("softener", "add")}
              handleMinus={() => handleExtraCount("softener", "minus")}
              count={props.scheduleInfo.softener}
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
              count={props.scheduleInfo.bleach}
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
              handleMinus={() => handleExtraCount("colorcatcher", "minus")}
              count={props.scheduleInfo.colorcatcher}
            />
          </div>
        </div>
        <div className='extra'>
          <div className='-info'>
            <p className='_name'>Extra Detergent</p>
            <p className='_price'>N{WASH_PRICES.EXTRA_DETERGENT}</p>
          </div>
          <div className='extra-count'>
            <Counter
              handleAdd={() => handleExtraCount("extradetergent", "add")}
              handleMinus={() => handleExtraCount("extradetergent", "minus")}
              count={props.scheduleInfo.extradetergent}
            />
          </div>
        </div>
        <div className='extra'>
          <div className='-info'>
            <p className='_name'>Dryer Sheets</p>
            <p className='_price'>N{WASH_PRICES.DRYER_SHEETS}</p>
          </div>
          <div className='extra-count'>
            <Counter
              handleAdd={() => handleExtraCount("dryersheets", "add")}
              handleMinus={() => handleExtraCount("dryersheets", "minus")}
              count={props.scheduleInfo.dryersheets}
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
              handleAdd={() => handleExtraCount("mediumLaundryBags", "add")}
              handleMinus={() => handleExtraCount("mediumLaundryBags", "minus")}
              count={props.scheduleInfo.mediumLaundryBags}
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
              handleAdd={() => handleExtraCount("largeLaundryBags", "add")}
              handleMinus={() => handleExtraCount("largeLaundryBags", "minus")}
              count={props.scheduleInfo.largeLaundryBags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
