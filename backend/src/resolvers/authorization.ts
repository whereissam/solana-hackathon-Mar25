/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata"
import { User } from "../service/auth"
import { ResolverFn } from "../generated/graphql"
import { GraphQLError } from "graphql"

export type StrategyFunctionType = (user: User | null, functionArgument: any) => string | null | string[]

export function isAdmin(user: User | null){
    return user?.role === 'admin' ? null : "not admin"
}

export function inRole(role: string){
    return function (user: User | null, functionArgument: any) {
        return user?.role === role ? null : `not in role: ${role}`
    } 
}

export function and(...strategies: StrategyFunctionType[]){
    return function (user: User | null, functionArgument: any) {
        let messages: string|string[]|null = null
        return strategies.every((strategy)=>{ 
            const result = strategy(user, functionArgument)
            if (result!=null) 
                messages = result
            return result == null
        }) ? null : messages
    }
}

export function trueFunc(){
    return null
}

export function falseFunc(){
    throw new GraphQLError("FALSEDDD", {
        extensions: {
            code: 1234
        }
    })
    return null
}

export function isEqUserId(argName: string){
    return function (user: User | null, functionArgument: any){
        if (!functionArgument[argName]) return `isEqUserId: ${argName} not found`
        return functionArgument[argName] === user?.id ? null : `${argName} is not equals to user id`
    }
}

export function withAuth(strategies: StrategyFunctionType[], resolver: (parent, args, contextValue)=>any){
    return async (parent, args, contextValue) => {
        const user = contextValue.user
        let success = strategies.length==0 || false
        const functionArgument = arguments.length==0? {}: arguments[0]
            const messages : (string | null | string[]) [] = []
            strategies.some((strategy)=>{
                const result = strategy(user, functionArgument)
                if (!result) {
                    success = true
                    return true
                }else{
                    messages.push(result)
                }
            })
            if (success) {
                return resolver(parent, args, contextValue)
            }else{
                throw new GraphQLError(messages.toString(), {
                    extensions: {
                        code: "ERROR"
                    }
                })
            }
    }
}