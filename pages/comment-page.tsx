import Layout from '../components/Layout'
import useSWR from 'swr'
import axios from 'axios'
import Comment from '../components/Component'
import type { Comment as COMMENT } from '../types/Types'
import { comment } from 'postcss'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

const CommentPage = () => {
  const { data: comments, error } = useSWR('commentFetch', axiosFetcher)

  if (error) return <span>Error!</span>

  return (
    <Layout title="Comment">
      <p className="m-10 text-4xl">Comment Page</p>
      <ul>
        {comments?.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </ul>
    </Layout>
  )
}
export default CommentPage
