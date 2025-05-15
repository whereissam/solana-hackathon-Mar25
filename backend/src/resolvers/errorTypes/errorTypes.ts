import { GraphQLError } from "graphql";

export enum ErrorTypes {
    UNAUTHORIZED = "UNAUTHORIZED", // Fix typo from UNAUTHROIZED
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

export const UnauthroizedError = (message:string) => (new BaseError(message, ErrorTypes.UNAUTHORIZED))
export const InvalidArgumentsError = (message:string) => (new BaseError(message, ErrorTypes.INVALID_ARGUMENTS))