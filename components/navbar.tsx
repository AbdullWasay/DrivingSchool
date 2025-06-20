"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { translations } from "@/lib/translations";

const navigation = [
  { name: translations.nav.home, href: "/" },
  { name: translations.nav.about, href: "/about" },
  { name: translations.nav.pricing, href: "/pricing" },
  { name: translations.nav.contact, href: "/contact" },
  { name: translations.nav.faq, href: "/faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-rose-500">
                Fahrschulfinder
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${
                  isActive(item.href)
                    ? "text-rose-500"
                    : "text-gray-700 hover:text-rose-500 transition-colors"
                }`}>
                {item.name}
              </Link>
            ))}

            <Button asChild variant="outline" className="ml-4">
              <Link href="/comparison">{translations.nav.findSchool}</Link>
            </Button>

            <div className="flex items-center space-x-2 ml-4">
              <Button asChild variant="ghost" className="flex items-center">
                <Link href="/school/login">
                  <User className="h-4 w-4 mr-2" />
                  {translations.nav.schoolLogin}
                </Link>
              </Button>

              <Button asChild variant="ghost" className="flex items-center">
                <Link href="/admin/login">
                  <UserCog className="h-4 w-4 mr-2" />
                  {translations.nav.adminLogin}
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-xl font-bold text-rose-500">
                      Fahrschulfinder
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-3 mt-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-rose-50 text-rose-500"
                            : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                        }`}
                        onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button asChild className="w-full" variant="outline">
                      <Link
                        href="/comparison"
                        onClick={() => setIsMenuOpen(false)}>
                        {translations.nav.findSchool}
                      </Link>
                    </Button>

                    <Button asChild className="w-full" variant="ghost">
                      <Link
                        href="/school/login"
                        onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        {translations.nav.schoolLogin}
                      </Link>
                    </Button>

                    <Button asChild className="w-full" variant="ghost">
                      <Link
                        href="/admin/login"
                        onClick={() => setIsMenuOpen(false)}>
                        <UserCog className="h-4 w-4 mr-2" />
                        {translations.nav.adminLogin}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
