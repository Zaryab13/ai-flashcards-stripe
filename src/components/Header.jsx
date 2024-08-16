"use client";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
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
		<header className="h-[64px]  px-4 flex justify-between items-center">
			<Link href="/">
				<Image
					src="/logoMadeEasy.png"
					alt="Logo"
					width={200}
					height={100}
					className="object-contain  "
				/>
			</Link>
			<nav className="flex items-center space-x-4">
				<SignedOut>
					<div className="flex space-x-2">
						<Button
							variant="outline"
							asChild
							className="text-blue-600 border-blue-600 hover:bg-blue-100 transition-colors duration-200 text-xm md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-2 lg:py-3"
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
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className="text-blue-600 border-blue-600 hover:bg-blue-100 transition-colors duration-200 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
						>
							<Button
								variant="outline "
								className="bg-sky-400 text-white border-blue-600 hover:bg-grey-500 hover:text-black transition-colors duration-200 text-xs md:text-sm lg:text-base px-2 py-1 md:px-3 lg:px-4 md:py-2 lg:py-3"
							>
								{" "}
								Profile
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 me-1 bg-white border border-gray-300 rounded-lg shadow-lg">
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
								<span className="font-medium">{user?.fullName}</span>
							</DropdownMenuItem>
							<Separator />
							<Link
								href="/"
								className="flex items-center text-center hover:bg-slate-100 transition-all cursor-pointer "
							>
								<DropdownMenuItem className="space-x-3 cursor-pointer">
									<LogOutIcon size="15" />
									<span className="font-medium m-2">Logout</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				</SignedIn>
			</nav>
		</header>
	);
};

export default Header;
