```js
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { getPage, initTestHelpers } from 'next-page-tester'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
initTestHelpers()

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/', (req, res, ctx) => {
    // 위의 get Url에 search params를 같이 적어줄 경우 console.warn 이 발생한다.
    // example : https://jsonplaceholder.typicode.com/posts/?_limit=10
    // 아래의 query, _limit 변수를 이용해 searchParams를 확인한 후 진행하면 console.warn이 발생하지 않는다.
    const query = req.url.searchParams
    const _limit = query.get('_limit')
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 3,
            id: 3,
            title: 'Static task C',
            completed: true,
          },
          {
            userId: 4,
            id: 4,
            title: 'Static task D',
            completed: false,
          },
        ])
      )
    }
  })
)

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

describe('Todo Page / getStaticProps', () => {
  it('Should render the list of tasks pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/task-page',
    })
    render(page)
    expect(await screen.findByText('Todos Page')).toBeInTheDocument()
    expect(screen.getByText('Static task C')).toBeInTheDocument()
    expect(screen.getByText('Static task D')).toBeInTheDocument()
  })
})
```
