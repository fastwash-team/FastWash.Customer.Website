import React, { useState } from "react";
import { CounterComponentProps } from "../../utils/types";

const Counter = (props: CounterComponentProps) => {
  return (
    <div className='wash-counter'>
      <button
        className='sign _minus'
        //     onClick={() => handleWashCount("minus")}
        onClick={props.handleMinus}
      >
        -
      </button>
      <p>{props.count}</p>
      <button
        className='sign _add'
        //   onClick={() => handleWashCount("add")}
        onClick={props.handleAdd}
      >
        +
      </button>
    </div>
  );
};

export function CustomizeWash() {
  const [washcount, setWashCount] = useState(1);

  const handleWashCount = (variant: string) => {
    if (variant === "add") return setWashCount(washcount + 1);
    if (variant === "minus" && washcount > 1)
      return setWashCount(washcount - 1);
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
              <p>{washcount}</p>
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
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
              handleAdd={() => null}
              handleMinus={() => null}
              count={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
