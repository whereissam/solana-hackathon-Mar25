import { GraphQLError } from "graphql";

export enum ErrorTypes {
    UNAUTHROIZED = "UNAUTHROIZED",
    INVALID_ARGUMENTS = "INVALID_ARGUMENTS"
}

export class BaseError extends GraphQLError{
    constructor(message: string, code: string){
        super(message, {
            extensions: {
                code
            }
        })
    }
}

export const UnauthroizedError = (message:string) => (new BaseError(message, ErrorTypes.UNAUTHROIZED))
export const InvalidArgumentsError = (message:string) => (new BaseError(message, ErrorTypes.INVALID_ARGUMENTS))