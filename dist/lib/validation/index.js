"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validationErrorMiddleware = void 0;
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const validator = new express_json_validator_middleware_1.Validator({});
const validationErrorMiddleware = (err, req, res, next) => {
    if (err instanceof express_json_validator_middleware_1.ValidationError) {
        res.status(422).send({
            errors: err.validationErrors,
        });
        next();
    }
    else {
        next(err);
    }
};
exports.validationErrorMiddleware = validationErrorMiddleware;
exports.validate = validator.validate;
//# sourceMappingURL=index.js.map