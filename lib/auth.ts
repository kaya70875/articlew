import user from '@/models/user';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import Google from 'next-auth/providers/google';

export const authOptions : NextAuthOptions = {
    providers : [
        Credentials({
            name : 'Credentials',
            id : 'credentials',
            credentials : {
                email : { label : 'Email', type : 'text' },
                password : { label : 'Password', type : 'password' }
            },

            async authorize(credentials) {
                await connectToDB();

                const currentUser = await user.findOne({
                    email : credentials?.email,
                }).select('+password');

                if(!currentUser) throw new Error('Wrong Email');

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    currentUser.password
                )

                if(!passwordMatch) throw new Error('Wrong Password');

                console.log('Current User : ', currentUser);

                return {
                    id : currentUser._id.toString(),
                    name : currentUser.name,
                    email : currentUser.email,
                }
            }
        }),

        Google({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret : process.env.NEXTAUTH_SECRET,
    session : {
        strategy : 'jwt',
    },
    callbacks : {
        async signIn({ user, account, profile }) {
            const { email, name } = user;
      
            try {
              const db = await connectToDB();
              const usersCollection = db!.collection("users");
      
              // Check if user already exists in the database
              const existingUser = await usersCollection.findOne({ email });
      
              if (!existingUser) {
                // Add new user to the database
                await usersCollection.insertOne({
                  name,
                  email,
                });
              }
      
              return true; // Allow sign-in
            } catch (error) {
              console.error("Error saving user to database:", error);
              return false; // Deny sign-in if there's an error
            }
          },
        async jwt({user , token}) {
            if(user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session , token}){
            session.user.id = token.id;
            return session;
        },
        async redirect({url, baseUrl }) {
            return `${baseUrl}/search`;
        }

    }
}