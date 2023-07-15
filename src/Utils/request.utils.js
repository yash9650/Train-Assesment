"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, code = 200) => {
    const response = {
        success: true,
        result: data,
        statusCode: code,
        errorMessage: "",
    };
    return res.status(code).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, errorMessage, code = 400) => {
    const response = {
        success: false,
        result: null,
        statusCode: code,
        errorMessage,
    };
    return res.status(code).json(response);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=request.utils.js.map