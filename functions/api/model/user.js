const joi = require("joi");

const schema = joi.object({
    qualified: joi.boolean(),
    name: joi.string().min(1),
    dni: joi.string().regex(/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}$/),
    email: joi.string().email(),
    age: joi.number().integer().min(17).max(26),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
    teamDescription: joi.string().min(1),
    motivation: joi.string().min(1),
});

module.exports = { schema };
