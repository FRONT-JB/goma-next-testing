```js
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

it('Should render hello text', () => {
  render(<Home />)
  // screen.debug() console에 render(<Home />)을 tag 형식으로 표기해줌
  expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument()
})
```
