"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import BookmarkForm from './BookmarkForm'
import { Bookmark } from '@/types/bookmark'

interface BookmarkGridProps {
  bookmarks: Bookmark[]
  layout: 'grid' | 'list'
  groupByCategory: boolean
}

export default function BookmarkGrid({ bookmarks, layout, groupByCategory }: BookmarkGridProps) {
  const groupedBookmarks = groupByCategory
    ? bookmarks.reduce((acc, bookmark) => {
        (acc[bookmark.category] = acc[bookmark.category] || []).push(bookmark)
        return acc
      }, {} as Record<string, Bookmark[]>)
    : { 'All Bookmarks': bookmarks }

  const renderBookmark = (bookmark: Bookmark) => (
    <Card key={bookmark.id} className={`backdrop-blur-md bg-opacity-50 bg-background border-none shadow-lg hover:shadow-xl transition-shadow duration-300 ${layout === 'list' ? 'flex' : ''}`}>
      <div className={layout === 'list' ? 'flex-grow' : ''}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{bookmark.title}</CardTitle>
          <CardDescription>{bookmark.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {bookmark.url}
          </a>
        </CardContent>
      </div>
      <CardFooter className={`flex justify-end space-x-2 ${layout === 'list' ? 'items-center' : ''}`}>
        <BookmarkForm
          bookmark={bookmark}
          trigger={
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-8">
      {Object.entries(groupedBookmarks).map(([category, categoryBookmarks]) => (
        <div key={category}>
          {groupByCategory && <h2 className="text-2xl font-bold mb-4">{category}</h2>}
          <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {categoryBookmarks.map(renderBookmark)}
          </div>
        </div>
      ))}
    </div>
  )
}