import React, { forwardRef, useImperativeHandle, useRef } from "react";
import PhoneInput from "react-native-phone-input";

const PhoneInputWrapper = forwardRef((props, ref) => {
  const phoneInputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    },
    // Add other methods or properties as needed
  }));

  return (
    <PhoneInput
      ref={phoneInputRef}
      onPressFlag={props.onPressFlag}
      initialCountry={props.cca2}
      onChangePhoneNumber={props.onPhoneInputChange}
      textProps={{
        placeholder: "Enter a phone number...",
        placeholderTextColor: "#003f5c",
      }}
    />
  );
});

export default PhoneInputWrapper;
