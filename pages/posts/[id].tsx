import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch'
import type { Post as POST } from '../../types/Types'
import { GetStaticPaths, GetStaticProps } from 'next'

const PostDetail = ({ id, title, body }: POST) => {
  return (
    <Layout title="title">
      <p className="m=-4">
        {'ID : '}
        {id}
      </p>
      <p className="mb-4 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{body}</p>
      <Link href="/blog-page" passHref>
        <span className="flex mt-12 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <a data-testid="back-blog">Back to Blog-Page</a>
        </span>
      </Link>
    </Layout>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { post } = await getPostData(ctx.params.id as string)
  return {
    props: {
      ...post,
    },
  }
}
