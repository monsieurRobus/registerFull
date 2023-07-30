import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  
const navigate = useNavigate()

    const [user, setUser] = useState( () => 
    {
        const data = localStorage.getItem('user')
        const parseUser = JSON.parse(data)

        if (parseUser) 
            return parseUser        
        else        
            return null
        
    })


const [allUser, setAllUser] = useState( {
    data: {
        confirmationCode: '',
        user: {
            password: '',
            email: '',
        }
    }

})


const userLogin = (data) =>  {
    
    localStorage.setItem('user',data)
  
    const parseUser = JSON.parse(data)
    setUser(() => parseUser)

}

const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
}

const bridgeData = (state) => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    console.log(dataJson);
    switch (state) {
      case "ALLUSER":
        setAllUser(dataJson);
        localStorage.removeItem("data");

        break;

      default:
        break;
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      userLogin,
      logout,
      allUser,
      setAllUser,
      bridgeData,
    }),
    [user, allUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

  export const useAuth = () => {
    return useContext(AuthContext);
  }