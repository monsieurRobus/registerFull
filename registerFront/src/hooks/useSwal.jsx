import Swal from "sweetalert2";


export const useSwal = (res, setRegisterOk, setRes) => {
  if (res?.status == 200)
  {
    setRegisterOk(()=> true)
    Swal.fire({
        icon: "success",
        title: "Welcome to my Page 💌",
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
  }
  //! ------------------- 409: user ya registrado

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User already exist!❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
  //! ------------------- La contraseña no esta en el formato correcto
  if (res?.response?.data?.includes("validation failed: password")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! ------------------- cuando el userName ya existe
  if (
    res?.response?.data?.includes(
      "duplicate key error collection: userProyect.users index: name_1 dup key: { name"
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry choose another name ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval server error!❎ Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! -------------------- 404: 'error, resend code'
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.confirmationCode.includes("error, resend code")
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Register ok, error to resend code ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
}


