import Link from 'next/link'

export default function LogoutButton() {
  return (
    <Link
      href="/admin/logout"
      prefetch={false}
      style={{
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      Cerrar sesión
    </Link>
  )
}
