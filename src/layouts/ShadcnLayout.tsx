import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface ShadcnLayoutProps {
  children: React.ReactNode;
}

const ShadcnLayout: React.FC<ShadcnLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, authUser, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // Add dashboard link for authenticated users
  const authenticatedNavItems = [
    ...navItems,
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const currentNavItems = user ? authenticatedNavItems : navItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Project 01
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-[500]">
              {currentNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive(item.href) ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-4">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "text-sm font-[500] transition-colors hover:text-foreground/80",
                      isActive(item.href) ? "text-foreground" : "text-foreground/60"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Auth Section */}
          <div className="ml-auto flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-[500] text-primary">
                        {authUser?.name?.charAt(0) || authUser?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-[500] leading-none">
                        {authUser?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {authUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container flex h-14 items-center">
          <div className="text-center text-sm text-muted-foreground">
            &copy; 2024 Project 01. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShadcnLayout; 