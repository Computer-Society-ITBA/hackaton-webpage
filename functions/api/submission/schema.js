const joi = require('joi');

const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
const githubRegex = /^(?:https:\/\/)?(?:www\.)?github\.com\/[\w-]+\/[\w-]+(?:\/)?$/;

const schema = joi.object({
    userId: joi.string().min(5).required(),
    video: joi.string().min(5).pattern(youtubeRegex).required(),
    repo: joi.string().min(5).pattern(githubRegex).required(),
    additionalContent: joi.string().min(5).optional(),
    description: joi.string().min(5).optional(),
});

module.exports = {schema};
