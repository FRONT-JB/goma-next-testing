import type { Comment as COMMENT } from '../types/Types'

const Comment = ({ id, name, body }: COMMENT) => {
  return (
    <li className="mx-10">
      <p className="">
        {id}
        {': '}
        {body}
      </p>
      <p className="mt-3 mb-10 text-center">
        {'by '}
        {name}
      </p>
    </li>
  )
}

export default Comment
