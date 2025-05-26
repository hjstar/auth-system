export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Profile Page
        </h1>
        <span className="text-xl font-mono px-4 py-2 border-2 border-orange-400 dark:border-orange-500 text-orange-700 dark:text-orange-300 rounded-lg">
          {params.id}
        </span>
      </div>
    </div>
  );
}
