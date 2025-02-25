const joi = require("joi");

module.exports.vote = joi.object({
    problematica: joi.number().min(1).max(5).required(),
    relacion: joi.number().min(1).max(3).required(),
    innovacion: joi.number().min(1).max(5).required(),
    impacto: joi.number().min(1).max(5).required(),
    facilidad: joi.number().min(1).max(3).required(),
    interfaz: joi.number().min(1).max(8).required(),
    mvp: joi.number().min(1).max(10).required(),
    video: joi.number().min(1).max(3).required(),
    descripcion: joi.string().min(0).optional(),
});
