import * as yup from 'yup';

// const getSchema = (channels) =>
//   yup.object().shape({
//     // prettier-ignore
//     username: yup.string()
//     .required()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!"),
//     // prettier-ignore
//     password: yup.string()
//     .required()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!"),
//   });

export const AuthSchema = yup.object().shape({
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

export const SignUpSchema = yup.object().shape({
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
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
});

// export default getSchema;