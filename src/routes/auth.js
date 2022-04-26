const { Router} = require("express");
const { login } = require("../controllers/auth");
const { postLoginRequestValidations, postRegisterRequestValidations } = require("../middlewares/auth");

const router = Router();

router.post('/login', postLoginRequestValidations, login);

module.exports = router
