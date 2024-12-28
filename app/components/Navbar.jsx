import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* Replace with your actual logo */}
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">LearniFy</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="outline">Login</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

