import userService from '../service/userService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, falseFunc, trueFunc, inRole, any, all } from './authorization'

const resolver = {
    Mutation: {
        login: withAuth([trueFunc],
            async (_parent: any, args: MutationLoginArgs) => {
                const result = await userService.login(args.email, args.password)
                const authResult: AuthPayload = {
                    user: {
                        ...result.user,
                        id: result.user.id.toString(),
                        role: valueToEnum(RoleType, result.user.role)
                    },
                    token: result.token
                }
                return authResult
            }),
        logout: withAuth([trueFunc],
            async (_parent, _args, contextValue) => {
                console.log("LOGOUT");
                return true
            }
        )
    }
}

export default resolver