"use client";
import {
	SignedIn,
	SignedOut,
	useUser,
	SignOutButton,
	useAuth,
} from "@clerk/nextjs";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
	const { user } = useUser();
	const { isLoaded, isSignedIn } = useAuth();
	const router = useRouter();
	const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen); // Toggling sidebar state
	};

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			setTimeout(() => {
				router.push("/generate");
			}, 1000);
		}
	}, [isLoaded, isSignedIn, router]);

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
							className="text-blue-600  hover:bg-blue-100 transition-colors duration-200 text-xm md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-2 lg:py-3"
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
					<div className="hidden md:flex items-center space-x-2">
						<Button
							variant="outline"
							className="text-white bg-sky-500 transition-colors duration-200"
						>
							Generate
						</Button>
						<Button
							variant="outline"
							className=" border-sky-600 hover:bg-blue-100"
						>
							Flashcards
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<UserCircleIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
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
			{isSidebarOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
					<div className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50">
						<div className="p-4">
							<Button variant="outline" onClick={toggleSidebar}>
								Close
							</Button>
						</div>
						<div className="p-4">
							<Button
								variant="outline"
								className="w-full mb-2 text-blue-600 border-blue-600 hover:bg-blue-100 transition-colors duration-200"
							>
								Generate
							</Button>
							<Button variant="outline" className="w-full mb-2">
								Flashcards
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="w-full mb-2">
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
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
