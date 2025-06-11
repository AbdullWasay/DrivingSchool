"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

export default function FAQPage() {
  const categories = [
    { id: "general", name: translations.faq.categories.general },
    { id: "students", name: translations.faq.categories.students },
    { id: "schools", name: translations.faq.categories.schools },
    { id: "pricing", name: translations.faq.categories.pricing },
    { id: "technical", name: translations.faq.categories.technical },
  ];

  const faqs = {
    general: translations.faq.general,
    students: translations.faq.students,
    schools: translations.faq.schools,
    pricing: translations.faq.pricing,
    technical: translations.faq.technical,
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
                {translations.faq.title}
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                {translations.faq.subtitle}
              </motion.p>
            </div>

            <motion.div
              className="max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={translations.faq.searchPlaceholder}
                  className="pl-10 py-6 text-base"
                />
              </div>
            </motion.div>

            <Tabs defaultValue="general" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(faqs).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">
                {translations.faq.stillHaveQuestions}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {translations.faq.stillHaveQuestionsText}
              </p>
              <Link href="/contact">
                <Button size="lg">{translations.faq.contactUs}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
