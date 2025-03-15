"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const graphql_1 = require("@/generated/graphql");
const resolver = {
    login: async (_parent, args) => {
        console.log("LOGIN");
        const result = await userService_1.default.login(args.email, args.password);
        console.log(result);
        const authResult = {
            user: {
                ...result,
                id: result.id.toString(),
                role: graphql_1.RoleType[result.role]
            },
            token: ""
        };
        return authResult;
    },
    logout: async () => {
        return true;
    }
};
exports.default = resolver;
