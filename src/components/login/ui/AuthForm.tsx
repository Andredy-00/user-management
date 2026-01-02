import { loginAction, signUpAction } from "@/actions/auth/authAction"

export const AuthForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <form className="w-full max-w-sm bg-slate-900/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Bienvenido
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <button
          formAction={loginAction}
          className="w-full cursor-pointer mb-3 rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-500 transition"
        >
          Iniciar sesión
        </button>

        <button
          formAction={signUpAction}
          className="w-full rounded-lg cursor-pointer border border-indigo-600 py-2 font-semibold text-indigo-400 hover:bg-indigo-600 hover:text-white transition"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  )
}
