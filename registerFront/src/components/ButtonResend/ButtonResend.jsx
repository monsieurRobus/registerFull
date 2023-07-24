import React, {useState, useEffect} from 'react'
import useResendCode from '../../hooks/useResendCode'
import { resendCodeConfirmationUser } from '../../services/user.service'




const ButtonResend = ({setReloadPageError}) => {

    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const handleResend = async () => {
        const getEmailLocalStorage = () => {
            const user = localStorage.getItem('user')
            if (user == null) {
                return null
            }
            else {
                return JSON.parse(user).email
            }
    
        };
        setSend(true);
        setRes(
          await resendCodeConfirmationUser({
            email: localStorage.getItem("user")
              ? getEmailLocalStorage()
              : allUser?.data?.user?.email,
          })
        );
        setSend(false);
        }
    
    
        useEffect(() => {

            useResendCode(res, setRes, setReloadPageError)

        }, [res])

  return (
    <button
        className="btn"
        disabled={send}
        onClick={handleResend}
    >ButtonResend</button>
  )
  }

export default ButtonResend