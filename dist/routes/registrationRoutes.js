"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationController_1 = require("../controllers/registrationController");
const router = (0, express_1.Router)();
router.get('/registration/:id', registrationController_1.getRegistration);
router.post('/registrations', registrationController_1.addRegistration);
router.get('/registrations', registrationController_1.getRegistrations);
router.get('/registrations/search', registrationController_1.searchRegistrations);
exports.default = router;
//# sourceMappingURL=registrationRoutes.js.map