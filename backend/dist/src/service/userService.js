"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/repository/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    async login(email, password) {
        const hashedPassword = bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.users.findFirstOrThrow({
            where: {
                email: email
            }
        });
        if (user.password != hashedPassword) {
            throw "INVALID_PASSWORD";
        }
        return user;
    }
}
const userService = new UserService();
exports.default = userService;
