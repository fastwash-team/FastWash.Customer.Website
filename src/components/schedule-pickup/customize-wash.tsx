import React, { useEffect } from "react";
import {
  CounterComponentProps,
  CustomizeWashProps,
  ScheduleSummaryProps,
} from "../../utils/types";

const Counter = (props: CounterComponentProps) => {
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
    }
  }, []);

  const handleExtraCount = (extra: string, variant: string) => {
    console.log({ extra, variant });
    const val = (props.scheduleInfo[extra as keyof ScheduleSummaryProps] ||
      0) as number;
    if (variant === "add") return props.changePDInfo(extra, val + 1);
    if (variant === "minus" && val > 0)
      return props.changePDInfo(extra, val - 1);
  };

  const handleWashCount = (variant: string) => {
    if (variant === "add")
      return props.changePDInfo("washcount", props.scheduleInfo.washcount + 1);
    if (variant === "minus" && props.scheduleInfo.washcount > 1)
      return props.changePDInfo("washcount", props.scheduleInfo.washcount - 1);
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
              N2700 <span>per wash </span>
            </h3>
          </div>
        </div>
      </div>
      <p className='wash-description'>
        What is a Wash?
        <i
          data-bs-toggle='tooltip'
          data-bs-title='Default tooltip'
          className='bi bi-info-circle-fill'
        />
      </p>
      <h2>Extras</h2>
      <p>Add extra bags for 10% discount per bag</p>
      <div className='extras'>
        <div className='extra'>
          <div className='-info'>
            <p className='_name'>Softner</p>
            <p className='_price'>N250</p>
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
            <p className='_price'>N250</p>
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
            <p className='_price'>N250</p>
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
            <p className='_name'>Stain remover</p>
            <p className='_price'>N250</p>
          </div>
          <div className='extra-count'>
            <Counter
              handleAdd={() => handleExtraCount("stainremover", "add")}
              handleMinus={() => handleExtraCount("stainremover", "minus")}
              count={props.scheduleInfo.stainremover}
            />
          </div>
        </div>
        <div className='extra'>
          <div className='-info'>
            <p className='_name'>Laundry Bags (E)</p>
            <p className='_price'>N1500</p>
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
            <p className='_price'>N2500</p>
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
