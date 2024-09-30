"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalError_1 = __importDefault(require("./middlewares/globalError"));
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: config_1.config.FRONTED_URL,
    credentials: true,
};
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use("/api", routes_1.routes);
// app.post("/api/testing", async (req: Request, res: Response) => {
//     const payload = req.body
//     return res.status(200).json({
//         success: false,
//         message: "success",
//         data: "ha"
//     })
// })
// testing route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//  global error
app.use(globalError_1.default);
// not found route
exports.default = app;
