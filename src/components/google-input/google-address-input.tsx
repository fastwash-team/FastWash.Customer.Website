import { useEffect, useRef } from "react";
import { GoogleAddressInputProps } from "../../utils/types";

export const GoogleAddressInput = (props: GoogleAddressInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_LOCATION_KEY}&libraries=places`;
    googleScript.async = true;
    googleScript.defer = true;

    googleScript.onload = () => {
      // Initialize Autocomplete after Google Maps script is loaded
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
            componentRestrictions: { country: "NG" },
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected Place:", place);
          props.handleChange(place?.formatted_address || "");
        });
      }
    };

    document.head.appendChild(googleScript);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.head.removeChild(googleScript);
    };
  }, []); // Empty dependency array ensures that this useEffect runs only once on mount

  return (
    <div className='input-group flex-nowrap _location-input-wrapper'>
      <span
        className='input-group-text _location-input-wrapper-addon'
        id='addon-wrapping'
      >
        <i className='bi bi-geo-alt'></i>
      </span>
      <input
        ref={inputRef}
        type='text'
        className='form-control _location-input-wrapper-inputbox'
        placeholder='Enter Pick up location'
        aria-label='location-pickup'
        aria-describedby='addon-wrapping'
        name='address'
        id='address'
        onChange={({ target: { value } }) => props.handleChange(value)}
        value={props.address}
      />
    </div>
  );
};
