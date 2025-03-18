import { mergeResolvers } from '@graphql-tools/merge'
import authentication from './authenticationResolver'
import charityResolver from './charityResolver'
import { resolverWrapper, ResolverFunctionType } from './resolverWrapper'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'

const resolvers = mergeResolvers([
    authentication,
    resolverWrapper(charityResolver, errorHandler)
])

function errorHandler(this: any, f: ResolverFunctionType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (...args: [parent: any, args: any, context: any, info: any]) => {
        try {
            return await f.apply(this, args)
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                throw new GraphQLError("Error", {
                    extensions: {
                        code: err.code,
                        detail: err
                    }
                })
            }
            if (err instanceof PrismaClientValidationError){
                throw new GraphQLError("Error", {
                    extensions: {
                        detail: err.message
                    }
                })
            }
            throw err
        }
    };
}
export default resolvers