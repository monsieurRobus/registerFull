import Swal from "sweetalert2"



const useDeleteUserError = (res, setRes, setOk) => {
  
    if(res?.response?.data?.message?.includes('User not found')){
        return Swal.fire({
            icon: "error",
            title: "User not found",
            text: "user not found",
            showConfirmButton: false,
            timer: 2500,
            
        })
    }

    if(res?.status == 200) {
        
        setOk(() => true)
        return Swal.fire({
            icon: "success",
            title: "User deleted",
            text: "user deleted",
            showConfirmButton: false,
            timer: 2500,
            
        })
    }



}

export default useDeleteUserError