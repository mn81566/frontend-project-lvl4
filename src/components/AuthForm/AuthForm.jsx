import React, { useContext } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useState } from 'react';
// import routes from "../../../server/routes.js";
import axios from 'axios';
import { useAuth } from 'react-use-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';
import { AuthSchema } from '../../app/utils/validate.js';

const AuthForm = () => {
  // const [isFailedValidation, setIsFailedValidation] = useState(true);
  const [authData, setAuthData] = useState({
    username: 'admin',
    password: 'admin',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { logIn } = useContext(AuthContext);

  // const AuthSchema = yup.object().shape({
  //   // prettier-ignore
  //   username: yup.string()
  //     .required()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!"),
  //   // prettier-ignore
  //   password: yup.string()
  //     .required()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!"),
  // });

  // const TestSchema = getSchema([]);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        try {
          console.log('values', values);
          const {
            data: { token },
          } = await axios.post('/api/v1/login', values);
          // const res = await axios.post('/api/v1/login', values);
          // localStorage.setItem('userId', JSON.stringify(token));
          logIn(token);
          const { from } = { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              type="input"
              id="username"
              name="username"
              autoComplete="username"
              required
              className="form-control"
            />
            <label htmlFor="username">Ваш ник</label>
            {errors.username && touched.username ? <span>{errors.username}</span> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              required
              className="form-control"
            />
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            {errors.password && touched.password ? <span>{errors.password}</span> : null}
          </BootstrapForm.Group>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Войти
          </button>
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
