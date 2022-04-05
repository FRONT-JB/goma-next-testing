import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import CommentPage from '../pages/comment-page'
// initTestHelpers();

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/',
    (req, res, ctx) => {
      // 위의 get Url에 search params를 같이 적어줄 경우 console.warn 이 발생한다.
      // example ) https://jsonplaceholder.typicode.com/comments/?_limit=10
      // 아래의 query, _limit 변수를 이용해 searchParams를 확인한 후 진행하면 console.warn이 발생하지 않는다.
      const query = req.url.searchParams
      const _limit = query.get('_limit')
      if (_limit === '10') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              postId: 1,
              id: 1,
              name: 'A',
              email: 'dummya@gmail.com',
              body: 'test body a',
            },
            {
              postId: 2,
              id: 2,
              name: 'B',
              email: 'dummyb@gmail.com',
              body: 'test body b',
            },
          ])
        )
      }
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Comment page with use SWR / Success + Error', () => {
  it('Should render the value fetched by useSWR', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('1: test body a')).toBeInTheDocument()
    expect(screen.getByText('2: test body b')).toBeInTheDocument()
  })

  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/',
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })
})
