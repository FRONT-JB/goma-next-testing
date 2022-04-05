import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'
import Layout from '../components/Layout'
import { StateProvider } from '../context/StateProvider'

const ContextPage = () => {
  return (
    <Layout title="Context">
      <p className="mb-10 text-4xl">Context Page</p>
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    </Layout>
  )
}
export default ContextPage
