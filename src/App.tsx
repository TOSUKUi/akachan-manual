import type { RouteRecord } from 'vite-react-ssg'
import { SITE_DATA } from '@/generated/site-data'
import Layout from './components/layout/layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/index'),
      },
      {
        path: ':slug',
        lazy: () => import('./pages/[chapter]'),
        getStaticPaths: () => SITE_DATA.chapters.map((c) => c.slug),
      },
    ],
  },
]
