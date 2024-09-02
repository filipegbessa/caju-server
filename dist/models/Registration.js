"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = exports.RegistrationSchema = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
exports.RegistrationSchema = new mongoose_1.Schema({
    id: { type: String, default: uuid_1.v4, unique: true },
    employeeName: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String },
    admissionDate: { type: Date, required: true },
    status: { type: String, required: true },
}, { timestamps: true });
exports.Registration = (0, mongoose_1.model)('Registration', exports.RegistrationSchema);
//# sourceMappingURL=Registration.js.map