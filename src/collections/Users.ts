import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',

    hidden: ({ user }) => user?.role !== 'admin',
  },
  
  auth: true,

  access:{
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },

  fields: [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'marketing',
      saveToJWT: true,

      options: [
        {
          label: 'Marketing',
          value: 'marketing',
        },
        {
          label: 'Administrador',
          value: 'admin',
        }
      ],

      access:{
        create: ({ req: {user}}) => user?.role === 'admin',
        update: ({ req: {user}}) => user?.role === 'admin',
      },
      

      admin:{
        position: 'sidebar',
      }
    }
  ],
}
