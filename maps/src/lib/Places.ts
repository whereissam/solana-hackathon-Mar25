import { LatLngExpression } from 'leaflet'
import { Category } from './MarkerCategories'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

export const Places: Readonly<PlacesType> = [
  {
    id: 1,
    position: [51.5884, -2.993],
    category: Category.CAT2,
    title: 'Eden Gate',
    address: 'HOMELESS SHELTER, CHARITY',
  },
  {
    id: 2,
    position: [51.5865, -2.9952],
    category: Category.CAT1,
    title: "Barnardo's Newport",
    address: 'Changing childhoods. Changing lives., UG PARTNER',
  },
  {
    id: 3,
    position: [51.5882, -2.9998],
    category: Category.CAT1,
    title: 'Scope - Newport',
    address: 'We’re here to create an equal future with disabled people., UG PARTNER',
  },
  {
    id: 4,
    position: [51.5901, -2.9975],
    category: Category.CAT2,
    title: 'Feed Newport CIC',
    address: '#feednewport, CHARITY',
  },
  {
    id: 5,
    position: [51.5858, -3.0023],
    category: Category.CAT1,
    title: 'Raven House Trust Newport',
    address: 'From Furniture to Food, UG PARTNER',
  },
  {
    id: 6,
    position: [51.592, -2.9905],
    category: Category.CAT2,
    title: 'Newport Carers Service – Hafal',
    address: 'No One In Wales Need Be Alone, CHARITY',
  },
  {
    id: 7,
    position: [51.5845, -2.9947],
    category: Category.CAT3,
    title: 'Blue Cross South Wales',
    address: 'Give homeless pets all the love and care they need, ANIMALS :)',
  },
  {
    id: 8,
    position: [51.5913, -3.0012],
    category: Category.CAT3,
    title: 'Friends of Newport City Dogs Home',
    address: 'Making the Difference One Paw At The Time!, ANIMALS :)',
  },
  {
    id: 9,
    position: [51.587, -2.996],
    category: Category.CAT2,
    title: 'The Share Centre Newport',
    address: 'All Together A Better Community',
  },
  {
    id: 10, position: [51.594315, -2.988631], category: Category.CAT2, title: 'Newport City Center', address: 'Newport, Wales, UK' },
  {
    id: 11, position: [51.585437, -3.014885], category: Category.CAT1, title: 'British Heart Foundation', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 12, position: [51.592503, -3.016131], category: Category.CAT2, title: 'Ieuan the Lion', address: 'Newport, Wales, CHARITY' },
  {
    id: 13, position: [51.598941, -2.986189], category: Category.CAT1, title: "Saint Vincent's Newport", address: 'Newport, Wales, UG PARTNER' },
  {
    id: 14, position: [51.580789, -3.019951], category: Category.CAT2, title: 'Age Cymru Gwent', address: 'Newport, Wales, CHARITY' },
  {
    id: 15, position: [51.582921, -3.015305], category: Category.CAT1, title: 'Cancer Research Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 16, position: [51.607164, -2.982147], category: Category.CAT1, title: 'Samaritans Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 17, position: [51.579999, -3.022364], category: Category.CAT2, title: 'St Davids Foundation Hospice Care, Newport', address: 'Newport, Wales, CHARITY' },
  {
    id: 18, position: [51.602412, -3.018025], category: Category.CAT2, title: 'SYED AHMED SHAH TRUST', address: 'Newport, Wales, CHARITY' },
  {
    id: 19, position: [51.57524, -3.02354], category: Category.CAT2, title: 'New Pathways Newport', address: 'Newport, Wales, CHARITY' },
  {
    id: 20, position: [51.578145, -3.020187], category: Category.CAT1, title: 'Pobl', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 21, position: [51.577635, -3.025039], category: Category.CAT1, title: 'Wastesavers Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 22, position: [51.600819, -3.011047], category: Category.CAT1, title: 'The Pill Millennium Centre', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 23, position: [51.576719, -3.027101], category: Category.CAT1, title: 'The Alacrity Foundation Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 24, position: [51.573541, -3.028618], category: Category.CAT1, title: 'British Red Cross Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 25, position: [51.583508, -3.022168], category: Category.CAT2, title: 'The Welsh Refugee Council Newport', address: 'Newport, Wales, CHARITY' },
  {
    id: 26, position: [51.602186, -2.993063], category: Category.CAT2, title: 'Barod', address: 'Newport, Wales, CHARITY' },
  {
    id: 27, position: [51.583309, -2.981264], category: Category.CAT1, title: 'THE ONYX LINK FOUNDATION, Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 28, position: [51.602892, -3.014046], category: Category.CAT1, title: 'The Beresford Centre', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 29, position: [51.574977, -2.979287], category: Category.CAT2, title: 'Llamau', address: 'Newport, Wales, CHARITY' },
  {
    id: 30, position: [51.58484, -3.026265], category: Category.CAT1, title: 'GAVO Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 31, position: [51.593155, -2.975505], category: Category.CAT1, title: 'GADS Newport', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 32, position: [51.598725, -2.97677], category: Category.CAT1, title: 'Victim Support', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 33, position: [51.591419, -3.02492], category: Category.CAT2, title: 'Tŷ Hafan children’s hospice', address: 'Newport, Wales, CHARITY' },
  {
    id: 34, position: [51.57896, -2.977133], category: Category.CAT2, title: 'Cruse Bereavement Care Newport', address: 'Newport, Wales, CHARITY' },
  {
    id: 35, position: [51.58168, -2.983106], category: Category.CAT1, title: 'Macmillan Cancer Support', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 36, position: [51.574615, -2.982185], category: Category.CAT1, title: 'ResponsABLE assistance', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 37, position: [51.58662, -3.026408], category: Category.CAT1, title: 'OPERASONIC', address: 'Newport, Wales, UG PARTNER' },
  {
    id: 38, position: [51.5771, -2.996427], category: Category.CAT1, title: 'TTrussell Newpot', address: 'Newport, Wales, UG PARTNER' }
]
