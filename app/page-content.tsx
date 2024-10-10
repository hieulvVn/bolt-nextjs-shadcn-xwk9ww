"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import BookmarkGrid from '@/components/BookmarkGrid'
import LoginForm from '@/components/LoginForm'
import { Bookmark } from '@/types/bookmark'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Home() {
  const { data: session, status } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [groupByCategory, setGroupByCategory] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const q = query(collection(db, 'bookmarks'), where('userId', '==', session.user.id))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookmarksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Bookmark))
        setBookmarks(bookmarksData)
      })
      return () => unsubscribe()
    }
  }, [status, session])

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <Header
          isLoggedIn={status === 'authenticated'}
          layout={layout}
          setLayout={setLayout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          groupByCategory={groupByCategory}
          setGroupByCategory={setGroupByCategory}
        />
        {status === 'authenticated' ? (
          <BookmarkGrid
            bookmarks={filteredBookmarks}
            layout={layout}
            groupByCategory={groupByCategory}
          />
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  )
}