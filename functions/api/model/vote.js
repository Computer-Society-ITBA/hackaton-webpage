const joi = require("joi");

module.exports.vote = joi.object({
    relevancia: joi.number().min(1).max(5).required(),
    creatividad: joi.number().min(1).max(5).required(),
    presentacion: joi.number().min(1).max(5).required(),
    descripcion: joi.string().optional(),
});
