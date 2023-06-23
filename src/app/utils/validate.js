import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

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
    .min(2, 'Too Short')
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

// export const AddChannelSchema = yup.object().shape({
//   // prettier-ignore
//   channelName: yup.string()
//     .required()
//     .min(3, "От 3 до 20 символов!")
//     .max(20, "От 3 до 20 символов!")
//     .notOneOf([channels.map((channel) => channel.name)], "Должно быть уникальным"),
// });

// export default getSchema;
