import Swal from "sweetalert2"


const useChangePassError = (
        res,        
        setOk,
        setRes
) => {

// 200: Password Changed
if(res?.data?.updatePass?.toString() == "true")
{
    setOk(()=> true)
    return Swal.fire({
        icon: "success",
        title: "password changed succesfully ✅",
        showConfirmButton: false,
        timer: 1500,
      });
        
}

if(res?.response?.data?.message == "User not registered")
{
    setOk(()=> true)
    return Swal.fire({
        icon: "error",
        title: "user not registered",
        showConfirmButton: false,
        timer: 1500,
      });
        
}
if(res?.response?.data?.message == "User not found")
{
    setOk(()=> true)
    return Swal.fire({
        icon: "error",
        title: "User not found",
        showConfirmButton: false,
        timer: 1500,
      });
        
}
if(res?.response?.data?.message == "Password does not match. Please try again")
{
    setOk(()=> true)
    return Swal.fire({
        icon: "error",
        title: "Password does not match. Please try again",
        showConfirmButton: false,
        timer: 1500,
      });
        
}

if((res?.data?.updateUser.toString() == "true") && (res?.data?.sendPass.toString() == "true"))
{
    setOk(()=> true)
    return Swal.fire({
        icon: "success",
        title: "New Password Generated. Check your email ✉️",
        showConfirmButton: false,
        timer: 3000,
      });
        
}

}

export default useChangePassError