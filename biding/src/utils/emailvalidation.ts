export const validateEmail = (setEmailError: Function, email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    setEmailError("Invalid email address");
    return false;
  } else {
    setEmailError("");
    return true;
  }
};
