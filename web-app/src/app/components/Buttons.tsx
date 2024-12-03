import { signIn, signOut } from "@/auth"

export function LoginButton() {
    return (
        <button onClick={async () => {
            "use server"
            await signIn("google")
          }} className="py-1 px-4 rounded-md bg-white mr-4 text-black">Login</button>
    )
}

export function LogoutButton() {
    return (
        <button onClick={async () => {
            "use server"
            await signOut()
          }} className="p-2 rounded-md hover:bg-white/5 text-white !text-xl material-symbols-rounded filled-icons">logout</button>
    )
}