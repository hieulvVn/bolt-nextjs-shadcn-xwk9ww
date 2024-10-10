import { ModeToggle } from './ModeToggle'
import { LogOut, Grid, List, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { signOut } from 'next-auth/react'
import BookmarkForm from './BookmarkForm'

interface HeaderProps {
  isLoggedIn: boolean
  layout: 'grid' | 'list'
  setLayout: (layout: 'grid' | 'list') => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  groupByCategory: boolean
  setGroupByCategory: (group: boolean) => void
}

export default function Header({
  isLoggedIn,
  layout,
  setLayout,
  searchTerm,
  setSearchTerm,
  groupByCategory,
  setGroupByCategory
}: HeaderProps) {
  return (
    <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Recentlys
      </h1>
      {isLoggedIn && (
        <>
          <div className="flex items-center space-x-4">
            <BookmarkForm />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
            >
              {layout === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="group-category"
                checked={groupByCategory}
                onCheckedChange={setGroupByCategory}
              />
              <label htmlFor="group-category">Group by Category</label>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ModeToggle />
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </>
      )}
    </header>
  )
}