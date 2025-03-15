"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = exports.CacheControlScope = void 0;
/**
 * Cache behavior for ApolloServer
 * https://www.apollographql.com/docs/apollo-server/performance/caching
 */
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Private"] = "PRIVATE";
    CacheControlScope["Public"] = "PUBLIC";
})(CacheControlScope || (exports.CacheControlScope = CacheControlScope = {}));
var RoleType;
(function (RoleType) {
    RoleType["Admin"] = "admin";
    RoleType["Charity"] = "charity";
    RoleType["Donor"] = "donor";
    RoleType["Recipient"] = "recipient";
})(RoleType || (exports.RoleType = RoleType = {}));
