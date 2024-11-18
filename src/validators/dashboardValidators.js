import Joi from "joi";


const transactionSchema = Joi.object({
    transaction: Joi.object({
        receiver: Joi.string()
            .email()
            .required()
            .normalize()
            .error(new Error('Please provide a valid email')),

        amount: Joi.number()
            .positive()
            .integer()
            .required()
            .error(new Error('Amount must be greater than 0 and must be an integer')),
    }).required()
});

export { transactionSchema };