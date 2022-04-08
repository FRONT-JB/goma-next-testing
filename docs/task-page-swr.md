```js
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import TaskPage from '../pages/task-page'
import { Task as TASK } from '../types/Types'

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
            userId: 1,
            id: 1,
            title: 'Static task A',
            completed: false,
          },
          {
            userId: 2,
            id: 2,
            title: 'Static task B',
            completed: true,
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

describe('Todos page / SWR', () => {
  let staticProps: TASK[]
  staticProps = [
    { userId: 3, id: 3, title: 'Static task C', completed: true },
    { userId: 4, id: 4, title: 'Static task D', completed: false },
  ]

  it('Should render CSF data after pre-rendered data', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps} />
      </SWRConfig>
    )
    expect(await screen.findByText('Static task C')).toBeInTheDocument()
    expect(screen.getByText('Static task D')).toBeInTheDocument()
    expect(await screen.findByText('Static task A')).toBeInTheDocument()
    expect(screen.getByText('Static task B')).toBeInTheDocument()
  })
  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos/',
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps} />
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })
})
```
