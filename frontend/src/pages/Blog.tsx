import { useBlog } from '../hooks/blog';
import { useParams } from 'react-router-dom';
import Fullblog from '../components/Fullblog';
import Spinner from '../components/Spinner';

const Blog = () => {
  const { id } = useParams()
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if(loading || !blog) {
    return <div className='h-screen flex flex-col justify-center'>
      <div className='flex justify-center'>
        <Spinner />
      </div>
    </div>
  }

  return (
    <div>
      <Fullblog blog={blog} />
    </div>
  )
}

export default Blog