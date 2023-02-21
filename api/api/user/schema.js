const joi = require('joi');

const schema = joi.object({
    qualified: joi.boolean(),
    full_name: joi.string()
    .min(1),
    dni: joi.string().regex(new RegExp('^[0-9]{1,2}\.?[0-9]{3,3}\.?[0-9]{3,3}$')),
    email:joi.string().email(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    teamDescription:joi.string().min(1),
    motivation:joi.string().min(1)    
})

module.exports = {schema}