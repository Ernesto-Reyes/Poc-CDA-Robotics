import type { CollectionConfig, PayloadRequest,} from 'payload'
import {
  canCreateArticle,
  canReadArticle,
  canReadArticleVersions,
  canUpdateArticle,
} from '../access/articles'

import { isAdmin } from '../access/isAdmin'

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    beforeChange: [
      ({ data, req, operation, originalDoc }) => {
        const user = req.user

        if (!user) {
          return data
        }

        if (operation === 'create' && user.role === 'marketing') {
          data.author = user.id
          data.workflowStatus = 'draft'
        }

        if (user.role === 'admin' && data._status === 'published') {
          const workflowStatus =
            data.workflowStatus ?? originalDoc?.workflowStatus

          const canPublish =
            workflowStatus === 'approved' ||
            workflowStatus === 'published'

          if (!canPublish) {
            throw new Error(
              'El artículo debe estar aprobado antes de publicarse.',
            )
          }

          data.workflowStatus = 'published'
          data.publishedAt = new Date().toISOString()
        }

        return data
      },
    ],
  },

  labels: {
    singular: 'Artículo',
    plural: 'Artículos',
  },
  
  access: {
    create: canCreateArticle,
    read: canReadArticle,
    update: canUpdateArticle,
    delete: isAdmin,
    readVersions: canReadArticleVersions,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'workflowStatus',
      'author',
      'updatedAt',
    ],
  },

  versions: {
    drafts: true,
    maxPerDoc: 20,
  },

  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Texto utilizado en la URL. Ejemplo: automatizacion-industrial',
      },
    },
    {
      name: 'summary',
      label: 'Resumen',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      label: 'Imagen principal',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'workflowStatus',
      label: 'Estado editorial',
      type: 'select',
      required: true,
      defaultValue: 'draft',

      validate: (value: unknown, { req }: {req: PayloadRequest}) => {
        if (
          req.user?.role === 'marketing' &&
          typeof value === 'string' &&
          !['draft', 'in-review'].includes(value)
        ) {
          return 'Marketing solamente puede guardar borradores o enviarlos a revisión.'
        }

        return true
      },

      options: [
        {
          label: 'Borrador',
          value: 'draft',
        },
        {
          label: 'En revisión',
          value: 'in-review',
        },
        {
          label: 'Aprobado',
          value: 'approved',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
        {
          label: 'Rechazado',
          value: 'rejected',
        },
        ],
      
      
      admin: {
        position: 'sidebar',
         description:
         'Marketing debe seleccionar “En revisión” cuando el contenido esté listo.',
      },  
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      
      access: {
        update: ({ req: { user } }) => {
            return user?.role === 'admin'
        },
    },
     

      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}