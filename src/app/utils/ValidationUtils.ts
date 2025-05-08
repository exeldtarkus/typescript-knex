const validateEmail = (email: string) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePhonenumber = (phonenumber: string) => {
  const re = /^0[0-9]{8,12}$/;
  return re.test(phonenumber);
};

export {validateEmail, validatePhonenumber};
