import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'; // Remove this static import
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import resolvers from './resolvers/resolvers'
import jwt from 'jsonwebtoken'
import solanaActionRouter from './routes/solana-actions/router'
import nftRouter from './routes/nft/router'
import fugRouter from './routes/fug/router'

dotenv.config()

async function startup() {
  // Dynamically import graphqlUploadExpress
  const { default: graphqlUploadExpress } = await import('graphql-upload/graphqlUploadExpress.mjs');

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
  app.use('/donation', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.send({
      name: "UG Receipts",
      description: "XXX",
      image: "https://unifygiving.com/wp-content/uploads/2024/04/logo.svg",
      external_url: "https://unifygiving.com",
      properties: {
        files: [
          {
            uri: "https://unifygiving.com/wp-content/uploads/2024/04/logo.svg",
            type: "image/svg"
          }
        ],
        category: "image"
      }
    })
  })
  // Use the dynamically imported graphqlUploadExpress
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use('/donation', nftRouter)
  app.use('/solana-actions', solanaActionRouter)
  app.use('/FUG', fugRouter)
  app.use('/', expressMiddleware(server,{
    context: async ({req}) => {
      if (!req.headers.token) return {token: null, user: null}
      //console.log("req.headers.token", req.headers.token)
      return {
        token: req.headers.token,
        user: jwt.decode(Array.isArray(req.headers.token) ? req.headers.token[0] : req.headers.token)
      }
  }}))

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  })
}

// Remove the separate startServer function and its call
// async function startServer() {
//   const { default: graphqlUploadExpress } = await import('graphql-upload/graphqlUploadExpress.mjs');
//   // Ensure your app setup is within this async function or another one called after this import resolves.
//   // For example, if 'app' is defined outside, you can still use it here:
//   // app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
//   app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
//   console.log('Server setup with graphqlUploadExpress');
// }

// startServer().catch(error => {
//   console.error("Failed to start server:", error);
//   process.exit(1);
// });

startup().then(() => {
  console.log("Startup function completed.");
}).catch(error => {
  console.error("Failed to complete startup:", error);
  process.exit(1);
});