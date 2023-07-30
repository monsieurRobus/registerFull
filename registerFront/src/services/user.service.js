import { token } from "../utils/token";
import {APIuser} from "./serviceApiUser.config";

export const registerUser = async (formData) => {
    return APIuser.post("/user/register", formData)
    .then((res) => res)
    .catch((err) => err)
}

export const deleteUser = async (id) => {
    return APIuser.delete(`/user/${id}`, token())
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
  }

  export const autoLoginUser = async (formData) => {
    return APIuser.post("/user/autologin", formData)
      .then((res) => res)
      .catch((error) => error);
  }
  export const changePassword = async (formData) => {
    const id = formData.id;
    const values = {
      password: formData.password,
      newPassword: formData.newPassword
    }
    return APIuser.post(`/user/changePassword/${id}`, values)
      .then((res) => res)
      .catch((error) => error);
  }

  export const forgotPassword = async (formData) => {
    return APIuser.post("/user/forgotpassword/send", formData)
      .then((res) => res)
      .catch((error) => error);
  }

  export const resendCodeConfirmationUser = async (formData)=> {
    return APIuser.post("/user/resend", formData)
      .then((res) => res)
      .catch((error) => error);
  }
  export const update = async (formData)=> {
    return APIuser.post("/user/update", formData)
      .then((res) => res)
      .catch((error) => error);
  }

  export const getUserById = async (id) => {
    return APIuser.get(`/user/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }