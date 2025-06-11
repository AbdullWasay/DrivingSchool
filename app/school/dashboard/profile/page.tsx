"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";

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
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SchoolDashboardLayout from "@/components/school-dashboard-layout";
import { useSchoolAuth } from "@/context/SchoolAuthContext";

export default function SchoolProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { school: authSchool } = useSchoolAuth();

  const [school, setSchool] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    website: "",
    description: "",
    foundedYear: "",
    instructors: 0,
    vehicles: 0,
  });

  // Load school data from auth context
  useEffect(() => {
    if (authSchool) {
      setSchool({
        name: authSchool.schoolInfo?.schoolName || authSchool.name || "",
        email: authSchool.email || "",
        phone: authSchool.phone || "",
        address: authSchool.schoolInfo?.address || "",
        city: authSchool.schoolInfo?.city || "",
        postalCode: authSchool.schoolInfo?.postalCode || "",
        state: authSchool.schoolInfo?.state || "",
        website: authSchool.schoolInfo?.website || "",
        description: authSchool.schoolInfo?.description || "",
        foundedYear: authSchool.schoolInfo?.foundedYear || "",
        instructors: authSchool.schoolInfo?.instructors || 0,
        vehicles: authSchool.schoolInfo?.vehicles || 0,
      });
    }
  }, [authSchool]);

  const handleSchoolChange = (field, value) => {
    setSchool({
      ...school,
      [field]: value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">School Profile</h1>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-rose-500 hover:bg-rose-600">
          {isSaving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your profile has been updated successfully.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>
              Update your driving school's basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">School Name</Label>
                <Input
                  id="name"
                  value={school.name}
                  onChange={(e) => handleSchoolChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={school.email}
                    onChange={(e) =>
                      handleSchoolChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={school.phone}
                    onChange={(e) =>
                      handleSchoolChange("phone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={school.address}
                  onChange={(e) =>
                    handleSchoolChange("address", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={school.city}
                    onChange={(e) => handleSchoolChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={school.postalCode}
                    onChange={(e) =>
                      handleSchoolChange("postalCode", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={school.state}
                    onValueChange={(value) =>
                      handleSchoolChange("state", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="bavaria">Bavaria</SelectItem>
                      <SelectItem value="hamburg">Hamburg</SelectItem>
                      <SelectItem value="nrw">
                        North Rhine-Westphalia
                      </SelectItem>
                      <SelectItem value="hesse">Hesse</SelectItem>
                      <SelectItem value="bw">Baden-Württemberg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={school.website}
                    onChange={(e) =>
                      handleSchoolChange("website", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Year Founded</Label>
                  <Input
                    id="foundedYear"
                    value={school.foundedYear}
                    onChange={(e) =>
                      handleSchoolChange("foundedYear", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructors">Number of Instructors</Label>
                  <Input
                    id="instructors"
                    type="number"
                    value={school.instructors}
                    onChange={(e) =>
                      handleSchoolChange("instructors", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicles">Number of Vehicles</Label>
                  <Input
                    id="vehicles"
                    type="number"
                    value={school.vehicles}
                    onChange={(e) =>
                      handleSchoolChange("vehicles", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[120px]"
                  value={school.description}
                  onChange={(e) =>
                    handleSchoolChange("description", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>School Media</CardTitle>
            <CardDescription>
              Upload your school logo and photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">School Logo</h3>
                <div className="flex items-center gap-6">
                  <div className="border rounded-md overflow-hidden w-24 h-24 flex items-center justify-center bg-muted">
                    <Image
                      src={
                        authSchool?.schoolInfo?.logo?.url ||
                        "/placeholder.svg?height=96&width=96"
                      }
                      alt="School logo"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      type="button"
                      className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 400x400px. Max file size: 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">School Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {authSchool?.schoolInfo?.photos?.length > 0
                    ? authSchool.schoolInfo.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-muted">
                            <Image
                              src={photo.url}
                              alt={`School photo ${index + 1}`}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      ))
                    : [1, 2, 3, 4].map((index) => (
                        <div key={index} className="relative group">
                          <div className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-muted">
                            <Image
                              src={`https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80&text=Photo ${index}`}
                              alt={`School photo ${index}`}
                              width={200}
                              height={200}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                </div>
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Add More Photos
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  You can upload up to 10 photos. Recommended size: 1200x800px.
                  Max file size: 5MB per photo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SchoolDashboardLayout>
  );
}
