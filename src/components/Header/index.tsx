import Link from 'next/link'
import { Nav } from './Nav'

const Header = () => {
  return (
    <header className="bg-indigo-600 shadow-lg shadow-indigo-200">
      <div className="container flex justify-between align-middle px-4 py-2 relative text-slate-50 mx-auto">
        <Link
          href="/"
          className="flex align-middle p-2 hover:bg-indigo-500 transition rounded-lg"
        >
          Meu app
        </Link>
        <Nav />
      </div>
    </header>
  )
}

export default Header
