import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  async session({ session }) {
    // Find the user's document in the database based on their email address stored in the session object
    const sessionUser = await User.findOne({ email: session.user.email });
    // Set the user's ID in the session object to their database document ID (converted to a string)
    session.user.id = sessionUser._id.toString();
  },
  async signIn({ profile }) {
    try {
      await connectToDB();
      // Check if a user document with the same email address as the authenticated user exists in the database
      const userExists = await User.findOne({ email: profile.email });
      // If a user document doesn't exist, create a new user document
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true; // Return true to indicate that the sign-in was successful
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});
export { handler as GET, handler as POST};
