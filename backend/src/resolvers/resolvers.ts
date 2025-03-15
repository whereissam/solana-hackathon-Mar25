import {mergeResolvers} from '@graphql-tools/merge'
import authentication from './authenticationResolver'
import charityResolver from './charityResolver'

const resolvers = mergeResolvers([
    authentication,
    charityResolver
])

export default resolvers