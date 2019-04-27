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

  validateParams: schema => (req, res, next) => {
    const result = Joi.validate(req.params, schema);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error.details[0].message,
      }).status(400);
    }

    req.params = result.value;
    return next();
  },

  validateQuery: schema => (req, res, next) => {
    const result = Joi.validate(req.query, schema);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error.details[0].message,
      }).status(400);
    }

    req.query = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required()
        .error(() => ({
          message: 'A valid email address is required',
        })),
      firstName: Joi.string().regex(/^[a-zA-Z]*$/).required()
        .error(() => ({
          message: 'First Name is required',
        })),
      lastName: Joi.string().regex(/^[a-zA-Z\\-]*$/).required()
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
      email: Joi.string().regex(/\S+@\S+\.\S+/).required()
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
      amount: Joi.number().positive().required()
        .error(() => ({
          message: 'Amount must be a positive number and is required',
        })),
    }),
    idSchema: Joi.object().keys({
      transactionId: Joi.number().integer().required()
        .error(() => ({
          message: 'Transaction ID must be an integer',
        })),
    }),
    accNoSchema: Joi.object().keys({
      accountNumber: Joi.number().integer().required()
        .error(() => ({
          message: 'Account number must be an integer',
        })),
    }),
    emailSchema: Joi.object().keys({
      email: Joi.string().regex(/\S+@\S+\.\S+/).required()
        .error(() => ({
          message: 'A valid email address is required',
        })),
    }),
    statusSchema: Joi.object().keys({
      status: Joi.string()
        .valid(['active', 'dormant', 'draft'])
        .error(() => ({
          message: 'Status must be active or dormant',
        })),
    }),
  },
};

export default routeHelper;
