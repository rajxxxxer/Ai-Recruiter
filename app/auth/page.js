'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-9 py-8"
      style={{ backgroundImage: "url('/gradientBackground.png')" }}
    >
      <div
        className="bg-amber-400 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full max-w-sm px-2 py-2 flex flex-col items-center backdrop-blur-sm"
      >
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={80} height={50} />

        {/* Poster */}
        <Image
          src="/login.png"
          alt="Login Poster"
          width={150}
          height={100}
          className="my-2"
        />

        {/* Text */}
        <h1 className="text-base font-semibold text-center text-white mb-1">
          Welcome to Our Community
        </h1>
        <p className="text-gray-100 text-xs text-center mb-2">
          Join us to explore more!
        </p>

        {/* Google Login */}
        <div className="flex items-center gap-2 mt-2">
          <Image
            src="/g-icon.png"
            alt="Google Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Button className="bg-blue-700 text-white text-sm px-4 py-2 h-auto">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
