"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement email login logic here
    toast({
      title: "Email login not implemented",
      description: "Please use Google login for now.",
      variant: "destructive",
    })
  }

  const handleGoogleLogin = () => {
    signIn('google')
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8 backdrop-blur-md bg-opacity-50 bg-background border-none shadow-lg">
      <CardHeader>
        <CardTitle>Login to Recentlys</CardTitle>
        <CardDescription>Access your bookmarks from anywhere</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Login with Email</Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
          <FcGoogle className="mr-2 h-4 w-4" />
          Login with Google
        </Button>
      </CardContent>
    </Card>
  )
}