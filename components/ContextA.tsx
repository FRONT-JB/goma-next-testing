import { useStateContext } from '../context/StateProvider'

const ContextA = () => {
  const { toggle, setToggle } = useStateContext()
  return (
    <>
      <button
        className="px-3 py-2 mb-5 text-white bg-gray-500 rounded hover:bg-gray-400 focus:outline-none"
        onClick={() => setToggle(!toggle)}
      >
        change
      </button>
      <p>Context A</p>
      <p className="mb-5 text-indigo-600" data-testid="toggle-a">
        {toggle ? 'true' : 'false'}
      </p>
    </>
  )
}

export default ContextA
