import { token } from "../utils/token";
import {APIuser} from "./serviceApiUser.config";

export const registerUser = async (formData) => {
    return APIuser.post("/user/register", formData)
    .then((res) => res)
    .catch((err) => err)
}

export const checkCodeConfirmationUser = async (formData) => {
    return APIuser.patch("/user/activate", formData)
      .then((res) => res)
      .catch((error) => error);
  }

  export const loginUser = async (formData) => {
    return APIuser.post("/user/login", formData)
      .then((res) => res)
      .catch((error) => error);
  };

  export const autoLoginUser = async (formData) => {
    return APIuser.post("/user/login/autologin", formData)
      .then((res) => res)
      .catch((error) => error);
  };