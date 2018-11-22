export const signupValidations = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;

    if(data.firstName ==='' || data.lastName ==='' || data.email ==='' || data.password ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.firstName))) {
        msg = "Please enter valid First Name";
        return msg;
    }
    if(!(namePattern.test(data.lastName))){
        msg = "Please enter valid Last Name";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Please enter valid Email Address";
        return msg;
    }
    if (data.password.length<4 || data.password.length>14) {
        msg = "Password must be 4 to 15 character long";
        return msg;
    }
    if (!(passwordPattern.test(data.password))) {
        msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
        return msg;
    }

    return msg;
};

export const loginValidations = (data) => {
    let msg = "";
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if( data.email ==='' || data.password ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Please enter valid email";
        return msg;
    }
    return msg;
};

export const isEmpty = value => {
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
};

