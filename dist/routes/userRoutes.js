"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const router = (0, express_1.Router)();
router.get('/user-auth', authentication_1.default, userController_1.isAthenticated);
router.get('/users', userController_1.getUsers);
router.post('/users', userController_1.addUser);
router.get('/user/:id', userController_1.getUser);
router.post('/login', userController_1.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map