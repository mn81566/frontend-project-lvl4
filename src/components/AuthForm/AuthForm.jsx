import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const AuthSchema = yup.object().shape({
  // prettier-ignore
  name: yup.string()
    .required()
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  // prettier-ignore
  password: yup.string()
  .required()
  .min(2, "Too Short!")
  .max(50, "Too Long!"),
});

const AuthForm = () => {
  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" type="text" />
          {errors.name && touched.name ? <span>{errors.name}</span> : null}
          <Field name="password" type="password" />
          {errors.password && touched.password ? <span>{errors.password}</span> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
