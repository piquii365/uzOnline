import * as Yup from "yup";
const passwordPatten = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
const namePatten = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
export const registerValidationSchema = Yup.object({
  fullName: Yup.string()
    .matches(namePatten, "write full name as John Doe")
    .required("Full name should be provided"),
  username: Yup.string()
    .matches(/^[a-zA-Z].{5,}$/, "Username should be at least 5 characters long")
    .required("Username should be provided"),
  email: Yup.string()
    .email("Enter your email as johndoe@gmail.com")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordPatten,
      "Password should at least include an uppercase letter, lowercase letter, a number, a special character, and must contain at least 8 characters "
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm password"),
  regNumber: Yup.string().required("Please provide Reg Number"),
});
export const addStudentValidationSchema = Yup.object({
  regNumber: Yup.string()
    .required("Please provide Reg Number")
    .matches(/^R.{5,}$/, "Enter reg number as R123456R"),
  fullName: Yup.string()
    .required("Please provide Full Name")
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)?(?:\s[A-Za-z]+)+$/,
      "Enter full name as John Doe"
    ),
});
export const regNumberValidationSchema = Yup.object({
  regNumber: Yup.string()
    .required("Please provide Reg Number")
    .matches(/^R.{5,}$/, "Enter reg number as R123456R"),
});
export const adminLoginValidation = Yup.object({
  username: Yup.string().required("Email or Username is required for login"),
  password: Yup.string().required("Password is required for login"),
});
export const adminRegValSchema = Yup.object({
  fullName: Yup.string()
    .required("")
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)?(?:\s[A-Za-z]+)+$/,
      "Enter full name as John Doe"
    ),
  username: Yup.string()
    .required("Provide a username")
    .matches(
      /^[a-zA-Z].{5,}$/,
      "Username should be at least 5 characters long"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Enter your email as johndoe@gmail.com"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/,
      "Password should at least include an uppercase letter, lowercase letter, a number, a special character, and must contain at least 8 characters "
    ),
  confirmPassword: Yup.string()
    .required("Please Confirm Password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  idNumber: Yup.string()
    .required("Input National ID Number")
    .matches(
      /^(?:[1-9]\d{1,2})-\d{7,}[A-Z]\d{1,2}$/,
      "Valid ID Number should be in the form 99-11111X99"
    ),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .required("Please Provide Phone Number")
    .matches(
      /^(?:\+263\d{9}(?:0\d)?|0\d{9}(?:0\d)?)$/,
      "Provide valid Phone number either as 07777777777 or +263"
    ),
});
