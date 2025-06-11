"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Check,
  Calendar,
  Car,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Mock data for schools
const mockSchools = [
  {
    id: 1,
    name: "Fahrschule Schmidt",
    image: "/placeholder.svg?height=400&width=800",
    rating: 4.8,
    averagePrice: 1850.0,
    address: "Hauptstraße 123",
    city: "Berlin",
    email: "info@fahrschule-schmidt.de",
    phone: "+49 30 1234567",
    description:
      "Fahrschule Schmidt has been providing high-quality driving education since 2005. Our experienced instructors are dedicated to helping you become a safe and confident driver.",
    services: [
      "Car License (B)",
      "Motorcycle License (A)",
      "Refresher Courses",
      "Intensive Courses",
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
    instructors: 8,
    vehicles: 12,
    foundedYear: 2005,
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "20:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "14:00", closed: false },
      sunday: { open: "10:00", close: "14:00", closed: true },
    },
  },
  {
    id: 2,
    name: "City Fahrschule",
    image: "/placeholder.svg?height=400&width=800",
    rating: 4.5,
    averagePrice: 1750.0,
    address: "Berliner Str. 45",
    city: "Hamburg",
    email: "info@city-fahrschule.de",
    phone: "+49 40 9876543",
    description:
      "City Fahrschule offers comprehensive driving education in the heart of Hamburg. We specialize in car and truck licenses with modern vehicles and flexible scheduling.",
    services: [
      "Car License (B)",
      "Truck License (C)",
      "Automatic Transmission",
      "Online Theory",
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
    instructors: 6,
    vehicles: 10,
    foundedYear: 2010,
    openingHours: {
      monday: { open: "08:00", close: "19:00", closed: false },
      tuesday: { open: "08:00", close: "19:00", closed: false },
      wednesday: { open: "08:00", close: "19:00", closed: false },
      thursday: { open: "08:00", close: "19:00", closed: false },
      friday: { open: "08:00", close: "19:00", closed: false },
      saturday: { open: "09:00", close: "15:00", closed: false },
      sunday: { open: "09:00", close: "15:00", closed: true },
    },
  },
  {
    id: 3,
    name: "Fahrschule Klingenstadt",
    image: "/placeholder.svg?height=400&width=800",
    rating: 4.7,
    averagePrice: 1780.0,
    address: "Kölner Straße 15",
    city: "Solingen",
    email: "info@fahrschule-klingenstadt.de",
    phone: "+49 212 345-6789",
    description:
      "Fahrschule Klingenstadt in Solingen bietet moderne Fahrausbildung in der traditionsreichen Klingenstadt. Wir sind stolz darauf, seit über 15 Jahren qualitativ hochwertige Fahrausbildung in Nordrhein-Westfalen anzubieten.",
    services: [
      "PKW-Führerschein (B)",
      "Motorradführerschein (A)",
      "Intensivkurse",
      "Automatikgetriebe",
      "Online-Buchung",
    ],
    prices: {
      registrationFee: 95,
      theoryLesson: 16,
      drivingLesson: 48,
      nightDriving: 54,
      highwayDriving: 54,
      examFee: 148,
      theoryExam: 78,
    },
    instructors: 7,
    vehicles: 11,
    foundedYear: 2008,
    openingHours: {
      monday: { open: "08:30", close: "18:30", closed: false },
      tuesday: { open: "08:30", close: "18:30", closed: false },
      wednesday: { open: "08:30", close: "18:30", closed: false },
      thursday: { open: "08:30", close: "20:00", closed: false },
      friday: { open: "08:30", close: "18:30", closed: false },
      saturday: { open: "09:00", close: "15:00", closed: false },
      sunday: { open: "09:00", close: "15:00", closed: true },
    },
  },
  {
    id: 4,
    name: "Drive Easy",
    image: "/placeholder.svg?height=400&width=800",
    rating: 4.9,
    averagePrice: 1950.0,
    address: "Hauptstraße 78",
    city: "Munich",
    email: "info@drive-easy.de",
    phone: "+49 89 5556677",
    description:
      "Drive Easy is Munich's premier driving school focusing on personalized instruction. We offer special support for anxious learners and foreign language instruction.",
    services: [
      "Car License (B)",
      "Anxiety Support",
      "Foreign Language Support",
      "Refresher Courses",
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
    instructors: 10,
    vehicles: 15,
    foundedYear: 2015,
    openingHours: {
      monday: { open: "09:00", close: "20:00", closed: false },
      tuesday: { open: "09:00", close: "20:00", closed: false },
      wednesday: { open: "09:00", close: "20:00", closed: false },
      thursday: { open: "09:00", close: "20:00", closed: false },
      friday: { open: "09:00", close: "20:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
  },
];

export default function SchoolDetailPage() {
  const params = useParams();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    const schoolId = Number.parseInt(params.id);
    const foundSchool = mockSchools.find((s) => s.id === schoolId);
    setSchool(foundSchool);
  }, [params.id]);

  if (!school) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center h-[50vh]">
              <p>Loading school details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link
              href="/comparison"
              className="text-rose-500 hover:underline mb-4 inline-block">
              &larr; Back to Comparison
            </Link>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
              <Image
                src={
                  school.image ||
                  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                }
                alt={school.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {school.name}
                </h1>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(school.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  <span className="ml-2 text-white">
                    {school.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {school.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {school.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Address</p>
                              <p className="text-muted-foreground">
                                {school.address}, {school.city}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-muted-foreground">
                                {school.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-muted-foreground">
                                {school.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Founded</p>
                              <p className="text-muted-foreground">
                                {school.foundedYear}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Instructors</p>
                              <p className="text-muted-foreground">
                                {school.instructors} qualified instructors
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Vehicles</p>
                              <p className="text-muted-foreground">
                                {school.vehicles} modern training vehicles
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Opening Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(school.openingHours).map(
                          ([day, hours]) => (
                            <div
                              key={day}
                              className="flex justify-between py-2 border-b last:border-0">
                              <div className="font-medium capitalize">
                                {day}
                              </div>
                              <div>
                                {hours.closed ? (
                                  <span className="text-muted-foreground">
                                    Closed
                                  </span>
                                ) : (
                                  <span>
                                    {hours.open} - {hours.close}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Information</CardTitle>
                      <CardDescription>
                        Detailed breakdown of our pricing structure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Registration Fee</span>
                            <span className="font-medium">
                              €{school.prices.registrationFee.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Theory Lesson</span>
                            <span className="font-medium">
                              €{school.prices.theoryLesson.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Driving Lesson</span>
                            <span className="font-medium">
                              €{school.prices.drivingLesson.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Night Driving</span>
                            <span className="font-medium">
                              €{school.prices.nightDriving.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Highway Driving</span>
                            <span className="font-medium">
                              €{school.prices.highwayDriving.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Theory Exam Fee</span>
                            <span className="font-medium">
                              €{school.prices.theoryExam.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Practical Exam Fee</span>
                            <span className="font-medium">
                              €{school.prices.examFee.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between p-3 bg-rose-100 rounded-md">
                            <span className="font-medium">Average Total</span>
                            <span className="font-bold">
                              €{school.averagePrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            * Prices may vary based on individual requirements.
                            The average total is an estimate for a standard
                            course.
                          </p>
                          <p>* Additional services may incur extra charges.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Our Services</CardTitle>
                      <CardDescription>
                        Comprehensive driving education services we offer
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {school.services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-start p-3 border rounded-md">
                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                            <div>
                              <h3 className="font-medium">{service}</h3>
                              <p className="text-sm text-muted-foreground">
                                {getServiceDescription(service)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-rose-500" />
                      <span>
                        {school.address}, {school.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-rose-500" />
                      <span>{school.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-rose-500" />
                      <span>{school.email}</span>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <Button className="w-full">Contact Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Average Price
                      </span>
                      <span className="font-bold">
                        €{school.averagePrice.toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{school.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span>{school.foundedYear}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Instructors</span>
                      <span>{school.instructors}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Vehicles</span>
                      <span>{school.vehicles}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Helper function to get service descriptions
function getServiceDescription(service) {
  const descriptions = {
    "Car License (B)":
      "Standard driving license for cars and light vehicles up to 3.5 tons.",
    "Motorcycle License (A)": "License for motorcycles of all engine sizes.",
    "Truck License (C)":
      "License for vehicles over 3.5 tons for commercial transport.",
    "Refresher Courses":
      "Courses for those who already have a license but need to refresh their skills.",
    "Intensive Courses":
      "Accelerated learning program to get your license in a shorter time frame.",
    "Automatic Transmission":
      "Driving lessons specifically for automatic transmission vehicles.",
    "Online Theory": "Digital access to theory lessons and practice tests.",
    "Anxiety Support":
      "Special support and techniques for anxious or nervous learners.",
    "Foreign Language Support":
      "Instruction available in multiple languages for non-native speakers.",
    // German services
    "PKW-Führerschein (B)":
      "Standard-Führerschein für PKW und leichte Fahrzeuge bis 3,5 Tonnen.",
    "Motorradführerschein (A)":
      "Führerschein für Motorräder aller Hubraumgrößen.",
    Intensivkurse:
      "Beschleunigtes Lernprogramm für den schnelleren Führerscheinerwerb.",
    Automatikgetriebe:
      "Fahrstunden speziell für Fahrzeuge mit Automatikgetriebe.",
    "Online-Buchung":
      "Digitale Buchung von Fahrstunden und Terminen über unsere Website.",
  };

  return (
    descriptions[service] ||
    "Comprehensive training and instruction for this service."
  );
}
