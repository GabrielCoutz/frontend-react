import Link from 'next/link'

import { selectUserName } from '../../redux/user/userSelectors'
import { Nav } from './Nav'

const Header = () => {
  const userName = selectUserName()

  return (
    <header className="bg-indigo-600 shadow-lg shadow-indigo-200">
      <div className="container flex justify-between align-middle px-4 py-2 relative text-slate-50 mx-auto">
        <Link
          href="/"
          className="flex align-middle p-2 hover:bg-indigo-500 transition rounded-lg"
        >
          Meu app - {userName}
        </Link>
        <Nav />
      </div>
    </header>
  )
}

export default Header
