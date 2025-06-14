"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ChevronRight,
  Star,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CitySelector from "@/components/city-selector";
import SchoolCard from "@/components/school-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TestimonialCard from "@/components/testimonial-card";
import PricingCard from "@/components/pricing-card";
import { mockSchools } from "@/lib/mock-data";
import { translations } from "@/lib/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  const filteredSchools = selectedCity
    ? mockSchools.filter((school) => school.city === selectedCity)
    : [];

  const pricingPlans = [
    {
      name: translations.home.basicPlan,
      price: translations.home.basicPrice,
      description: translations.home.basicDesc,
      features: [
        translations.home.basicFeature1,
        translations.home.basicFeature2,
        translations.home.basicFeature3,
        translations.home.basicFeature4,
      ],
      cta: translations.home.basicCta,
      popular: false,
    },
    {
      name: translations.home.premiumPlan,
      price: translations.home.premiumPrice,
      description: translations.home.premiumDesc,
      features: [
        translations.home.premiumFeature1,
        translations.home.premiumFeature2,
        translations.home.premiumFeature3,
        translations.home.premiumFeature4,
        translations.home.premiumFeature5,
      ],
      cta: translations.home.premiumCta,
      popular: true,
    },
    {
      name: translations.home.professionalPlan,
      price: translations.home.professionalPrice,
      description: translations.home.professionalDesc,
      features: [
        translations.home.professionalFeature1,
        translations.home.professionalFeature2,
        translations.home.professionalFeature3,
        translations.home.professionalFeature4,
        translations.home.professionalFeature5,
        translations.home.professionalFeature6,
      ],
      cta: translations.home.professionalCta,
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Neue Fahrerin",
      content: translations.home.testimonial1,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80",
      rating: 5,
    },
    {
      name: "Thomas K.",
      role: "Fahrschulbesitzer",
      content: translations.home.testimonial2,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80",
      rating: 5,
    },
    {
      name: "Julia B.",
      role: "Mutter",
      content: translations.home.testimonial3,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80",
      rating: 4,
    },
  ];

  const stats = [
    {
      value: "500+",
      label: translations.home.stat1,
      icon: <Users className="h-6 w-6 text-rose-500" />,
    },
    {
      value: "50,000+",
      label: translations.home.stat2,
      icon: <CheckCircle className="h-6 w-6 text-rose-500" />,
    },
    {
      value: "100+",
      label: translations.home.stat3,
      icon: <MapPin className="h-6 w-6 text-rose-500" />,
    },
    {
      value: "95%",
      label: translations.home.stat4,
      icon: <Award className="h-6 w-6 text-rose-500" />,
    },
  ];

  const faqs = [
    {
      question: translations.home.faq1Question,
      answer: translations.home.faq1Answer,
    },
    {
      question: translations.home.faq2Question,
      answer: translations.home.faq2Answer,
    },
    {
      question: translations.home.faq3Question,
      answer: translations.home.faq3Answer,
    },
    {
      question: translations.home.faq4Question,
      answer: translations.home.faq4Answer,
    },
    {
      question: translations.home.faq5Question,
      answer: translations.home.faq5Answer,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-rose-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <Badge className="mb-2" variant="outline">
                      {translations.home.badgeText}
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    {translations.home.heroTitle}
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    {translations.home.heroSubtitle}
                  </motion.p>
                </div>
                <motion.div
                  className="w-full max-w-md space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  <div className="flex flex-col space-y-2">
                    <CitySelector onCitySelect={setSelectedCity} />
                    <Button
                      onClick={() => setShowComparison(true)}
                      disabled={!selectedCity}
                      className="w-full">
                      {translations.home.heroButton}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                <Image
                  src="/assets/home.png"
                  alt="Driving school illustration"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Results (Conditional) */}
        {showComparison && selectedCity && (
          <motion.section
            className="w-full py-12 md:py-16 bg-muted/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4 md:gap-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {translations.home.drivingSchoolsIn} {selectedCity}
                  </h2>
                  <p className="text-muted-foreground">
                    {translations.home.compareSchools.replace(
                      "{count}",
                      filteredSchools.length.toString()
                    )}
                  </p>
                </div>
                <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSchools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                  ))}
                </div>
                <div className="w-full flex justify-center mt-4">
                  <Link href={`/comparison?city=${selectedCity}`}>
                    <Button size="lg">
                      {translations.home.viewDetailedComparison}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}>
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {translations.home.howItWorksTitle}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {translations.home.howItWorksSubtitle}
                </p>
              </motion.div>
              <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-3">
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <MapPin className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {translations.home.step1Title}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {translations.home.step1Desc}
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <Search className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {translations.home.step2Title}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {translations.home.step2Desc}
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <Star className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {translations.home.step3Title}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {translations.home.step3Desc}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {translations.home.testimonialsTitle}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {translations.home.testimonialsSubtitle}
                </p>
              </motion.div>
              <div className="mx-auto grid max-w-6xl gap-6 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}>
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {translations.home.faqTitle}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {translations.home.faqSubtitle}
                </p>
              </motion.div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                {translations.home.stillHaveQuestions}
              </p>
              <Link href="/contact">
                <Button>{translations.home.contactUs}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {translations.home.ctaTitle}
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  {translations.home.ctaSubtitle}
                </p>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/comparison">
                  <Button size="lg" variant="secondary">
                    {translations.home.ctaButton1}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-rose-600 hover:bg-rose-700 text-white">
                    {translations.home.ctaButton2}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
