const joi = require("joi");

const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
const githubRegex =
    /^(?:https:\/\/)?(?:www\.)?github\.com\/[\w-]+\/[\w-]+(?:\/)?$/;

const schema = joi.object({
    userId: joi.string().min(5).required(),
    description: joi.string().min(5).optional(),
    additionalContent: joi.string().min(5).optional(),
    repo: joi.string().min(5).pattern(githubRegex).required(),
    branch: joi.string().min(1).optional(),
    commitHash: joi.string().min(1).optional(),
    deployLink: joi.string().min(5).optional(),
});

const videoSchema = joi.object({
    userId: joi.string().min(5).required(),
    video: joi.string().min(5).pattern(youtubeRegex).required(),
    pitch: joi.string().min(5).optional(),
})
module.exports = { schema, videoSchema };
