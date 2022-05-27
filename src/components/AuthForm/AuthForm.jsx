import React from "react";
import { Formik, Form, Field, useFormik } from "formik";
// import { Formik, useFormik } from "formik";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import * as yup from "yup";
// import regeneratorRuntime from "regenerator-runtime";

// const AuthSchema = yup.object().shape({
//   // prettier-ignore
//   name: yup.string()
//     .required()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!"),
//   // prettier-ignore
//   password: yup.string()
//   .required()
//   .min(2, "Too Short!")
//   .max(50, "Too Long!"),
// });

// const formik = Formik({
//   initialValues: { name: "", password: "" },
//   validationSchema: { AuthSchema },
//   onSubmit: (values) => {
//     const fromData = async (values) => {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       alert(JSON.stringify(values, null, 2));
//     };
//     fromData();
//   },
// });

// <Formik
//   initialValues={{ name: "", password: "" }}
//   validationSchema={AuthSchema}
//   onSubmit={async (values) => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     alert(JSON.stringify(values, null, 2));
//   }}
// >
//   {({ errors, touched }) => (
//     <Form>
//       <Field name="name" type="text" />
//       {errors.name && touched.name ? <span>{errors.name}</span> : null}
//       <Field name="password" type="password" />
//       {errors.password && touched.password ? <span>{errors.password}</span> : null}
//       <button type="submit">Submit</button>
//     </Form>
//   )}
// </Formik>

const AuthForm = () => {
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
        <Form className="p-3">
          <BootstrapForm.Group>
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <Field
              type="input"
              id="name"
              name="name"
              autoComplete="name"
              required
              className="form-control"
            />
            {errors.name && touched.name ? <span>{errors.name}</span> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <Field
              type="input"
              id="password"
              name="password"
              autoComplete="password"
              required
              className="form-control"
            />
            {errors.password && touched.password ? <span>{errors.password}</span> : null}
          </BootstrapForm.Group>
          <br />
          <BootstrapForm.Group>
            <Button type="submit" className="outline-primary">
              Submit
            </Button>
          </BootstrapForm.Group>
        </Form>
      )}
    </Formik>
  );
};

// const formik = useFormik({
//   initialValues: { name: "", password: "" },
//   validationSchema: { AuthSchema },
//   onSubmit: async (values) => {
//     // try {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     alert(JSON.stringify(values, null, 2));
//     // } catch (err) {
//     //   throw err;
//     // }
//   },
// });

//   return (
//     <Form onSubmit={formik.handleSubmit} className="p-3">
//       <Form.Group>
//         <Form.Label className="form-label" htmlFor="name">
//           Name
//         </Form.Label>
//         <Form.Control
//           type="input"
//           id="name"
//           name="name"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//           autoComplete="name"
//           required
//           className="form-control"
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.name && formik.touched.name ? <span>{formik.errors.name}</span> : null}
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Form.Group>
//         <Form.Label className="form-label" htmlFor="password">
//           Password
//         </Form.Label>
//         <Form.Control
//           type="input"
//           id="password"
//           name="password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//           autoComplete="password"
//           required
//           className="form-control"
//         />
//         <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//       </Form.Group>
//       <Button type="submit" className="outline-primary">
//         Submit
//       </Button>
//     </Form>
//   );
// };

export default AuthForm;
