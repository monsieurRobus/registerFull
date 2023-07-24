import Swal from "sweetalert2"

const useResendCode = (res, setRes, setReloadPageError) => {
  if(res?.status == 200){
    Swal.fire({
        icon: "success",
        title: "New confirmation code sent",
        showConfirmButton: false,
        timer: 1500,
      });
  }

  if(res?.response?.data == "User not found")
  {
    Swal.fire({
        icon: "error",
        title: "User not found",
        showConfirmButton: false,
        timer: 1500,
      });

      setRes(() => {});
  }

  if(res?.response?.data == "User already active")
  {
    Swal.fire({
        icon: "error",
        title: "User already active",
        showConfirmButton: false,
        timer: 1500,
      });
  }


}

export default useResendCode