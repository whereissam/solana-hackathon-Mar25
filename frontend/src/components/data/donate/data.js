"use strict";
/**
 * Donation Data
 *
 * This file contains the consolidated donation data for the application.
 * It serves as the single source of truth for donation information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationData = void 0;
const types_1 = require("./types");
/**
 * Array of donation data
 */
exports.donationData = [
    {
        id: 1,
        amount: 100,
        currency: 'USD',
        type: types_1.DonationType.ONE_TIME,
        status: types_1.PaymentStatus.COMPLETED,
        charityId: 1,
        userId: 201,
        createdAt: new Date('2023-10-15T14:30:00Z'),
        message: 'Keep up the great work!'
    },
    {
        id: 2,
        amount: 25,
        currency: 'USD',
        type: types_1.DonationType.ONE_TIME,
        status: types_1.PaymentStatus.COMPLETED,
        charityId: 3,
        userId: 202,
        createdAt: new Date('2023-11-05T09:15:00Z'),
        message: 'Supporting the community development efforts'
    },
    {
        id: 3,
        amount: 50,
        currency: 'USD',
        type: types_1.DonationType.MONTHLY,
        status: types_1.PaymentStatus.ACTIVE,
        charityId: 2,
        userId: 203,
        createdAt: new Date('2023-12-01T16:45:00Z'),
        message: 'For wildlife conservation'
    },
    {
        id: 4,
        amount: 75,
        currency: 'USD',
        type: types_1.DonationType.ONE_TIME,
        status: types_1.PaymentStatus.COMPLETED,
        charityId: 1,
        userId: 201,
        createdAt: new Date('2024-01-10T11:20:00Z'),
        message: 'Additional support for education initiatives'
    },
    {
        id: 5,
        amount: 30,
        currency: 'USD',
        type: types_1.DonationType.MONTHLY,
        status: types_1.PaymentStatus.ACTIVE,
        charityId: 3,
        userId: 204,
        createdAt: new Date('2024-02-15T13:10:00Z'),
        message: 'Monthly contribution to Uganda development'
    }
];
