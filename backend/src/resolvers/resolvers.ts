import {mergeResolvers} from '@graphql-tools/merge'
import authentication from './authenticationResolver'

const resolvers = mergeResolvers([
    authentication
])

export default resolvers