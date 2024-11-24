import Joi from 'joi';

const emailValidator = Joi.string()
    .email()
    .required()
    .normalize()
    .error(new Error('Please provide a valid email'));

const phoneValidator = Joi.string()
    .pattern(/^\+\d+$/) // phone should start with + and contain only digits
    .min(10)
    .max(15)
    .required()
    .error(new Error('Phone number must start with a + and contain only digits afterwards and be between 10 and 15 characters'));

const passwordValidator = Joi.string()
    .min(8)
    .max(20)
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .error(new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'));

const passcodeValidator = Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .error(new Error('OTP should be 6 numbers and must contain only digits'));

const nameValidator = Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[A-Za-z ]+$/)
    .error(new Error('Name must contain only letters and spaces, and be at least 3 characters long.'));


const userRegisterSchema = Joi.object({
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    name: nameValidator
});

const userLoginSchema = Joi.object({
    email: emailValidator,
    password: passwordValidator
});

const userOtpSchema = Joi.object({
    email: emailValidator,
    passcode: passcodeValidator,
});

export { userRegisterSchema, userLoginSchema, userOtpSchema };
