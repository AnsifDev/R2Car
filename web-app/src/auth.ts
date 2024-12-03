import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import client from "./lib/db"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client, {
        databaseName: "Main",
        collections: {
            Accounts: "Accounts",
            Sessions: "Sessions",
            Users: "Users"
        }
    }),
    providers: [Google],
})