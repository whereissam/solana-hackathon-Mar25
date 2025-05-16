import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import resolvers from './resolvers/resolvers'
import jwt from 'jsonwebtoken'
import solanaActionRouter, {actionjsonHandler} from './routes/solana-actions/router'
import nftRouter from './routes/nft/router'
import fugRouter from './routes/fug/router'

dotenv.config()

async function startup() {  
  const typeDefs = [
    ...loadFilesSync(path.join(__dirname, "../../schema/graphql/**/*.graphql"))
  ]

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
  app.use(graphqlUploadExpress() as unknown as express.RequestHandler)
  app.use('/donation', nftRouter)
  app.use('/solana-actions', solanaActionRouter)
  app.use('/actions.json', actionjsonHandler)
  app.use('/FUG', fugRouter)
  app.use('/', expressMiddleware(server,{
    context: async ({req}) => { 
      if (!req.headers.token) return {token: null, user: null}
      //console.log("req.headers.token", req.headers.token)
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