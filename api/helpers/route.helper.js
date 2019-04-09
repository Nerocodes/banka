import Joi from 'joi';

const routeHelper = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
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
  },
};

export default routeHelper;
