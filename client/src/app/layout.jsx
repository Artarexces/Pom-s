import '@/styles/globals.css'

export const metadata = {
  title: 'Pom-s',
  description: 'Pomodoro App para estudio y descanso',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
