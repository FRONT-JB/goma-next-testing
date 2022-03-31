This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[[テスト編] Nextjs + React-testing-library でモダン React ソフトウェアテスト](https://www.udemy.com/course/nextjs-react-testing-library-react/)

[React 어플리케이션 테스트 심층 가이드 1](https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1)

[React 어플리케이션 테스트 심층 가이드 2](https://blog.rhostem.com/posts/2020-10-15-beginners-guide-to-testing-react-2)

[TDD](https://blog.rhostem.com/tag/tdd)

    현황(2022/2/20) 본 코스에서 사용하는 next-page-tester가 Nextjs ver12를 지원하지 않기 때문에
    아래 명령어를 실행하시고 Next의 version을 11로 변경하신 후 강의 진행해주세요🙇

<br />

    npm i react@17.0.2
    npm i react-dom@17.0.2
    npm i next@11.1.2

[setImmediate.js](https://github.com/yuzujs/setImmediate)

`npm i setimmediate`

```js
import 'setimmediate'
// 이후 코스내에서 작성하는 모든 테스트 파일에 이 import문을 추가하여 주십시오.
// GitHub코드는 이미 대처할 수 있는 내용으로 update되어 있습니다.
```

## Project setup : Nextjs+React-testing-library+TypeScript+Tailwind CSS

## 1. Nextjs Project 생성

### 1-1. create-next-app

    npx create-next-app . --use-npm

#### Node.js version 10.13 이후가 필요합니다. 터미널 node -v 에서 version 확인 가능합니다.

### 1-2. 모듈 설치

    npm i axios msw swr

### 1-3. prettier : package.json

```
    "prettier": {
        "singleQuote": true,
        "semi": false
    }
```

## 2. React-testing-library

### 2-1. 모듈 설치

    npm i -D jest@26.6.3 @testing-library/react@11.2.3 @types/jest@26.0.20 @testing-library/jest-dom@5.11.8 @testing-library/dom@7.29.2 babel-jest@26.6.3 @testing-library/user-event@12.6.0 jest-css-modules@2.1.0

### 2-2. Project folder 바로 아래에 ".babelrc" 파일을 생성하여 아래 설정 추가

    touch .babelrc

```
    {
        "presets": ["next/babel"]
    }
```

### 2-3. package.json에 jest 설정을 추가하기

```
    "jest": {
        "testPathIgnorePatterns": [
            "<rootDir>/.next/",
            "<rootDir>/node_modules/"
        ],
        "moduleNameMapper": {
            "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
        }
    }
```

### 2-4. package.json test scripts 추가하기

```
    "scripts": {
        ...
        "test": "jest --env=jsdom --verbose"
    },
    // --verbose : 테스트 항목별 결과 목록
```

## 3. Typescript Install

https://nextjs.org/learn/excel/typescript/create-tsconfig

### 3-1. tsconfig.json 작성

    touch tsconfig.json

### 3-2. 모듈 설치

    npm i -D typescript @types/react @types/node

### 3-3. Nextjs 실행

    npm run dev

### 3-4. \_app.js, index.js -> tsx へ拡張子変更

### 3-5. AppProps 型追記

```
    import { AppProps } from 'next/app'

    function MyApp({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />
    }

    export default MyApp
```

## 4. Tailwind CSS Install

https://tailwindcss.com/docs/guides/nextjs

### 4-1. 모듈 설치

    npm i tailwindcss@latest postcss@latest autoprefixer@latest

### 4-2. tailwind.config.js, postcss.config.js 생성

    npx tailwindcss init -p

### 4-3. tailwind.config.js の purge 설정 추가

```
module.exports = {
    purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
```

### 4-4. globals.css 수정

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 5. 작동 확인

### 5-1. index.tsx 수정

```
const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      Hello Nextjs
    </div>
  )
}
export default Home
```

#### npm run dev -> Tailwind CSS가 잘 되어 있는지 브라우저에서 확인

### 5-2. `_tests_`폴더와 `Home.test.tsx` 파일 작성

```
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

it('Should render hello text', () => {
  render(<Home />)
  expect(screen.getByText('Hello Nextjs')).toBeInTheDocument()
})
```

#### npm test -> 테스트가 PASS 되는지 확인

```
 PASS  __tests__/Home.test.tsx
  ✓ Should render hello text (20 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.728 s, estimated 2 s
```
