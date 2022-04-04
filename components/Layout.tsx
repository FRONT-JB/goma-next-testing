import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface TITLE {
  title: string
  children: ReactNode
}

const Layout = ({ children, title = 'Nextjs' }: TITLE) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="w-screen bg-gray-800">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                {/* 
                  ** ByTestId **
                  ByTestId 는 다른 방법으로 못 선택할때 사용하는 방법인데요, 
                  특정 DOM 에 직접 test 할 때 사용할 id 를 달아서 선택하는 것을 의미합니다.
                  */}
                <a
                  data-testid="home-nav"
                  className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                >
                  Home
                </a>
              </Link>
              <Link href="/blog-page">
                <a
                  data-testid="blog-nav"
                  className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                >
                  Blog
                </a>
              </Link>
              <Link href="/comment-page">
                <a
                  data-testid="comment-nav"
                  className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                >
                  Comment
                </a>
              </Link>
              <Link href="/context-page">
                <a
                  data-testid="context-nav"
                  className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                >
                  Context
                </a>
              </Link>
              <Link href="/task-page">
                <a
                  data-testid="task-nav"
                  className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                >
                  Todos
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-screen">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full h-12 border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}
export default Layout
