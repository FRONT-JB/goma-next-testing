```js
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
initTestHelpers()

describe('Navigation by Link', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/index',
    })
    render(page)
    // 페이지 렌더 후에
    userEvent.click(screen.getByTestId('blog-nav'))
    // data-testid="blog-nav" 를 가진 Navbar a 태그클릭 이벤트발생
    expect(await screen.findByText('Blog Page')).toBeInTheDocument()
    // 이동한 페이지 렌더링 후 Blog Page 텍스트가 있는지 확인
    // screen.debug()
    userEvent.click(screen.getByTestId('comment-nav'))
    expect(await screen.findByText('Comment Page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('context-nav'))
    expect(await screen.findByText('Context Page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('task-nav'))
    expect(await screen.findByText('Todos Page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('home-nav'))
    expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument()
  })
})
```
