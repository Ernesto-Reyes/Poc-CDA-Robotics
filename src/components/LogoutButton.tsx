export default function LogoutButton() {
  return (
    <a
      href="/admin/logout"
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
    </a>
  )
}