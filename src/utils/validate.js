export const checkValidateData = (email,phone,password) => {
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)
    const isPhoneValid = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phone)
    // const isPasswordVald = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)


    if(!isEmailValid) {
        return "Email is not Valid"
    }
    if(!isPhoneValid){
        return "Mobile Number is not Valid"
    }
    return null

}