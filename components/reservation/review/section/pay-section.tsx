import { useFormik } from "formik";
import * as yup from "yup";
import IdForm from "../forms/id-form";
import PaymentForm from "../forms/payment-form";

const emailRegex =
  /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .matches(emailRegex, "Invalid email format")
    .oneOf([yup.ref("email"), ""], "Emails must match")
    .required("Confirm email is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  idDocument: yup.string().required("ID document is required"),
  agreement: yup.boolean().oneOf([true], "You must agree to the terms"),
  cardNumber: yup.string().min(19, "Card number must contain 16 digits"),
  expiryDate: yup.date().typeError("Invalid value"),
  cvv: yup.string().min(3, "CVV must contain 3 digits"),
});

export default function PaySection() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      dateOfBirth: "",
      phoneNumber: "",
      idDocument: "",
      agreement: false,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handlePayNow = async () => {
    const cardNumberValue = formik.values["cardNumber"];
    const expiryDateValue = formik.values["expiryDate"];
    const cvvValue = formik.values["cvv"];

    let isCCInfoValid = true;

    await formik.validateForm();

    if (!cardNumberValue) {
      formik.setFieldError("cardNumber", "Card number is required");
      isCCInfoValid = false;
    }

    if (!expiryDateValue) {
      formik.setFieldError("expiryDate", "Expiry date is required");
      isCCInfoValid = false;
    }

    if (!cvvValue) {
      formik.setFieldError("cvv", "CVV is required");
      isCCInfoValid = false;
    }

    if (!isCCInfoValid) return;

    formik.submitForm();
  };

  const handlePayLater = () => {
    formik.submitForm();
  };

  return (
    <section className="mt-5 space-y-5">
      <IdForm formik={formik} />
      <PaymentForm
        formik={formik}
        handlePayNow={handlePayNow}
        handlePayLater={handlePayLater}
      />
    </section>
  );
}
