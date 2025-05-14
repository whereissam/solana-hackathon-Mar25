/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../service/auth"
import { ResolverFn } from "../generated/graphql"
import { GraphQLError } from "graphql"
import { UnauthroizedError, InvalidArgumentsError } from "./errorTypes/errorTypes"

export type StrategyFunctionType = (user: User | null, functionArgument: any) => void

export function isAdmin() {
    return inRole("admin")
}

export function inRole(role: string) {
    function inRoleFunc(user: User | null, functionArgument: any) {
        if (user?.role !== role) throw UnauthroizedError(`User not in role ${role}`)
    }
    return inRoleFunc
}

export function all(...strategies: StrategyFunctionType[]) {
    return function (user: User | null, functionArgument: any) {
        let messages: string | string[] | null = null
        return strategies.every((strategy) => {
            const result = strategy(user, functionArgument)
            if (result != null)
                messages = result
            return result == null
        }) ? null : messages
    }
}

export function any(...strategies: StrategyFunctionType[]) {
    return function (user: User | null, functionArgument: any) {
        let lastError
        const success = strategies.some((strategyFunc) => {
            try {
                strategyFunc(user, functionArgument)
                return true
            } catch (e) {
                lastError = e
                return false
            }
        })
        if (!success)
            throw lastError
    }
}

export function trueFunc() {
    return null
}

export function falseFunc(): null {
    throw UnauthroizedError("Always False")
}

export function isEqUserId(argName: string) {
    return function (user: User | null, functionArgument: any) {
        if (!functionArgument[argName])
            throw InvalidArgumentsError(`argument ${argName} does not exists`)
        if (functionArgument[argName] !== user?.id) 
            throw UnauthroizedError(`${argName} is not equals to user id`)
    }
}

export function withAuth(
  strategies: StrategyFunctionType[], 
  resolver: (parent: any, args: any, contextValue: any) => any
) {
    return async (parent: any, args: any, contextValue: any) => {
        const user = contextValue.user;
        any(...strategies)(user, args);
        return resolver(parent, args, contextValue);
    };
}