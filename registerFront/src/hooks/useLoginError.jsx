import Swal from "sweetalert2"

export const useLoginError = (res, setLoginOk, userLogin, setRes) => {
    if(res?.status == 200)
    {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('token', res.data.token)

        return Swal.fire({
            icon: "success",
            title: "Login correcto ✅",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    console.log(res)
    if(res?.response?.data == "Invalid password")
    {
        console.log(res)
        return Swal.fire({
            icon: "error",
            title: "Invalid Password 😞",
            showConfirmButton: false,
            timer: 1500,
        })

    }

    if(res?.response?.data == "User not found")
    {
        console.log(res)
        return Swal.fire({
            icon: "error",
            title: "User not found 🔍",
            showConfirmButton: false,
            timer: 1500,
        })
    }
}



export default useLoginError