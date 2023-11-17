import * as yup from 'yup';
import i18next from '../locales/index.js';

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
