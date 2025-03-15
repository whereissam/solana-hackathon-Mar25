"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = __importDefault(require("path"));
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
dotenv_1.default.config();
async function startup() {
    const typeDefs = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, "../../schema/graphql/**/*.graphql"));
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    // Set up Apollo Server
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers: resolvers_1.default,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use('/', (0, express4_1.expressMiddleware)(server));
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
}
startup().then();
