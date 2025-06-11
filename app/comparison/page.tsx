"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Phone, Mail, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PriceCalculator from "@/components/price-calculator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

// Mock data for schools
const mockSchools = [
  {
    id: 1,
    name: "Fahrschule Schmidt",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    averagePrice: 1850.0,
    address: "Hauptstraße 123",
    city: "Berlin",
    email: "info@fahrschule-schmidt.de",
    phone: "+49 30 1234567",
    services: [
      translations.comparison.carLicense,
      translations.comparison.motorcycleLicense,
      translations.comparison.refresherCourses,
      translations.comparison.intensiveCourses,
    ],
    prices: {
      registrationFee: 100,
      theoryLesson: 15,
      drivingLesson: 50,
      nightDriving: 55,
      highwayDriving: 55,
      examFee: 150,
      theoryExam: 80,
    },
  },
  {
    id: 2,
    name: "City Fahrschule",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    averagePrice: 1750.0,
    address: "Berliner Str. 45",
    city: "Hamburg",
    email: "info@city-fahrschule.de",
    phone: "+49 40 9876543",
    services: [
      translations.comparison.carLicense,
      translations.comparison.truckLicense,
      translations.comparison.automaticTransmission,
      translations.comparison.onlineTheory,
    ],
    prices: {
      registrationFee: 90,
      theoryLesson: 14,
      drivingLesson: 48,
      nightDriving: 52,
      highwayDriving: 52,
      examFee: 140,
      theoryExam: 75,
    },
  },
  {
    id: 3,
    name: "Drive Easy",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    averagePrice: 1950.0,
    address: "Hauptstraße 78",
    city: "Munich",
    email: "info@drive-easy.de",
    phone: "+49 89 5556677",
    services: [
      translations.comparison.carLicense,
      translations.comparison.anxietySupport,
      translations.comparison.foreignLanguageSupport,
      translations.comparison.refresherCourses,
    ],
    prices: {
      registrationFee: 110,
      theoryLesson: 16,
      drivingLesson: 55,
      nightDriving: 60,
      highwayDriving: 60,
      examFee: 160,
      theoryExam: 85,
    },
  },
];

export default function ComparisonPage() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [filteredSchools, setFilteredSchools] = useState(mockSchools);
  const [experienceLevel, setExperienceLevel] = useState("beginner");

  useEffect(() => {
    if (selectedCity === "all") {
      setFilteredSchools(mockSchools);
    } else {
      setFilteredSchools(
        mockSchools.filter(
          (school) => school.city.toLowerCase() === selectedCity.toLowerCase()
        )
      );
    }
  }, [selectedCity]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {translations.comparison.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3">
                <Label htmlFor="city-filter">
                  {translations.comparison.filterByCity}
                </Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger id="city-filter" className="w-full">
                    <SelectValue
                      placeholder={translations.comparison.selectCity}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {translations.comparison.allCities}
                    </SelectItem>
                    <SelectItem value="berlin">
                      {translations.comparison.berlin}
                    </SelectItem>
                    <SelectItem value="hamburg">
                      {translations.comparison.hamburg}
                    </SelectItem>
                    <SelectItem value="munich">
                      {translations.comparison.munich}
                    </SelectItem>
                    <SelectItem value="solingen">
                      {translations.comparison.solingen}
                    </SelectItem>
                    <SelectItem value="cologne">
                      {translations.comparison.cologne}
                    </SelectItem>
                    <SelectItem value="frankfurt">
                      {translations.comparison.frankfurt}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-2/3">
                <PriceCalculator schools={filteredSchools} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <Card className="h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={
                        school.image ||
                        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={school.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold">
                        {school.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(school.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        <span className="ml-2 text-white text-sm">
                          {school.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {translations.comparison.averagePrice}
                        </div>
                        <div className="font-bold">
                          €{school.averagePrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-sm font-medium mt-4 mb-2">
                        {translations.comparison.services}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {school.services.map((service, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          {translations.comparison.contactInformation}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {school.name} - {translations.comparison.contact}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <span>
                              {school.address}, {school.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <span>{school.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <span>{school.email}</span>
                          </div>

                          <div className="pt-4 border-t">
                            <div className="mb-3 font-medium">
                              {translations.comparison.selectExperience}
                            </div>
                            <RadioGroup
                              value={experienceLevel}
                              onValueChange={setExperienceLevel}
                              className="grid grid-cols-1 gap-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="beginner"
                                  id={`beginner-${school.id}`}
                                />
                                <Label htmlFor={`beginner-${school.id}`}>
                                  {translations.comparison.beginner}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="intermediate"
                                  id={`intermediate-${school.id}`}
                                />
                                <Label htmlFor={`intermediate-${school.id}`}>
                                  {translations.comparison.intermediate}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="advanced"
                                  id={`advanced-${school.id}`}
                                />
                                <Label htmlFor={`advanced-${school.id}`}>
                                  {translations.comparison.advanced}
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline">
                            {translations.comparison.sendMessage}
                          </Button>
                          <Button>{translations.comparison.callNow}</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Link
                      href={`/comparison/school/${school.id}`}
                      className="flex-1">
                      <Button className="w-full">
                        {translations.comparison.viewDetails}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
