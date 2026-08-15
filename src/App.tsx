import type { RouteRecord } from 'vite-react-ssg'
import { SITE_DATA } from '@/generated/site-data'
import Layout from './components/layout/layout'
// SSG の静的 HTML と同一ツリーをハイドレーション時に即座に得るため eager import。
// lazy() だとコールドロード時に React のハイドレーション不一致エラー (#418) を起こす（review full の minor）。
import IndexPage from './pages/index'
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
        path: ':slug',
        element: <ChapterPage />,
        getStaticPaths: () => SITE_DATA.chapters.map((c) => c.slug),
      },
    ],
  },
]
