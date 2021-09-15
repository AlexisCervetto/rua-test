const router = require("express").Router();

// Toda request que tenga en su url /api, va a llegar aca.
const albumsRouter = require("./api/albums");
const authRouter = require("./api/auth");

router.use("/albums", albumsRouter);
router.use("/auth", authRouter);

module.exports = router;