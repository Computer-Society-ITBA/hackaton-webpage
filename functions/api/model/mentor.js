const joi = require("joi");

module.exports.mentor = joi.object({
    userId: joi.string().min(5).required(),
    submissions: joi.array().items(joi.string().min(5)).optional(),
    voted: joi.boolean().optional(),
});
