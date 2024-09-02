"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistration = exports.getRegistration = exports.searchRegistrations = exports.getRegistrations = exports.addRegistration = void 0;
const Registration_1 = require("../models/Registration");
const addRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationData = req.body;
        const { id } = registrationData, updateData = __rest(registrationData, ["id"]);
        let registration;
        if (id) {
            registration = yield Registration_1.Registration.findOneAndUpdate({ id }, Object.assign(Object.assign({}, updateData), { updatedAt: new Date() }), { new: true });
        }
        else {
            registration = new Registration_1.Registration(Object.assign(Object.assign({}, registrationData), { updatedAt: new Date() }));
            yield registration.save();
        }
        res.status(201).json(registration);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addRegistration = addRegistration;
const getRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield Registration_1.Registration.find()
            .select('-_id -__v')
            .sort({ createdAt: -1 });
        const sortedRegistrations = registrations.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
        res.json(sortedRegistrations);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
});
exports.getRegistrations = getRegistrations;
const searchRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchString = req.query.q;
        if (!searchString) {
            return res.status(400).json({ error: 'Search string is required' });
        }
        const registrations = yield Registration_1.Registration.find({
            $or: [{ cpf: { $regex: searchString, $options: 'i' } }],
        });
        return res.status(200).json(registrations);
    }
    catch (error) {
        console.error('Error searching registrations:', error);
        return res
            .status(500)
            .json({ error: 'An error occurred while searching for registrations' });
    }
});
exports.searchRegistrations = searchRegistrations;
const getRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registration = yield Registration_1.Registration.findOne({
            id: req.params.id,
        }).select('-_id -__v');
        if (!registration) {
            res.status(404).json({ error: 'Registration not found' });
        }
        res.json(registration);
    }
    catch (err) {
        console.error('Failed to get registration', err);
        res.status(500).json({ error: 'Failed to get registration' });
    }
});
exports.getRegistration = getRegistration;
const deleteRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const registration = yield Registration_1.Registration.findOne({ id });
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        yield Registration_1.Registration.deleteOne({ id });
        return res
            .status(200)
            .json({ message: 'Registration deleted successfully' });
    }
    catch (err) {
        console.error('Failed to delete registration', err);
        res.status(500).json({ error: 'Failed to delete registration' });
    }
});
exports.deleteRegistration = deleteRegistration;
//# sourceMappingURL=registrationController.js.map