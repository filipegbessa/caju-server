"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const registrationRoutes_1 = __importDefault(require("./routes/registrationRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const PORT = process.env.PORT || 9000;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api', registrationRoutes_1.default);
app.use('/api', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map