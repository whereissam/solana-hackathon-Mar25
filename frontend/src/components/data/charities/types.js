"use strict";
/**
 * Charity Data Types
 *
 * This file defines the TypeScript types for charity data in the consolidated data structure.
 * These types align with the GraphQL schema to ensure type safety across the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharitySector = void 0;
/**
 * Charity sector enumeration
 */
var CharitySector;
(function (CharitySector) {
    CharitySector["CHARITY"] = "charity";
    CharitySector["UG_PARTNER"] = "ug_partner";
    CharitySector["ANIMALS"] = "animals";
})(CharitySector || (exports.CharitySector = CharitySector = {}));
