export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/recommend')
  },
  {
    path: '/rank/:id?',
    name: 'rank',
    component: () => import('@/views/home/rank'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/songlist/:cat?',
    name: 'songlist',
    component: () => import('@/views/home/songList'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/views/home/radio'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/songer',
    name: 'songer',
    component: () => import('@/views/home/songer'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/newdisk',
    name: 'newdisk',
    component: () => import('@/views/home/newDisk'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/mymusic',
    name: 'mymusic',
    component: () => import('@/views/myMusic'),
    meta:{
      isShow:true
    }
  },
]