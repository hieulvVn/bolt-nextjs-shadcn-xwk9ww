"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Bookmark } from '@/types/bookmark'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useToast } from '@/components/ui/use-toast'

interface BookmarkFormProps {
  bookmark?: Bookmark
  trigger?: React.ReactNode
}

export default function BookmarkForm({ bookmark, trigger }: BookmarkFormProps) {
  const { data: session } = useSession()
  const [title, setTitle] = useState(bookmark?.title || '')
  const [url, setUrl] = useState(bookmark?.url || '')
  const [category, setCategory] = useState(bookmark?.category || '')
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title)
      setUrl(bookmark.url)
      setCategory(bookmark.category)
    }
  }, [bookmark])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    const bookmarkData = {
      title,
      url,
      category,
      userId: session.user.id
    }

    try {
      if (bookmark) {
        await updateDoc(doc(db, 'bookmarks', bookmark.id), bookmarkData)
        toast({ title: "Bookmark updated successfully" })
      } else {
        await addDoc(collection(db, 'bookmarks'), bookmarkData)
        toast({ title: "Bookmark added successfully" })
      }
      setOpen(false)
    } catch (error) {
      console.error("Error saving bookmark:", error)
      toast({ title: "Error saving bookmark", variant: "destructive" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Bookmark</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{bookmark ? 'Edit Bookmark' : 'Add Bookmark'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Save Bookmark</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}