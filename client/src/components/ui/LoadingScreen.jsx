import ZidioLogo from "./ZidioLogo"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-caf0f8 to-0077b6 dark:from-023e8a dark:to-03045e">
      <div className="flex flex-col items-center">
        <ZidioLogo className="h-16 w-16 animate-pulse" />
        <h1 className="mt-4 text-2xl font-bold text-0077b6 dark:text-48cae4">Zidio Task Management</h1>
        <div className="mt-4 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-0077b6 dark:bg-48cae4 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

