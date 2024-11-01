import { useFormik } from "formik";
import IdForm from "../forms/id-form";
import PaymentForm from "../forms/payment-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  confirmEmail: yup
    .string()
    .email("Invalid email")
    .oneOf([yup.ref("email"), ""], "Emails must match")
    .required("Confirm email is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  idDocument: yup.string().required("ID document is required"),
  agreement: yup.boolean().oneOf([true], "You must agree to the terms"),
  cardNumber: yup.string(),
  expiryDate: yup.string(),
  cvv: yup.string(),
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section className="mt-5 space-y-5">
      <IdForm formik={formik} />
      <PaymentForm formik={formik} />
    </section>
  );
}
