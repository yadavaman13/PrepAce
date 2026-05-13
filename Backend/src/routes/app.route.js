const express = require("express");
const { redirectUserToClient } = require("../controllers/app.controller.js");

const appRouter = express.Router();

/**
 * @route GET /*
 * @description Redirect user to client on all non-api urls
 * @access Public
 */
appRouter.get(/^(?!\/(api|assets)\/).*/, redirectUserToClient);

module.exports = appRouter;