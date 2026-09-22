import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import {
  Plane,
  Menu,
  User,
  ShieldCheck,
  Compass,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Sparkles,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../stores/authStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import CreateAdminModal from '../../pages/CreateAdminModal';

/**
 * Navbar Component with Dynamic Role-Based Access Control (RBAC) UI:
 * 
 * 1. GUEST:
 *    [ ✈ Airport Explorer ]   Home  Browse Airports                 Login  [Sign Up]
 * 
 * 2. AUTHENTICATED USER:
 *    [ ✈ Airport Explorer ]   Home  Browse Airports          👤 Profile  [Logout]
 * 
 * 3. ADMIN:
 *    [ ✈ Airport Explorer ]   Home  Browse  Dashboard       👤 Admin ▼   [Logout]
 */

export function Navbar() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Standard navlink styling with active indicator
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${isActive
      ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 font-semibold shadow-2xs'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
    }`;

  // Mobile drawer navlink styling
  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
      ? 'bg-sky-50 text-sky-600 font-semibold dark:bg-sky-950/60 dark:text-sky-400'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">

      {/* Dev / Learning Mode Switcher Bar */}
      {/* {/* <div className="bg-slate-950 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
            Active RBAC State:
          </span>
          <Badge
            variant={role === 'admin' ? 'destructive' : role === 'user' ? 'sky' : 'secondary'}
            className="text-[10px] uppercase font-mono px-2 py-0"
          >
            {role}
          </Badge>
        </div> */}

      {/* Quick Role Switcher for Development & Learning */}
      {/* <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">
            Test Role:
          </span>
          <button
            onClick={() => setMockRole('guest')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
              role === 'guest'
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Guest
          </button>
          <button
            onClick={() => setMockRole('user')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
              role === 'user'
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            User
          </button>
          <button
            onClick={() => setMockRole('admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Admin
          </button>
        </div>
      </div> */}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Brand Logo + Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 dark:text-white group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Plane className="h-5 w-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight flex items-center gap-1.5">
                Airport Explorer
              </span>
              <span className="text-[11px] font-normal text-slate-500 tracking-normal hidden sm:inline">
                Global Aviation Directory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links based on Role */}
          <nav className="hidden md:flex items-center gap-1">
            {/* 1. Home - Available to all roles */}
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {/* 2. Browse Airports - Available to all roles */}
            <NavLink to="/airports" className={navLinkClass}>
              {role === 'admin' ? 'Browse' : 'Browse Airports'}
            </NavLink>

            {/* 3. Dashboard - ADMIN ONLY */}
            {role === 'admin' && (
              <>
                <NavLink to="/admin" className={navLinkClass}>
                  <LayoutDashboard className="h-4 w-4 text-amber-500" />
                  <span>Dashboard</span>
                </NavLink>
                <Button onClick={() => setIsCreateAdminOpen(true)}>
                  Create Admin
                </Button>


              </>
            )}
          </nav>
        </div>

        {/* Right Section: Role-Based Action Items */}
        <div className="hidden md:flex items-center gap-3">
          {/* ==================================================== */}
          {/* STATE 1: GUEST                                       */}
          {/* Left: Home | Browse Airports                         */}
          {/* Right: Login | Sign Up                               */}
          {/* ==================================================== */}
          {role === 'guest' && (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-1.5 font-medium cursor-pointer">
                  <LogIn className="h-4 w-4 text-slate-500" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="gap-1.5 shadow-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* ==================================================== */}
          {/* STATE 2: AUTHENTICATED USER (role === 'user')        */}
          {/* Left: Home | Browse Airports                         */}
          {/* Right: 👤 Profile | Logout                           */}
          {/* ==================================================== */}
          {role === 'user' && (
            <div className="flex items-center gap-3">
              <NavLink to="/profile" className={navLinkClass}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold mr-1">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span>Profile</span>
              </NavLink>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/20 gap-1.5 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}

          {/* ==================================================== */}
          {/* STATE 3: ADMIN (role === 'admin')                    */}
          {/* Left: Home | Browse | Dashboard                      */}
          {/* Right: 👤 Admin ▼ | Logout                          */}
          {/* ==================================================== */}
          {role === 'admin' && (
            <div className="flex items-center gap-3">
              {/* Admin Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 px-3 py-1.5 h-9 rounded-lg border-amber-300/60 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-100/50 cursor-pointer"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs font-bold">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                      Admin
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                          Administrator
                        </p>
                      </div>
                      <p className="text-sm font-medium leading-none text-foreground pt-1">
                        {user?.name || 'Chief Administrator'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || 'admin@airportexplorer.io'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 w-full cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Admin Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2 w-full cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 text-amber-500" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/20 gap-1.5 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Hamburger Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[380px] p-6 flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left border-b pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white">
                      <Plane className="h-4 w-4 -rotate-45" />
                    </div>
                    <div>
                      <SheetTitle className="text-base font-bold">
                        Airport Explorer
                      </SheetTitle>
                      <p className="text-xs text-muted-foreground">
                        Global Aviation Directory
                      </p>
                    </div>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  <SheetClose asChild>
                    <NavLink to="/" className={mobileNavLinkClass}>
                      <Plane className="h-4 w-4 text-sky-600" />
                      Home
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink to="/airports" className={mobileNavLinkClass}>
                      <Compass className="h-4 w-4 text-sky-600" />
                      Browse Airports
                    </NavLink>
                  </SheetClose>

                  {/* ADMIN ONLY LINK */}
                  {role === 'admin' && (
                    <SheetClose asChild>
                      <NavLink to="/admin" className={mobileNavLinkClass}>
                        <LayoutDashboard className="h-4 w-4 text-amber-500" />
                        Dashboard
                      </NavLink>
                    </SheetClose>
                  )}

                  {/* USER / ADMIN PROFILE LINK */}
                  {isAuthenticated && (
                    <SheetClose asChild>
                      <NavLink to="/profile" className={mobileNavLinkClass}>
                        <User className="h-4 w-4 text-sky-600" />
                        {role === 'admin' ? 'Admin Profile' : 'Profile'}
                      </NavLink>
                    </SheetClose>
                  )}
                </nav>
              </div>

              {/* Mobile Auth Bottom Section */}
              <div className="border-t pt-4 space-y-3">
                {role === 'guest' ? (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link to="/login" className="w-full">
                        <Button variant="outline" className="w-full justify-center gap-2">
                          <LogIn className="h-4 w-4" />
                          Login
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/signup" className="w-full">
                        <Button className="w-full justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white">
                          <UserPlus className="h-4 w-4" />
                          Sign Up
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate flex items-center gap-1.5">
                          {user?.name || (role === 'admin' ? 'Admin' : 'Explorer')}
                          {role === 'admin' && (
                            <Badge variant="destructive" className="text-[9px] px-1.5 py-0 uppercase">
                              Admin
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email || 'user@airportexplorer.io'}
                        </p>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>

          </Sheet>
        </div>
        <CreateAdminModal
          isOpen={isCreateAdminOpen}
          onClose={() => setIsCreateAdminOpen(false)}
        />
      </div>
    </header>
  );
}

export default Navbar;
