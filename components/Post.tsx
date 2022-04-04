import Link from 'next/link'
import type { Post as POST } from '../types/Types'

const Post = ({ id, title }: POST) => {
  return (
    <li>
      <span>{id}</span>
      {' : '}
      <Link href={`/posts/${id}`} passHref>
        <a className="border-b border-gray-500 cursor-pointer hover:bg-gray-300">
          {title}
        </a>
      </Link>
    </li>
  )
}

export default Post
