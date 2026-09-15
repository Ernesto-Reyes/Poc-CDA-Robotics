import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
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
          value: 'administrador',
        }
      ],
      admin:{
        position: 'sidebar',
      }
    }
  ],
}
