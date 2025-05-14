"use strict";
/**
 * Charity Data
 *
 * This file contains the consolidated charity data for the application.
 * It serves as the single source of truth for charity information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.charityData = void 0;
const types_1 = require("./types");
/**
 * Array of charity data
 */
exports.charityData = [
    {
        id: 1,
        name: 'Global Education Initiative',
        website: 'https://www.globaleducationinitiative.org',
        mission: 'Providing education opportunities to underprivileged children worldwide',
        sector: types_1.CharitySector.CHARITY,
        description: 'The Global Education Initiative works to ensure that every child has access to quality education regardless of their socioeconomic background.',
        address: {
            city: 'New York',
            country: 'USA',
            lat: 40.7128,
            lng: -74.0060,
            postcode: '10001'
        },
        beneficiaries: [
            {
                id: 101,
                email: 'john.doe@example.com',
                first_name: 'John',
                last_name: 'Doe'
            },
            {
                id: 102,
                email: 'jane.smith@example.com',
                first_name: 'Jane',
                last_name: 'Smith'
            }
        ]
    },
    {
        id: 2,
        name: 'Wildlife Conservation Trust',
        website: 'https://www.wildlifeconservationtrust.org',
        mission: 'Protecting endangered species and their habitats',
        sector: types_1.CharitySector.ANIMALS,
        description: 'The Wildlife Conservation Trust is dedicated to preserving biodiversity and ensuring the survival of endangered species through conservation efforts and habitat protection.',
        address: {
            city: 'San Francisco',
            country: 'USA',
            lat: 37.7749,
            lng: -122.4194,
            postcode: '94103'
        },
        beneficiaries: []
    },
    {
        id: 3,
        name: 'Uganda Community Development',
        website: 'https://www.ugandacommunitydevelopment.org',
        mission: 'Supporting sustainable development in Ugandan communities',
        sector: types_1.CharitySector.UG_PARTNER,
        description: 'Uganda Community Development works with local communities to implement sustainable development projects that improve quality of life and economic opportunities.',
        address: {
            city: 'Kampala',
            country: 'Uganda',
            lat: 0.3476,
            lng: 32.5825,
            postcode: ''
        },
        beneficiaries: [
            {
                id: 103,
                email: 'robert.mukasa@example.com',
                first_name: 'Robert',
                last_name: 'Mukasa'
            }
        ]
    }
];
