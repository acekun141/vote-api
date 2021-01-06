import joi from 'joi';

export const LoginDto = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required()
});

export const RegisterDto = joi.object().keys({
  username: joi.string().min(6).max(255).required(),
  password: joi.string().min(6).max(255).required()
});

export const RejectTokenDto = joi.object().keys({
  refreshToken: joi.string().required()
});

export const RefreshTokenDto = joi.object().keys({
  username: joi.string().required(),
  refreshToken: joi.string().required()
});