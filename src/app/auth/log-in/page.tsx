'use client';

import React, { FC } from 'react';
import floatingBall from '../../../../public/images/float1.png';
import floatingball2 from '../../../../public/images/float2.png';
import logo from '../../logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ContextProvider } from '@/src/contexts/ContextProvider';
import { signIn,signOut, useSession } from "next-auth/react";

const LogIn: FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Optional: Show a loading state while session data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <ContextProvider>
        <div className='w-[100vw] h-[100vh] flex items-center justify-between'>
          <div className='w-full md:w-2/4 h-full'>
            <div className='my-10 w-full md:w-[60%] mx-auto'>
              <nav className='flex items-center justify-between py-6'>
                <Link href={'/'}>
                  <Image src={logo} alt='' width={150} height={200} />
                </Link>
                <div>
                  <span className='hidden md:visible text-[#606060]'>New to CreatorsLab?</span>
                  <Link href={'/auth/sign-up'} className='mx-4 border p-4 rounded-lg border-[#606060]'>Create an account</Link>
                </div>
              </nav>

              <div className='my-[100px]'>
                {session ? (
                  <div className='border border-[#606060] rounded-lg w-[90%] md:w-full m-auto p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-40'>
                    <h2 className='font-syne font-bold text-xl'>Welcome back, {session.user?.name || 'User'}!</h2>
                    <p className='text-sm text-[#606060]'>You are already logged in.</p>
                    <button
                      onClick={() => signOut()}
                      className='mt-4 p-3 rounded bg-red-600 text-white'
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <form className='border border-[#606060] rounded-lg w-[90%] md:w-full m-auto p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-40'>
                    <h2 className='font-syne font-bold text-xl'>Log in to CreatorsLab</h2>
                    <p className='text-sm text-[#606060]'>Welcome back.</p>
                    <label className="block my-4">Log in with Wallet</label>
                    <WalletMultiButton style={{ background: "#222222" }}>Connect with wallet</WalletMultiButton>
                    <div className='flex items-center justify-between my-4'>
                      <div className='w-[40%] border border-[#606060]'></div>
                      <span>OR</span>
                      <div className='w-[40%] border border-[#606060]'></div>
                    </div>
                    <label className="block my-4">Log in with social accounts</label>
                    <div className='mb-20 flex'>
                      <button
                        className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'
                        onClick={() => signIn('twitter')}
                      >
                        Twitter
                      </button>
                      <button
                        className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'
                        onClick={() => signIn('discord')}
                      >
                        Discord
                      </button>
                      <button
                        className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'
                        onClick={() => signIn('email')}
                      >
                        Email
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className='hidden md:block w-2/4 h-full bg-[url(/images/signin-upbg.png)] bg-cover bg-no-repeat relative z-[-9999]'>
            <Image src={floatingball2} alt='' width={400} height={400} className='absolute top-0 right-0 scale-x-[-1]' />
            <Image src={floatingBall} alt='' width={800} height={800} className='absolute bottom-0 left-[-300px] z-[-999]' />
          </div>
        </div>
      </ContextProvider>
    </>
  );
};

export default LogIn;
