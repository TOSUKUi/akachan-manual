import { Link } from 'react-router-dom'
import { SITE_DATA } from '@/generated/site-data'

export function Component() {
  return (
    <div>
      <h1 className="text-3xl font-bold">{SITE_DATA.meta.siteName}</h1>
      <p className="mt-2 text-muted-foreground">
        最終確認日: {SITE_DATA.meta.siteLastVerified}
      </p>
      <ul className="mt-6 space-y-2">
        {SITE_DATA.chapters.map((c) => (
          <li key={c.slug}>
            <Link to={`/${c.slug}`} className="text-primary underline">
              {c.order}. {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Component
