import Joi from 'joi';

const routeHelper = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error,
      }).status(400);
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    createAccountSchema: Joi.object().keys({
      type: Joi.string().required(),
    }),
    accountStatusSchema: Joi.object().keys({
      status: Joi.string().required(),
    }),
  },
};

export default routeHelper;
