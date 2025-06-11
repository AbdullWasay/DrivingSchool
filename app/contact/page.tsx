"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h1
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                {translations.contact.title}
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                {translations.contact.subtitle}
              </motion.p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>{translations.contact.getInTouch}</CardTitle>
                    <CardDescription>
                      {translations.contact.formDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <motion.div
                        className="flex flex-col items-center justify-center py-12 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}>
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                          {translations.contact.messageSent}
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          {translations.contact.thankYou}
                        </p>
                        <Button onClick={() => setIsSubmitted(false)}>
                          {translations.contact.sendAnother}
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">
                              {translations.contact.firstName}
                            </Label>
                            <Input
                              id="firstName"
                              placeholder={
                                translations.contact.firstNamePlaceholder
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">
                              {translations.contact.lastName}
                            </Label>
                            <Input
                              id="lastName"
                              placeholder={
                                translations.contact.lastNamePlaceholder
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {translations.contact.email}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={translations.contact.emailPlaceholder}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            {translations.contact.subject}
                          </Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={translations.contact.selectSubject}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                {translations.contact.subjects.general}
                              </SelectItem>
                              <SelectItem value="support">
                                {translations.contact.subjects.support}
                              </SelectItem>
                              <SelectItem value="partnership">
                                {translations.contact.subjects.partnership}
                              </SelectItem>
                              <SelectItem value="feedback">
                                {translations.contact.subjects.feedback}
                              </SelectItem>
                              <SelectItem value="other">
                                {translations.contact.subjects.other}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">
                            {translations.contact.message}
                          </Label>
                          <Textarea
                            id="message"
                            placeholder={
                              translations.contact.messagePlaceholder
                            }
                            className="min-h-[120px]"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}>
                          {isSubmitting ? (
                            translations.contact.sending
                          ) : (
                            <>
                              {translations.contact.sendMessage}
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {translations.contact.contactInformation}
                    </CardTitle>
                    <CardDescription>
                      {translations.contact.contactDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-rose-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {translations.contact.address}
                        </h3>
                        <p className="text-muted-foreground">
                          Fahrschulfinder GmbH
                          <br />
                          Musterstraße 123
                          <br />
                          10115 Berlin, Germany
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-rose-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {translations.contact.email}
                        </h3>
                        <p className="text-muted-foreground">
                          <Link
                            href="mailto:info@fahrschulfinder.de"
                            className="hover:underline">
                            info@fahrschulfinder.de
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-rose-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {translations.contact.phone}
                        </h3>
                        <p className="text-muted-foreground">
                          <Link
                            href="tel:+4930123456789"
                            className="hover:underline">
                            +49 30 123 456 789
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{translations.contact.officeHours}</CardTitle>
                    <CardDescription>
                      {translations.contact.officeHoursDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>
                          {translations.contact.monday} -{" "}
                          {translations.contact.friday}
                        </span>
                        <span>9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{translations.contact.saturday}</span>
                        <span>10:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{translations.contact.sunday}</span>
                        <span>{translations.contact.closed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {translations.contact.forDrivingSchools}
                    </CardTitle>
                    <CardDescription>
                      {translations.contact.forDrivingSchoolsDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {translations.contact.partnershipText}
                    </p>
                    <Link href="/pricing">
                      <Button className="w-full">
                        {translations.contact.viewPricingPlans}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
