"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";
import { useSchoolAuth } from "@/context/SchoolAuthContext";

export default function SchoolLoginPage() {
  const router = useRouter();
  const { login, loading, error: authError } = useSchoolAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Driving school dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
                <h2 className="text-white text-3xl font-bold mb-4">
                  {translations.school.welcomeBack}
                </h2>
                <p className="text-white/80 mb-6">
                  {translations.school.manageSchool}
                </p>
                <div className="flex gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
                    <div className="text-white text-2xl font-bold">500+</div>
                    <div className="text-white/80 text-sm">Driving Schools</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
                    <div className="text-white text-2xl font-bold">50k+</div>
                    <div className="text-white/80 text-sm">
                      Students Reached
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  {translations.school.loginTitle}
                </CardTitle>
                <CardDescription>
                  {translations.school.loginSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {authError && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200">
                      {authError}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="#"
                          className="text-sm text-rose-500 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="font-normal text-sm">
                        {translations.school.rememberMe}
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-rose-500 hover:bg-rose-600"
                      disabled={loading}>
                      {loading
                        ? translations.admin.loggingIn
                        : translations.admin.login}
                    </Button>
                  </div>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs text-muted-foreground">
                      ODER FORTFAHREN MIT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Google"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Microsoft"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Microsoft
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                <div className="text-sm text-muted-foreground">
                  {translations.school.noAccount}{" "}
                  <Link
                    href="/school/register"
                    className="text-rose-500 hover:underline font-medium">
                    {translations.school.signUp}
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
