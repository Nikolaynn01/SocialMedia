import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings'
import { Search } from './pages/Profile/Search'
import { Posts } from './pages/Profile/Posts'
import { Followers } from './pages/Profile/Followers'
import { Followings } from './pages/Profile/Followings'
import { Account } from './pages/Profile/Search/Account'
import { Notifications } from './pages/Profile/Notifications'
import { Requests } from './pages/Profile/Notifications/Requests/Requests'
import { Likes } from './pages/Profile/Notifications/Likes/Likes'
import { Comments } from './pages/Profile/Notifications/Comments/Comments'


const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path : "/profile",
    element : <Profile/>,
    children : [
      {
        path : "",
        element : <Dashboard/>
      },
      {
        path : "settings",
        element : <Settings/>
      },
      {
        path : "search",
        element : <Search/>
      },
      {
        path : "posts",
        element : <Posts/>
      },
      {
        path : "followers",
        element : <Followers/>
      },
      {
        path : "followings",
        element : <Followings/>
      },
      {
        path : "notifications",
        element : <Notifications/>,
        children : [
          {
            path : "requests",
            element : <Requests/>
          },
          {
            path : "likes",
            element : <Likes/>
          },
          {
            path : "comments",
            element : <Comments/>
          }
        ]
      },
      {
        path : ":id",
        element : <Account/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
