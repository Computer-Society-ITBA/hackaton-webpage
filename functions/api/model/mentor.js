const joi = require("joi");

module.exports.mentor = joi.object({
    email: joi.string().email(),
    password: joi.string(),
    name: joi.string(),
});
