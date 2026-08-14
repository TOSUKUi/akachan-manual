import { Outlet } from 'react-router-dom'
import { SITE_DATA } from '@/generated/site-data'

export default function Layout() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-card px-4 py-3">
        <span className="font-heading text-lg font-bold">
          {SITE_DATA.meta.siteName}
        </span>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-border px-4 py-6 text-sm text-muted-foreground">
        {SITE_DATA.meta.siteName}
      </footer>
    </div>
  )
}
