import { useParams } from 'react-router-dom'
import { SITE_DATA } from '@/generated/site-data'

export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const chapter = SITE_DATA.chapters.find((c) => c.slug === slug)
  if (!chapter) {
    return <p>章が見つかりません。</p>
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">{chapter.title}</h1>
      <p className="mt-2 text-muted-foreground">最終確認日: {chapter.lastVerified}</p>
      <pre className="mt-6 whitespace-pre-wrap font-sans">{chapter.body}</pre>
    </div>
  )
}

export default Component
