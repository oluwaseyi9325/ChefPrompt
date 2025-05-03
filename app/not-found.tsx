import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-teal-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-2 mb-6 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for....
      </p>
      <Link
        href="/"
        className="rounded-lg bg-teal-500 px-6 py-2 text-white transition duration-200 hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  )
}
