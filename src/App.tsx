import type { RouteRecord } from 'vite-react-ssg'
import { SITE_DATA } from '@/generated/site-data'
import Layout from './components/layout/layout'
// SSG の静的 HTML と同一ツリーをハイドレーション時に即座に得るため eager import。
// lazy() だとコールドロード時に React のハイドレーション不一致エラー (#418) を起こす（review full の minor）。
import IndexPage from './pages/index'
import TimelinePage from './pages/timeline'
import ChapterPage from './pages/[chapter]'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        // 月齢別タイムライン（spec 0003）。静的なパスなので :slug より前に置く。
        path: 'timeline',
        element: <TimelinePage />,
      },
      {
        path: ':slug',
        element: <ChapterPage />,
        getStaticPaths: () => SITE_DATA.chapters.map((c) => c.slug),
      },
    ],
  },
]
