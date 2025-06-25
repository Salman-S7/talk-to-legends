import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      plan?: string;
      firstName?: string;
      lastName?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    plan?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    plan?: string;
    firstName?: string;
    lastName?: string;
  }
}