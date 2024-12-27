import type { Field } from 'payload/types'

export const propertyHero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'propertyType',
      label: 'Typ nieruchomości',
      required: true,
      defaultValue: 'apartment',
      options: [
        {
          label: 'Mieszkanie',
          value: 'apartment',
        },
        {
          label: 'Dom',
          value: 'house',
        },
        {
          label: 'Działka',
          value: 'area',
        },
        {
          label: 'Działka',
          value: 'commercial',
        },
      ],
    },
    {
      type: 'select',
      name: 'advertiseType',
      label: 'Typ ogłoszenia',
      required: true,
      defaultValue: 'sell',
      options: [
        {
          label: 'Sprzedaż',
          value: 'sell',
        },
        {
          label: 'Wynajem',
          value: 'rent',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      label: 'Cena',
      required: true,
    },
    {
      name: 'heroImage',
      label: 'Zdjęcie główne',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'secondaryImage',
      label: 'Zdjęcie dodatkowe',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'priceImage',
      label: 'Zdjęcie cenowe',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
