import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
initTestHelpers()

describe('', () => {})

// Mock Data
const handler = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    // 위의 get Url에 search params를 같이 적어줄 경우 console.warn 이 발생한다.
    // example ) https://jsonplaceholder.typicode.com/posts/?_limit=10
    // 아래의 query, _limit 변수를 이용해 searchParams를 확인한 후 진행하면 console.warn이 발생하지 않는다.
    const query = req.url.searchParams
    const _limit = query.get('_limit')
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
          },
        ])
      )
    }
  }),
]

const server = setupServer(...handler)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

describe('BLog Page', () => {
  it('Should rnder the list of blogs pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    })
    render(page)
    expect(await screen.findByText('Blog Page')).toBeInTheDocument()
    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
    expect(screen.getByText('dummy title 2')).toBeInTheDocument()
  })
})
