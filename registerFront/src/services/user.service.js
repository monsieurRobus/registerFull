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