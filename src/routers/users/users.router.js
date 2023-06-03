const { Router } = require("express");
const UserController = require("../../controllers/users.controller");

const router = Router();

router.post("/mockingusers/:total", UserController.generateUsers);
// Para probar router.get("/", UserController.getUsers); y router.get("/", UserController.getUserByEmail); descomente uno y comente el otro
router.get("/", UserController.getUsers);
router.get("/:uid", UserController.getUserById);
// router.get("/", UserController.getUserByEmail);
router.post("/", UserController.createUser);
router.put("/:uid", UserController.updateUserById);
router.delete("/:uid", UserController.deleteUserById);

module.exports = router;
