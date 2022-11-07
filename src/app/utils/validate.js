import * as yup from 'yup';

const getSchema = (channels) =>
  yup.object().shape({
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

export default getSchema;
