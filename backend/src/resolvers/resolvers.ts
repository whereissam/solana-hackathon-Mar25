import { mergeResolvers } from '@graphql-tools/merge'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import authentication from './authenticationResolver'
import charityResolver from './charityResolver'
import donationResolver from './donationResolver'
import { resolverWrapper, ResolverFunctionType } from './resolverWrapper'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { BigIntResolver, DateTimeResolver } from 'graphql-scalars'

const resolvers = mergeResolvers([
    { Upload: GraphQLUpload },
    { BigInt: BigIntResolver },
    { DateTime: DateTimeResolver },
    authentication,
    resolverWrapper(charityResolver, errorHandler),
    resolverWrapper(donationResolver, errorHandler)
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
            if (err instanceof PrismaClientValidationError) {
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