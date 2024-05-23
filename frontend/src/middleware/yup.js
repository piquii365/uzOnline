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
