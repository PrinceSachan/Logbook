// imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// app imports
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Appbar from './components/Appbar'
import PublishBlog from './pages/PublishBlog'
import { AuthContextProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import ProtectedRoute from './routes/ProtectedRoute'
import UserBlogs from './pages/UserBlogs'

function App() {

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Appbar />
          <Routes>
            {/* Public route */}
            <Route path='/' element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* Protected route */}
            <Route path='/' element={<ProtectedRoute />}>
              <Route path="/blog/:id" element={<Blog />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/userBlogs' element={<UserBlogs />} />
              <Route path='/writeBlog' element={<PublishBlog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App
