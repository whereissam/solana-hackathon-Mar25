"use strict";
/**
 * Donation Data Types
 *
 * This file defines the TypeScript types for donation data in the consolidated data structure.
 * These types align with the GraphQL schema to ensure type safety across the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.DonationType = void 0;
/**
 * Donation type enumeration
 */
var DonationType;
(function (DonationType) {
    DonationType["ONE_TIME"] = "ONE_TIME";
    DonationType["MONTHLY"] = "MONTHLY";
    DonationType["ANNUAL"] = "ANNUAL";
})(DonationType || (exports.DonationType = DonationType = {}));
/**
 * Payment status enumeration
 */
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["ACTIVE"] = "ACTIVE";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
