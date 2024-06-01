// imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// app imports
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import WriteBlog from './pages/WriteBlog'
import Appbar from './components/Appbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/writeBlog' element={<WriteBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
