// _app.tsx
import { AppProps } from 'next/app';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all pages, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-between items-center p-4 shadow-md">
          <h1 className="text-2xl font-bold">My App</h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </ClerkProvider>
  );
}

export default MyApp;