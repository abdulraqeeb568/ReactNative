// import { webAPIUrl } from "../AppSettings";
const Server = "https://elit-eastus.azurewebsites.net";
const WebAPIUrl = `${Server}/api/`;
const PasswordRecoveryText =
  "Please enter your email address. You will receive a password reset link there.";
const InvalidPasswordText =
  "Password should at least contain 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and should at least be 8 characters long";
const PasswordMisMatchedText = "Password mismatched";
const RequiredFieldText = "This field is required";
const LogoutConfirmationText = "Are you sure to logout?";
const DeleteConfirmationText = "Are you sure to delete this ";
const Roles = ["Admin", "Driver", "User"];
const NetworkConnectionText = "Please connect to the internet";
const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ForgotPassword = WebAPIUrl + "User/" + "ForgotPassword?currentUserEmail=";
const Login = WebAPIUrl + "User/" + "Login";
const UpdatePassword = WebAPIUrl + "User/" + "UpdatePassword";
const UpdateProfile = WebAPIUrl + "User/" + "UpdateProfile";
const CreateUser = WebAPIUrl + "User/" + "CreateUser";
const DeleteDevice = WebAPIUrl + "Device/" + "DeleteDevice";

module.exports = {
  PasswordRecoveryText,
  InvalidPasswordText,
  PasswordMisMatchedText,
  LogoutConfirmationText,
  DeleteConfirmationText,
  RequiredFieldText,
  NetworkConnectionText,
  ForgotPassword,
  UpdatePassword,
  DeleteDevice,
  Login,
  CreateUser,
  UpdateProfile,
  EmailRegex,
  PasswordRegex,
  Roles,
};
