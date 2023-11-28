import * as Constants from "./Constants";
export const isValidEmail = (email) => {
  // This is a basic email validation function, you can customize it to fit your needs.
  return Constants.EmailRegex.test(email);
};
export const isValidPassword = (password) => {
  // This is a basic email validation function, you can customize it to fit your needs.
  return Constants.PasswordRegex.test(password);
};

export default isValidEmail;
