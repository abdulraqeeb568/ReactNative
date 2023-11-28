import React, { forwardRef, useImperativeHandle, useRef } from "react";
import CountryPicker from "react-native-country-picker-modal";

const CountryPickerWrapper = forwardRef((props, ref) => {
  const countryPickerRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal: () => {
      if (countryPickerRef.current) {
        countryPickerRef.current.openModal();
      }
    },
    // Add other methods or properties as needed
  }));

  return (
    <CountryPicker
      ref={countryPickerRef}
      onChange={props.onChange}
      translation="eng"
      cca2={props.cca2}
    ></CountryPicker>
  );
});

export default CountryPickerWrapper;
