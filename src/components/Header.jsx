"use client";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CircleX } from "lucide-react";

const Header = () => {
  const { user } = useUser();
  console.log("user:", user);

  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    // Toggling sidebar state
  };

  const mobileNav = (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-[999] md:hidden">
      <div className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50">
        <div className="p-4">
          <Button
            size="icon"
            className="rounded-full"
            variant="outline"
            onClick={toggleSidebar}
          >
            <CircleX />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 py-4 px-2">
            <Avatar>
              <AvatarImage src={user?.hasImage ? user.imageUrl : ""} />
              <AvatarFallback className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                CN
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{user?.fullName}</span>
          </div>
          <Separator />
          <Link href="/generate">
            <Button
              variant="outline"
              className="w-full mb-2 mt-2
            text-blue-600 border-blue-600 hover:bg-blue-100 transition-colors duration-200"
            >
              Generate
            </Button>
          </Link>
          <Link href="/flashcards">
            <Button variant="outline" className="w-full mb-2">
              Saved Cards
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <header className="h-[64px] border fixed w-full bg-white px-4 py-4 flex justify-between z-10 items-center">
      <Link href="/">
        <Image
          src="/logoMadeEasy.png"
          alt="Logo"
          width={200}
          height={100}
          className="object-cover h-[64px] "
        />
      </Link>
      <nav className="flex items-center space-x-4">
        <SignedOut>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              asChild
              className="text-blue-600 hover:bg-blue-100 transition-colors duration-200 text-xm md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-2 lg:py-3"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="bg-sky-400 text-white hover:bg-sky-500 text-xs md:text-sm lg:text-base px-2 py-1 md:px-3 lg:px-4 md:py-2 lg:py-3"
            >
              <Link href="/sign-up">Signup</Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="hidden md:flex items-center m-3 space-x-2">
            <Link href="/generate">
              <Button
                variant="outline"
                className="text-white bg-sky-500 transition-colors duration-200"
              >
                Generate
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserCircleIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 me-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.hasImage ? user.imageUrl : ""} />
                    <AvatarFallback className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {user?.fullName || "User"}
                  </span>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/flashcards" className="w-full text-start">
                    <DropdownMenuLabel>Saved Cards</DropdownMenuLabel>
                  </Link>
                </DropdownMenuItem>
                <Separator />
                <Button
                  variant="outline"
                  className="flex mt-1 w-full items-center hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <DropdownMenuItem className="space-x-2 cursor-pointer">
                    <SignOutButton />
                  </DropdownMenuItem>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              <Bars3Icon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </SignedIn>
      </nav>
      {isSidebarOpen && mobileNav}
    </header>
  );
};

export default Header;
