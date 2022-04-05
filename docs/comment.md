```js
// test-utils
import React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'

const Wrapper = ({ children }) => {
  return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
```

```js
// before
import { render, screen } from '@testing-library/react'

// after
import { render, screen } from './test-utils'
```

**useSWR**을 사용하게 되면 테스트 코드에서 아래와 같이 cache를 제거한 config으로 컴포넌트를 렌더링 해야한다.

```js
// This md : Code Line 96, 114
render(
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <App />
  </SWRConfig>
)
```

    매번 이 방식의 렌더를 사용하게 되면 코드 중복이 발생하므로
    위의 test-utils에서 export 하고있는 render와 screen을 사용하면 된다.

---

```js
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CommentPage from '../pages/comment-page'

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
```
