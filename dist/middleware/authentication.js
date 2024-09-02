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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRET;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json('Access token não informado');
    }
    const [, accessToken] = token.split(' ');
    try {
        (0, jsonwebtoken_1.verify)(accessToken, secret);
        const decodedToken = (0, jsonwebtoken_1.decode)(accessToken);
        if (decodedToken) {
            req.usuarioId = decodedToken.id;
            req.usuarioEmail = decodedToken.email;
        }
        return next();
    }
    catch (error) {
        return res.status(401).send('Usuário não autorizado');
    }
});
exports.default = authenticate;
//# sourceMappingURL=authentication.js.map