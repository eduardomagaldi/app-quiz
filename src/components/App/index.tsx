import './index.css';

import React, { useEffect, useState } from 'react';
import { getAvailabilities } from '../../services/availabilities';
import { Availability, AvailabilityResponse, Slot } from '../../common/interfaces';

const App: React.FC = () => {
  const [postalcode, setPostalcode] = useState<string>('aa');
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  useEffect(() => {
    console.log('postalcode', postalcode);

    if (postalcode) {
      getAvailabilities(postalcode)
        .then((response: AvailabilityResponse): void => {
          setAvailabilities(response.items as Availability[]);
        });
    }
  }, [postalcode]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value.length === 5) {
      setPostalcode(value);
    } else {
      console.error('Incorrect Postalcode');
    }
  }

  return (
    <>
      <input
        type="text"
        name="postalcode"
        onChange={handleChange}
        maxLength={5}
      />

      {availabilities.map((availability, index) => {
        return (
          <div key={index}>
            <Day dateName={availability.date} index={index} slots={availability.slots} />
          </div>
        );
      })}
    </>
  );
};

const Day: any = (props: any) => {
  function handleClick(time: any) {
    return () => {
      return time;
    };
  }

  return (
    <label htmlFor={props.index} className="accordion__item">
      <strong>{props.dateName}</strong>
      <input type="checkbox" className="accordion__checkbox" id={props.index} />

      <span className="accordion__content">
        {props.slots.map((slot: Slot, index: number) => {

          return (
            <button key={index} onClick={handleClick(slot.time)}>
              {slot.time}
            </button>
          );
        })}
      </span>
    </label>
  );
}

export default App;
