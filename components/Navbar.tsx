'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

interface Provider {
  id: string
  name: string
  type: string
  title: string
  signinUrl: string
}

const Navbar = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setProvidersFunc()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo of PromptPortal"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="text_logo">PromptPortal</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div>
            <div className="flex gap-3 md:gap-5">
              <Link className="black_btn" href="/create-prompt">
                Create Prompt
              </Link>
              <button
                type="button"
                className="outline_btn"
                onClick={() => {
                  signOut()
                }}
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={40}
                  alt="pfp"
                  height={40}
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.title}
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nav */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="pfp"
              width={30}
              height={30}
              onClick={() => {
                setToggleDropDown((prev) => !prev)
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.title}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
