"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Premium (index 1)
  const pricingPlans = [
    {
      name: translations.pricing.plans.basic.name,
      price: { monthly: "0", yearly: "0" },
      description: translations.pricing.plans.basic.description,
      features: translations.pricing.plans.basic.features,
      limitations: translations.pricing.plans.basic.limitations,
      cta: translations.pricing.plans.basic.cta,
      popular: false,
    },
    {
      name: translations.pricing.plans.premium.name,
      price: { monthly: "29.99", yearly: "299.90" },
      description: translations.pricing.plans.premium.description,
      features: translations.pricing.plans.premium.features,
      limitations: translations.pricing.plans.premium.limitations,
      cta: translations.pricing.plans.premium.cta,
      popular: true,
    },
    {
      name: translations.pricing.plans.professional.name,
      price: { monthly: "79.99", yearly: "799.90" },
      description: translations.pricing.plans.professional.description,
      features: translations.pricing.plans.professional.features,
      limitations: translations.pricing.plans.professional.limitations,
      cta: translations.pricing.plans.professional.cta,
      popular: false,
    },
  ];

  const faqs = translations.faq.pricing;

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
                {translations.pricing.title}
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                {translations.pricing.subtitle}
              </motion.p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="monthly">
                    {translations.pricing.monthlyBilling}
                  </TabsTrigger>
                  <TabsTrigger value="yearly">
                    {translations.pricing.yearlyBilling}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}>
                      <Card
                        className={`flex flex-col h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedPlan === index
                            ? "border-rose-500 shadow-lg shadow-rose-100 ring-2 ring-rose-200"
                            : "border-gray-200 hover:border-rose-300"
                        }`}
                        onClick={() => setSelectedPlan(index)}>
                        {selectedPlan === index && (
                          <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">
                            {translations.pricing.selectedPlan}
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            {plan.name}
                            {selectedPlan === index && (
                              <CheckCircle className="h-5 w-5 text-rose-500" />
                            )}
                          </CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-bold">
                              €{plan.price.monthly}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                              {translations.pricing.month}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">
                                {translations.pricing.features}
                              </h3>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">
                                  {translations.pricing.limitations}
                                </h3>
                                <ul className="space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start text-muted-foreground">
                                      <span className="mr-2">•</span>
                                      <span>{limitation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className={`w-full ${
                              selectedPlan === index
                                ? "bg-rose-500 hover:bg-rose-600"
                                : ""
                            }`}
                            variant={
                              selectedPlan === index ? "default" : "outline"
                            }>
                            {plan.cta}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}>
                      <Card
                        className={`flex flex-col h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedPlan === index
                            ? "border-rose-500 shadow-lg shadow-rose-100 ring-2 ring-rose-200"
                            : "border-gray-200 hover:border-rose-300"
                        }`}
                        onClick={() => setSelectedPlan(index)}>
                        {selectedPlan === index && (
                          <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">
                            {translations.pricing.selectedPlan}
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            {plan.name}
                            {selectedPlan === index && (
                              <CheckCircle className="h-5 w-5 text-rose-500" />
                            )}
                          </CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-bold">
                              €{plan.price.yearly}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                              {translations.pricing.year}
                            </span>
                          </div>
                          {plan.price.yearly !== "0" && (
                            <p className="text-sm text-green-600 mt-1">
                              {translations.pricing.saveWithAnnual}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">
                                {translations.pricing.features}
                              </h3>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">
                                  {translations.pricing.limitations}
                                </h3>
                                <ul className="space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start text-muted-foreground">
                                      <span className="mr-2">•</span>
                                      <span>{limitation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className={`w-full ${
                              selectedPlan === index
                                ? "bg-rose-500 hover:bg-rose-600"
                                : ""
                            }`}
                            variant={
                              selectedPlan === index ? "default" : "outline"
                            }>
                            {plan.cta}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Selected Plan Summary */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-rose-800 mb-2">
                  Ausgewählter Plan: {pricingPlans[selectedPlan].name}
                </h3>
                <p className="text-rose-600 mb-4">
                  {pricingPlans[selectedPlan].description}
                </p>
                <div className="flex justify-center items-center gap-4">
                  <Button className="bg-rose-500 hover:bg-rose-600" size="lg">
                    {pricingPlans[selectedPlan].cta}
                  </Button>
                  <p className="text-sm text-rose-600">
                    Klicken Sie auf einen anderen Plan, um ihn auszuwählen
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {translations.pricing.faqTitle}
                </h2>
                <p className="text-muted-foreground">
                  {translations.pricing.faqSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}>
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">
                {translations.pricing.customSolutionTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {translations.pricing.customSolutionText}
              </p>
              <Link href="/contact">
                <Button size="lg">{translations.pricing.contactSales}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                {translations.pricing.testimonialsTitle}
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}>
                {translations.pricing.testimonialsSubtitle}
              </motion.p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}>
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=96&q=80"
                      alt="Thomas K."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {translations.pricing.testimonials[0].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {translations.pricing.testimonials[0].school}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {translations.pricing.testimonials[0].text}
                </p>
              </motion.div>

              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}>
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=96&q=80"
                      alt="Maria S."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {translations.pricing.testimonials[1].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {translations.pricing.testimonials[1].school}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {translations.pricing.testimonials[1].text}
                </p>
              </motion.div>

              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}>
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=96&q=80"
                      alt="Jan B."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {translations.pricing.testimonials[2].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {translations.pricing.testimonials[2].school}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {translations.pricing.testimonials[2].text}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                {translations.pricing.ctaTitle}
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}>
                {translations.pricing.ctaSubtitle}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}>
                <Link href="/school/register">
                  <Button size="lg" variant="secondary">
                    {translations.pricing.registerSchool}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-rose-600 hover:bg-rose-700 text-white">
                    {translations.pricing.contactSales}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
