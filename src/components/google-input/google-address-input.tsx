import { useEffect, useRef } from "react";
import { GoogleAddressInputProps } from "../../utils/types";
// import { supportedAreas } from "../../utils";
// import Swal from "sweetalert2";

export const GoogleAddressInput = (props: GoogleAddressInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_LOCATION_KEY}&libraries=places`;
    googleScript.async = true;
    googleScript.defer = true;
    // const myLatLng = { lat: 6.5244, lng: 3.3792, radius: 50000 };

    googleScript.onload = () => {
      // Initialize Autocomplete after Google Maps script is loaded
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
            componentRestrictions: {
              country: "NG",
            },
            // strictBounds: true,
            // bounds: new google.maps.LatLngBounds(myLatLng, myLatLng),
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected Place:", place);
          // getting neighborhood and administrative_2
          // const addressComponents = place.address_components || [];
          // const hasSupportedArea = addressComponents.filter((el) => {
          //   const firstEightAreaLong = el.long_name
          //     .toLowerCase()
          //     .substring(0, 8);
          //   return supportedAreas
          //     .map((el) => el.toLowerCase())
          //     .flatMap((el) => el.split(" "))
          //     .flatMap((el) => el.split("/"))
          //     .some((area) => area.startsWith(firstEightAreaLong));
          // });
          // if (!hasSupportedArea.length) {
          //   if (inputRef && inputRef.current) inputRef.current.value = "";
          //   props.handleChange("");
          //   return Swal.fire({
          //     title: "Invalid Location!",
          //     text: "Sorry, we do not support this location yet",
          //   });
          // } else
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
