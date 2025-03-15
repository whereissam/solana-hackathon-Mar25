import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import resolvers from './resolvers/resolvers'
import jwt from 'jsonwebtoken'

dotenv.config()

async function startup() {  
  const typeDefs = loadFilesSync(path.join(__dirname, "../../schema/graphql/**/*.graphql"))

  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cors())
  app.use(bodyParser.json())
  app.use('/', expressMiddleware(server,{
    context: async ({req}) => { 
      if (!req.headers.token) return {token: null, user: null}
      return {
        token: req.headers.token, 
        user: jwt.decode(req.headers.token)
      }
  }}))

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  })
}

startup().then()