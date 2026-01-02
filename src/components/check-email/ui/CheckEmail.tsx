export function CheckEmail() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white px-8 py-10 text-center shadow-sm">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 8.25v7.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-7.5m19.5 0A2.25 2.25 0 0019.5 6h-15A2.25 2.25 0 002.25 8.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 8.493V8.25"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">
                    Revisa tu correo electrónico
                </h1>

                {/* Description */}
                <p className="mb-6 text-sm text-neutral-600">
                    Te enviamos un enlace de confirmación. Revisa tu bandeja de entrada y
                    sigue las instrucciones para activar tu cuenta.
                </p>

                {/* Tip */}
                <p className="text-xs text-neutral-500">
                    ¿No recibiste el correo? Revisa tu carpeta de correo no deseado o inténtalo más tarde.
                </p>
            </div>
        </div>
    )
}
