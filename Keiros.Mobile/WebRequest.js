import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import * as Constants from "./Commons/Constants";

export async function login(email, password) {
  let data = {
    result: null,
    isErrorOccurred: null,
    errorMessage: null,
  };
  try {
    const instance = axios.create({
      validateStatus: function (status) {
        // Treat 404 or 500 as a valid response
        return (
          (status >= 200 && status < 300) ||
          status === 404 ||
          status === 500 ||
          status === 401
        );
      },
    });
    const params = {
      email: email,
      password: password,
    };
    const result = await instance.post(Constants.Login, params, {
      timeout: 10000,
    });
    if (result.data.isErrorOccured) {
      data = {
        result: null,
        isErrorOccurred: true,
        errorMessage: result.data.returnMessage,
      };
    } else {
      await SecureStore.setItemAsync(
        "secure_token",
        result.data.returnObject.access_token
      );
      await SecureStore.setItemAsync(
        "UserName",
        result.data.returnObject.email
      );
      data = {
        result: result.data,
        isErrorOccurred: false,
        errorMessage: null,
      };
    }
    return data;
  } catch (err) {
    const errorMsg = err.message || "An error occurred in the Axios";
    const data = {
      result: null,
      isErrorOccurred: true,
      errorMessage: errorMsg,
    };
    return data;
  }
}
export async function createUser({ userModel }) {
  try {
    const instance = axios.create({
      validateStatus: function (status) {
        // Treat 404 or 500 as a valid response
        return (
          (status >= 200 && status < 300) ||
          status === 404 ||
          status === 500 ||
          status === 401
        );
      },
    });
    const result = await instance.post(Constants.CreateUser, userModel, {
      timeout: 10000,
    });
    const data = {
      result: result.data,
      isErrorOccurred: false,
      errorMessage: null,
    };
    return data;
  } catch (err) {
    const errorMsg = err.message || "An error occurred in the Axios";
    const data = {
      result: null,
      isErrorOccurred: true,
      errorMessage: errorMsg,
    };
    return data;
  }
}
export async function deleteDevice({ deviceId }) {
  try {
    const instance = axios.create({
      validateStatus: function (status) {
        // Treat 404 or 500 as a valid response
        return (
          (status >= 200 && status < 300) ||
          status === 404 ||
          status === 500 ||
          status === 401
        );
      },
    });
    const result = await instance.post(Constants.DeleteDevice, deviceId, {
      timeout: 10000,
    });
    const data = {
      result: result.data,
      isErrorOccurred: false,
      errorMessage: null,
    };
    return data;
  } catch (err) {
    const errorMsg = err.message || "An error occurred in the Axios";
    const data = {
      result: null,
      isErrorOccurred: true,
      errorMessage: errorMsg,
    };
    return data;
  }
}

export default login;
