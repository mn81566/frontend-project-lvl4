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

  const AuthSchema = yup.object().shape({
    // prettier-ignore
    username: yup.string()
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
      initialValues={{ username: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        try {
          console.log('values', values);
          const {
            data: { token },
          } = await axios.post('/api/v1/login', values);
          // const res = await axios.post('/api/v1/login', values);
          // localStorage.setItem("token", JSON.stringify(token));
          // auth.login();

          logIn(token);
          // logIn(JSON.stringify(token));
          const { from } = { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
    >
      {/* <form className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
              <input placeholder="От 3 до 20 символов" name="username" autocomplete="username" required="" id="username" className="form-control is-invalid" value=""><label className="form-label" for="username">Имя пользователя</label>
              <div placement="right" className="invalid-tooltip">Обязательное поле</div>
          </div>
          <div className="form-floating mb-3">
              <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autocomplete="new-password" type="password" id="password" className="form-control" value="">
              <div className="invalid-tooltip">Обязательное поле</div>
              <label className="form-label" for="password">Пароль</label>
          </div>
          <div className="form-floating mb-4">
              <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autocomplete="new-password" type="password" id="confirmPassword" className="form-control" value="">
              <div className="invalid-tooltip"></div>
              <label className="form-label" for="confirmPassword">Подтвердите пароль</label>
          </div>
          <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
        </form> */}
      {({ errors, touched }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              type="input"
              id="username"
              name="username"
              autoComplete="username"
              required
              className="form-control"
            />
            <label htmlFor="username">Имя пользователя</label>
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
              Подтвердите пароль
            </label>
            {errors.password && touched.password ? <span>{errors.password}</span> : null}
          </BootstrapForm.Group>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Зарегистрироваться
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
