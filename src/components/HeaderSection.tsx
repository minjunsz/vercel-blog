"use client"

import Link from "next/link"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useState } from "react"
import Image from "next/image"
import Logo from "@/data/logo.svg"
import LogoDark from "@/data/logo_dark.svg"

const HEADER_INFO = {
	headerTitle: "MinjunBlog",
	navLinks: [
		{ href: '/blog', title: 'Blog' },
		{ href: '/tags', title: 'Tags' },
		{ href: '/about', title: 'About' },
	]
}

const MobileNav = () => {
	const [navShow, setNavShow] = useState(false)

	const onToggleNav = () => {
		setNavShow((status) => {
			if (status) {
				document.body.style.overflow = 'auto'
			} else {
				// Prevent scrolling
				document.body.style.overflow = 'hidden'
			}
			return !status
		})
	}

	return (
		<div className="sm:hidden">
			<button
				type="button"
				className="ml-1 mr-1 h-8 w-8 rounded py-1"
				aria-label="Toggle Menu"
				onClick={onToggleNav}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="text-gray-900 dark:text-gray-100"
				>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			<div
				className={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${navShow ? 'translate-x-0' : 'translate-x-full'
					}`}
			>
				<div className="flex justify-end">
					<button
						type="button"
						className="mr-5 mt-11 h-8 w-8 rounded"
						aria-label="Toggle Menu"
						onClick={onToggleNav}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="text-gray-900 dark:text-gray-100"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<nav className="fixed mt-8 h-full">
					{HEADER_INFO.navLinks.map((link) => (
						<div key={link.title} className="px-12 py-4">
							<Link
								href={link.href}
								className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
								onClick={onToggleNav}
							>
								{link.title}
							</Link>
						</div>
					))}
				</nav>
			</div>
		</div>
	)
}

const HeaderSection = () => {
	return (
		<header className="flex items-center justify-between py-10">
			<div>
				<Link href="/" aria-label={HEADER_INFO.headerTitle}>
					<div className="flex items-center justify-between">
						<div className="mr-3 w-56 -translate-x-4 translate-y-2 md:w-80 md:-translate-x-7">
							<Image src={Logo} alt="Minjun Park Logo" className="block dark:hidden" />
							<Image src={LogoDark} alt="Minjun Park Logo" className="hidden dark:block" />
						</div>
						{/* <div className="h-6 text-2xl font-semibold sm:block ">
							<span className="text-gray-700 dark:text-gray-300">Minjun</span><span className="text-primary-600 dark:text-primary-500">Blog</span>
						</div> */}
					</div>
				</Link>
			</div>
			<nav className="flex items-center text-base leading-5">
				<div className="hidden sm:block">
					{HEADER_INFO.navLinks.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
						>
							{link.title}
						</Link>
					))}
				</div>
				<ThemeSwitch />
				<MobileNav />
			</nav>
		</header>
	)
}

export default HeaderSection