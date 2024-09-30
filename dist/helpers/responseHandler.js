"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, props) => {
    return res.status(props.status).json(props);
};
exports.default = sendResponse;
