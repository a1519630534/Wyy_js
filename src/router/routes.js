export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/recommend')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/home/rank')
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: () => import('@/views/home/songList')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/views/home/radio')
  },
  {
    path: '/songer',
    name: 'songer',
    component: () => import('@/views/home/songer')
  },
  {
    path: '/newdisk',
    name: 'newdisk',
    component: () => import('@/views/home/newDisk')
  },
]