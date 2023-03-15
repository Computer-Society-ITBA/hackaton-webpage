const joi = require('joi');

const schema = joi.object({
    userId: joi.string().min(5).required(),
    video: joi.string().min(5).required(),
    repo: joi.string().min(5).required(),
    additionalContent: joi.string().min(5).optional(),
    description: joi.string().min(5).optional(),
});

module.exports = {schema};
