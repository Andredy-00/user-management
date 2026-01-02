import { loginAction, signUpAction } from "@/actions/auth/authAction"

export const AuthForm = () => {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={loginAction}>Log in</button>
            <button formAction={signUpAction}>Sign up</button>
        </form>
    )
}
