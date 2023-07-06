export const token = () => {
    const user = localStorage.getItem('user')
    if(user){
        const parseUser = JSON.parse(user)
        return parseUser.token
    }
}