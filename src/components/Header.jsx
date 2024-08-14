"use client";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

const Header = () => {
  const { user } = useUser();

  return (
    <header className="h-[64px] bg-slate-300 px-4 flex justify-between items-center">
      <Link href="/">
        <h6>Logo</h6>
      </Link>
      <nav>
        <SignedOut>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Signup</Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"> Profile</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 me-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user?.hasImage ? user.imageUrl : ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user?.fullName}</span>
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
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
