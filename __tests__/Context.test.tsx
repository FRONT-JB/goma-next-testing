import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { StateProvider } from '../context/StateProvider'
import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'

describe('Global state management (useContext)', () => {
  it('Should change the toggle state globally', () => {
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    )
    // ContextA, ContextB의 초기 상태를 먼저 테스트 한다.
    // getByTestId는 각 컴포넌트에서 아래와 같이 선언해 주었다.
    // <p className="mb-5 text-indigo-600" data-testid="toggle-a">
    //   {toggle ? 'true' : 'false'}
    // </p>
    expect(screen.getByTestId('toggle-a').textContent).toBe('false')
    expect(screen.getByTestId('toggle-b').textContent).toBe('false')

    // screen에서 버튼클릭 이벤트를 실행한다.
    // 버튼 클릭시 toggle상태를 변경하는 setState가 동작한다.
    userEvent.click(screen.getByRole('button'))

    // setState 동작 후 초기에 테스트했던 값이 반대로 바뀌었는지 테스트한다.
    expect(screen.getByTestId('toggle-a').textContent).toBe('true')
    expect(screen.getByTestId('toggle-b').textContent).toBe('true')
  })
})
