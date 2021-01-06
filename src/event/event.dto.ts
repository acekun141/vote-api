import joi from 'joi';

export const Post = joi.object().keys({
  eventName: joi.string().required(),
})

export const Patch = joi.object().keys({
  eventName: joi.string().required(),
})

export const Delete = joi.object().keys({
  id: joi.string().required()
})