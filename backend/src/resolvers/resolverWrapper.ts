/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from "graphql";

export type ResolverFunctionType = (parent?: any, args?: any, context?: any, info?: any) => unknown

export interface IDictionary<T> {
    [key: string]: T
}

export type ErrorHandlingFunctionType = (this: any, f: ResolverFunctionType) => any


function defaultErrorHandler(this: any, f: ResolverFunctionType) {
    return async (...args: [parent: any, args: any, context: any, info: any]) => {
        try {
            return await f.apply(this, args)
        } catch {
            throw new GraphQLError("Error", {
                extensions: {
                    code: 200,
                    argumentName: "id",
                    content: "ABCs"
                }
            })
        }
    };
}

export function resolverWrapper(resolver: IDictionary<IDictionary<ResolverFunctionType>>, errorHandler = defaultErrorHandler) {
    const wrapped : IDictionary<IDictionary<ResolverFunctionType>> = {}
    Object.getOwnPropertyNames(resolver).map((typeName: string) => {
        const handlerType = resolver[typeName]
        if (!wrapped[typeName]) wrapped[typeName] = {}
        Object.getOwnPropertyNames(handlerType).map((resolveFunctionName) => {
            wrapped[typeName][resolveFunctionName] = errorHandler(resolver[typeName][resolveFunctionName])
        })
    })
    return wrapped
}
