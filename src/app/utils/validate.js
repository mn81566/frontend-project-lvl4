import * as yup from 'yup';

// const { t } = useTranslation();
// import i18next from '../utils/i18n.js'
import i18next from '../locales/index.js';

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
    .required(i18next.t('error.necessary'))
    .min(2, i18next.t('error.wrongLength'))
    .max(20, i18next.t('error.wrongLength')),
  // prettier-ignore
  password: yup.string()
    .required(i18next.t('error.necessary')),
});

export const SignUpSchema = yup.object().shape({
  // prettier-ignore
  username: yup.string()
    .required(i18next.t('error.necessary'))
    .min(2, i18next.t('error.wrongLength'))
    .max(20, i18next.t('error.wrongLength')),
  // prettier-ignore
  password: yup.string()
    .required(i18next.t('error.necessary'))
    .min(6, i18next.t('error.wrongLengthPassword')),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], i18next.t('error.notSamePasswords')),
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
