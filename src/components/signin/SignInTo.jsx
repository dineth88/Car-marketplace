import React from 'react'
import {useUser, UserButton, SignedOut, SignIn} from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function SignInTo() {
  return (
    <div className="flex items-center justify-center h-screen">
        <SignedOut>
            <SignIn routing='hash'/>
        </SignedOut>
    </div>
  )
}

export default SignInTo