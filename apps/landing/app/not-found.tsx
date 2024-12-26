export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl text-gray-600 mb-8">Page not found</h2>
          <a 
            href="/"
            className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }