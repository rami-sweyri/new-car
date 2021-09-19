import Joi from '@hapi/joi';

export const schema =   Joi.object().keys({
   list: Joi.any()
       .required()
       .messages({
        'any.required': 'List is a required field'
       }),
    subjectLine: Joi.string()
        .required()
        .min(3)
        .max(121)
        .messages({
            'string.base':  'Subject Line should be a type of text',
            'string.empty':`Subject Line cannot be an empty field`,
            'string.min': `Subject Line should have a minimum length of {#limit}`,
            'string.max': `Subject Line should have a maximum length of {#limit}`,
            'any.required': `Subject Line is a required filed`
        }),
    title: Joi.string()
        .required()
        .min(3)
        .max(121)
        .messages({
            'string.base':  'Title should be a type of text',
            'string.empty': `Title cannot be an empty field`,
            'string.min': `Title should have a minimum length of {#limit}`,
            'string.max': `Title should have a maximum length of {#limit}`,
            'any.required': `Title is a required filed`
        }),
    content: Joi.string()
        .required()
        .min(3)
        .max(121)
        .messages({
            'string.base':  'Content should be a type of text',
            'string.empty': `Content cannot be an empty field`,
            'string.min': `Content should have a minimum length of {#limit}`,
            'string.max': `Content should have a maximum length of {#limit}`,
            'any.required': `Content is a required filed`
        }),
    fromName: Joi.string()
        .required()
        .min(3)
        .max(121)
        .messages({
            'string.base':  'form Name should be a type of text',
            'string.empty': `form Name cannot be an empty field`,
            'string.min': `form Name should have a minimum length of {#limit}`,
            'string.max': `form Name should have a maximum length of {#limit}`,
            'any.required': `form Name is a required filed`
        }),
    fromEmail: Joi.string()
        .required()
        .min(3)
        .max(121)
        .messages({
            'string.base':  'from Email should be a type of text',
            'string.empty': `from Email cannot be an empty field`,
            'string.min': `from Email should have a minimum length of {#limit}`,
            'string.max': `from Email should have a maximum length of {#limit}`,
            'any.required': `from Email is a required filed`
        })
});

export const validator = (schema, values, setValues) => {
    const valid = schema.validate(values, { abortEarly: false });
    const newErrorObject = {};
    if (valid.error) {
        valid.error.details.forEach((err) => {
            newErrorObject[err.path.join('.')] = err.message;
        });
    }
    setValues({ ...newErrorObject });
};
