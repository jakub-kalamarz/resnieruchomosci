import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
// import { Archive } from '../../blocks/ArchiveBlock'
// import { CallToAction } from '../../blocks/CallToAction'
// import { Content } from '../../blocks/Content'
// import { MediaBlock } from '../../blocks/MediaBlock'
import { propertyHero } from '../../fields/propertyHero'
import { slugField } from '../../fields/slug'
// import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateProperties } from './hooks/revalidateProperties'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/properties/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateProperties],
    afterRead: [],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'contact',
      label: 'Agent',
      type: 'relationship',
      relationTo: 'agent',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [propertyHero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              label: 'Treść ogłoszenia',
              type: 'richText',
              required: true,
            },
            {
              name: 'additionalContent',
              label: 'Dodatkowa treść',
              type: 'richText',
              required: false,
            },
            {
              name: 'slider', // required
              type: 'array', // required
              label: 'Galeria',
              minRows: 2,
              maxRows: 10,
              interfaceName: 'CardSlider', // optional
              labels: {
                singular: 'Zdjęcie',
                plural: 'Zdjęć',
              },
              fields: [
                {
                  name: 'image',
                  label: 'Zdjęcie',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Podpis',
                  type: 'text',
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data, index }: RowLabelArgs) => {
                    return data?.title || `Slide ${String(index).padStart(2, '0')}`
                  },
                },
              },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
