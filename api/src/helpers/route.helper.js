import Joi from 'joi';

const routeHelper = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error.details[0].message,
      }).status(400);
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required()
        .error(() => ({
          message: 'A valid email address is required',
        })),
      firstName: Joi.string().required()
        .error(() => ({
          message: 'First Name is required',
        })),
      lastName: Joi.string().required()
        .error(() => ({
          message: 'Last Name is required',
        })),
      password: Joi.string().required()
        .error(() => ({
          message: 'Password is required',
        })),
      type: Joi.string(),
      isAdmin: Joi.boolean(),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string().email().required()
        .error(() => ({
          message: 'A valid email address is required',
        })),
      password: Joi.string().required()
        .error(() => ({
          message: 'Password is required',
        })),
    }),
    createAccountSchema: Joi.object().keys({
      type: Joi.string().required()
        .valid(['savings', 'current'])
        .error(() => ({
          message: 'Account type must be savings or current and is required',
        })),
    }),
    accountStatusSchema: Joi.object().keys({
      status: Joi.string().required()
        .valid(['active', 'dormant'])
        .error(() => ({
          message: 'Status must be active or dormant and is required',
        })),
    }),
    debitCreditSchema: Joi.object().keys({
      amount: Joi.number().required()
        .error(() => ({
          message: 'Amount must be a number and is required',
        })),
    }),
  },
};

export default routeHelper;
