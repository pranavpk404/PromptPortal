"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitcher";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="mb-16 flex w-full pt-3 align-middle">
      <div className="flex items-center justify-center">
        <Link href="/" className="flex-center flex gap-2">
          <Image
            src="/assets/images/logo.svg"
            width={32}
            height={32}
            alt="promptPortal Logo"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="ml-auto hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="black_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image || "/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In with
                    <Image
                      className="ml-2 "
                      src={"/assets/icons/google-logo.svg"}
                      alt="Google"
                      width={15}
                      height={15}
                    />
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative ml-auto flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In with Google
                  </button>
                );
              })}
          </>
        )}
      </div>
      <ThemeSwitch />
    </nav>
  );
};

export default Nav;
