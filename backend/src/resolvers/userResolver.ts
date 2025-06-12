import userService from '../service/userService'
import { withAuth, isAdmin, inRole, any, isEqUserId } from './authorization'
import { MutationCreateDonorArgs } from '../generated/graphql'

const resolver = {
    Mutation: {
        createDonor: withAuth([isAdmin()], async (_parent, args: MutationCreateDonorArgs, context) => {
            return await userService.createDonor(args.input.email, args.input.password, args.input.first_name, args.input.last_name)
        }   ),
    }
}

export default resolver