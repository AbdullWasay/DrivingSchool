"use client";

import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { translations } from "@/lib/translations";

export default function Footer() {
  const footerLinks = {
    company: [
      { name: translations.footer.aboutUs, href: "/about" },
      { name: translations.footer.careers, href: "/careers" },
      { name: translations.footer.press, href: "/press" },
      { name: translations.footer.blog, href: "/blog" },
      { name: translations.nav.contact, href: "/contact" },
    ],
    resources: [
      { name: translations.footer.drivingGuides, href: "/resources/guides" },
      { name: translations.footer.testTips, href: "/resources/tips" },
      { name: translations.nav.faq, href: "/faq" },
      { name: translations.nav.pricing, href: "/pricing" },
    ],
    legal: [
      { name: translations.footer.termsOfService, href: "/terms" },
      { name: translations.footer.privacyPolicy, href: "/privacy" },
      { name: translations.footer.cookiePolicy, href: "/cookies" },
      { name: translations.footer.gdpr, href: "/gdpr" },
    ],
    schools: [
      { name: translations.footer.registerSchool, href: "/school/register" },
      { name: translations.footer.schoolLogin, href: "/school/login" },
      {
        name: translations.footer.successStories,
        href: "/school/success-stories",
      },
      { name: translations.footer.partnership, href: "/school/partnership" },
    ],
  };

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">Fahrschulfinder</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {translations.footer.description}
            </p>
            <div className="space-y-4">
              <h3 className="font-medium">{translations.footer.newsletter}</h3>
              <div className="flex gap-2">
                <Input
                  placeholder={translations.forms.enterEmail}
                  className="max-w-xs"
                />
                <Button className="bg-rose-500 hover:bg-rose-600">
                  {translations.footer.subscribe}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {translations.footer.subscribeText}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{translations.footer.company}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">
              {translations.footer.resources}
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">
              {translations.footer.forDrivingSchools}
            </h3>
            <ul className="space-y-2">
              {footerLinks.schools.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-medium mb-4 mt-8">
              {translations.footer.legal}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t mt-12 pt-8">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Fahrschulfinder.{" "}
            {translations.footer.copyright}
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
