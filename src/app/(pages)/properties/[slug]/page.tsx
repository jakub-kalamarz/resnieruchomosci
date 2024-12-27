import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Property, Agent } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { ProjectHero } from '../../../_heros/ProjectHero'
import { generateMeta } from '../../../_utilities/generateMeta'

import { Media } from '@/app/_components/Media'
import { row } from 'payload/dist/fields/config/schema'
import RichText from '@/app/_components/RichText'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Property({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let project: Property | null = null

  try {
    project = await fetchDoc<Property>({
      collection: 'properties',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!project) {
    notFound()
  }

  return (
    <React.Fragment>
      <div className="container mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[500px]">
          <div className="md:col-span-2 relative">
            <Media resource={project.hero.heroImage} imgClassName="rounded-3xl max-h-[500px]" />
          </div>
          <div className="space-y-4">
            <Media
              resource={project.hero.secondaryImage}
              imgClassName="rounded-3xl max-h-[240px]"
            />
            <div className="bg-gray-100 rounded-3xl relative">
              <Media resource={project.hero.priceImage} imgClassName="rounded-3xl max-h-[240px]" />
              <div className="absolute bottom-0 left-0 right-0 top-0 p-4 bg-green-700 bg-opacity-75 rounded-3xl">
                <div className="flex flex-col justify-end h-full gap-4">
                  <div>
                    <p className="text-white text-xl font-bold my-0">Cena</p>
                    <p className="text-white text-2xl font-bold mt-0">{project.hero.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <div className="bg-gray-50 p-4 rounded-3xl flex flex-col space-y-2">
              <h3 className="text-2xl font-bold">Opis</h3>
              <div className="w-full h-[2px] bg-gray-300 rounded-3xl"></div>
              <RichText content={project.content} />
            </div>
            <div className="bg-gray-50 p-4 rounded-3xl flex flex-col space-y-2">
              <h3 className="text-2xl font-bold">Dodatkowe informacje</h3>
              <div className="w-full h-[2px] bg-gray-300 rounded-3xl"></div>
              <RichText content={project.additionalContent} />
            </div>
          </div>
          <div className="md:col-span-1 space-y-4 relative">
            <div className="bg-gray-50 p-4 rounded-3xl flex flex-col space-y-2">
              <h3 className="text-2xl font-bold">Agent</h3>
              <div className="w-full h-[2px] bg-gray-300 rounded-3xl"></div>
              {project.contact && typeof project.contact === 'object' && (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row py-4 content-center">
                    <Media resource={project.contact.image} imgClassName="rounded-full w-24 h-24" />
                    <div className="flex flex-col justify-center ml-4">
                      <p className="text-xl font-bold">{project.contact.name}</p>
                      <p className="text-xl font-bold">Agent nieruchomości</p>
                      <p className="text-lg">{project.contact.phone}</p>
                      <p className="text-lg">{project.contact.email}</p>
                    </div>
                  </div>
                  <RichText content={project.contact.bio} />
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={`tel:${project.contact.phone}`}
                      className="bg-green-700 text-white text-center py-2 px-4 rounded-3xl"
                    >
                      Zadzwoń
                    </a>
                    <a
                      href={`mailto:${project.contact.email}`}
                      className="bg-green-700 text-white text-center py-2 px-4 rounded-3xl"
                    >
                      Email
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-3xl flex flex-col space-y-2">
              <h3 className="text-2xl font-bold">Dane techniczne</h3>
              <div className="w-full h-[2px] bg-gray-300 rounded-3xl"></div>
              <div className="space-y-4">
                <p>
                  <span className="font-bold">Powierzchnia:</span> 120 m<sup>2</sup>
                </p>
                <p>
                  <span className="font-bold">Liczba pokoi:</span> 4
                </p>
                <p>
                  <span className="font-bold">Piętro:</span> 2
                </p>
                <p>
                  <span className="font-bold">Rok budowy:</span> 1994
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const projects = await fetchDocs<Property>('properties')
    return projects?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let project: Property | null = null

  try {
    project = await fetchDoc<Property>({
      collection: 'properties',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: project })
}
