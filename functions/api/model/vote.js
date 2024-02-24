const joi = require("joi");

module.exports.vote =  joi.object({
    userId: joi.string().min(5).required(),
    submissionId: joi.string().min(5).required(),
    relevancia: joi.number().min(0).max(5).required(),
    creatividad: joi.number().min(0).max(5).required(),
    presentacion: joi.number().min(0).max(5).required(),
    description: joi.string().min(5).optional(),
});

