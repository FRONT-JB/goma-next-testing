import Layout from '../components/Layout'
import { getAllPostsData } from '../lib/fetch'
import Post from '../components/Post'
import { GetStaticProps } from 'next'
import type { Post as POST } from '../types/Types'

interface BlogPageProps {
  posts: POST[]
}

const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <Layout title="Blog">
      <p className="mb-10 text-4xl">Blog Page</p>
      <ul>{posts && posts.map((post) => <Post key={post.id} {...post} />)}</ul>
    </Layout>
  )
}
export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData()
  return {
    props: {
      posts,
    },
  }
}
