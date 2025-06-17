export default function AuthPage({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-navy-800 flex-col justify-between p-8">
          <h3 className="text-3xl font-bold text-slate-300 flex gap-x-2">
            CoverLetter
          </h3>
          <p className="text-slate-300 font-medium">
            "Your one-stop solution for creating professional cover letters effortlessly."
          </p>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
        {children}
        </div>
      </div>
    </div>
  )
}