import Swal from "sweetalert2"

export const useCheckCodeError = (
    res,
    setDeleteUser,
    setOk,
    setUser,
    setReloadPageError,
    setRes
) => {

    // 200: User activated
    if(res?.data?.user?.active?.toString() == "true")
        {
            
            if (localStorage.getItem('user'))
            {
                const currentUser = localStorage.getItem('user')
                const parseCurrentUser = JSON.parse(currentUser)

                const customUser = {
                    ...parseCurrentUser,
                    check: true
                }

                const customUserString = JSON.stringify(customUser);
                setUser(() => customUser);
                localStorage.setItem("user", customUserString);
            }
        setOk(()=> true)
        return Swal.fire({
            icon: "success",
            title: "Ok correct code ✅",
            showConfirmButton: false,
            timer: 1500,
          });
            
        }

    if(res?.data?.user?.active?.toString() == "false")
    {
        Swal.fire({
            icon: "error",
            title: "Interval server error ❎.",
            text: "user not activated",
            showConfirmButton: false,
            timer: 2500,
          });
          setRes(() => {});
    }
    
    if(res?.response?.data?.message?.includes('User already activated'))
    {
        Swal.fire({
            icon: "error",
            title: "User already activated",
            text: "user not activated",
            showConfirmButton: false,
            timer: 2500,
          });
          setRes(() => {});
    }

    if(res?.response?.status?.toString() == "404")
    {
        Swal.fire({
            icon: "error",
            title: "Interval server error ❎.",
            text: "user not found",
            showConfirmButton: false,
            timer: 2500,
          });
          setRes(() => {});
    }
}
