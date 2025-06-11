"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Plus, Minus, HelpCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"

export default function SchoolPricingPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [pricing, setPricing] = useState({
    basic: {
      registrationFee: 100,
      theoryLesson: 15,
      drivingLesson: 50,
      nightDriving: 55,
      highwayDriving: 55,
      examFee: 150,
      theoryExam: 80,
    },
    packages: {
      basicPackage: {
        enabled: true,
        name: "Basic Package",
        description: "Standard driving course for beginners",
        price: 1299,
        lessons: 20,
        theoryLessons: 14,
      },
      intensivePackage: {
        enabled: true,
        name: "Intensive Package",
        description: "Fast-track course with more lessons per week",
        price: 1599,
        lessons: 25,
        theoryLessons: 14,
      },
      premiumPackage: {
        enabled: false,
        name: "Premium Package",
        description: "Comprehensive course with additional services",
        price: 1899,
        lessons: 30,
        theoryLessons: 14,
      },
    },
    discounts: {
      studentDiscount: {
        enabled: true,
        percentage: 5,
      },
      groupDiscount: {
        enabled: true,
        percentage: 10,
      },
      seasonalDiscount: {
        enabled: false,
        percentage: 7,
      },
    },
  })

  const handleBasicPriceChange = (key, value) => {
    setPricing({
      ...pricing,
      basic: {
        ...pricing.basic,
        [key]: Number.parseFloat(value) || 0,
      },
    })
  }

  const handlePackageChange = (packageKey, field, value) => {
    setPricing({
      ...pricing,
      packages: {
        ...pricing.packages,
        [packageKey]: {
          ...pricing.packages[packageKey],
          [field]:
            field === "enabled"
              ? value
              : field === "name" || field === "description"
                ? value
                : Number.parseFloat(value) || 0,
        },
      },
    })
  }

  const handleDiscountChange = (discountKey, field, value) => {
    setPricing({
      ...pricing,
      discounts: {
        ...pricing.discounts,
        [discountKey]: {
          ...pricing.discounts[discountKey],
          [field]: field === "enabled" ? value : Number.parseFloat(value) || 0,
        },
      },
    })
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pricing Management</h1>
        <Button onClick={handleSave} disabled={isSaving} className="bg-rose-500 hover:bg-rose-600">
          {isSaving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your pricing changes have been saved successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs defaultValue="individual">
        <TabsList className="mb-6">
          <TabsTrigger value="individual">Individual Pricing</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Pricing</CardTitle>
              <CardDescription>Set the prices for individual services and lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("registrationFee", pricing.basic.registrationFee - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="registrationFee"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.registrationFee}
                      onChange={(e) => handleBasicPriceChange("registrationFee", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("registrationFee", pricing.basic.registrationFee + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theoryLesson">Theory Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryLesson", pricing.basic.theoryLesson - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="theoryLesson"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.theoryLesson}
                      onChange={(e) => handleBasicPriceChange("theoryLesson", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryLesson", pricing.basic.theoryLesson + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drivingLesson">Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("drivingLesson", pricing.basic.drivingLesson - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="drivingLesson"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.drivingLesson}
                      onChange={(e) => handleBasicPriceChange("drivingLesson", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("drivingLesson", pricing.basic.drivingLesson + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nightDriving">Night Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("nightDriving", pricing.basic.nightDriving - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="nightDriving"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.nightDriving}
                      onChange={(e) => handleBasicPriceChange("nightDriving", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("nightDriving", pricing.basic.nightDriving + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highwayDriving">Highway Driving Lesson (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("highwayDriving", pricing.basic.highwayDriving - 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="highwayDriving"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.highwayDriving}
                      onChange={(e) => handleBasicPriceChange("highwayDriving", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("highwayDriving", pricing.basic.highwayDriving + 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examFee">Practical Exam Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("examFee", pricing.basic.examFee - 10)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="examFee"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.examFee}
                      onChange={(e) => handleBasicPriceChange("examFee", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("examFee", pricing.basic.examFee + 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theoryExam">Theory Exam Fee (€)</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryExam", pricing.basic.theoryExam - 10)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="theoryExam"
                      type="number"
                      className="mx-2 text-center"
                      value={pricing.basic.theoryExam}
                      onChange={(e) => handleBasicPriceChange("theoryExam", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => handleBasicPriceChange("theoryExam", pricing.basic.theoryExam + 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Calculator Preview</CardTitle>
              <CardDescription>See how your pricing will appear in the price calculator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-4">Sample Calculation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Registration Fee</span>
                    <span>€{pricing.basic.registrationFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theory Lessons (14x)</span>
                    <span>€{(pricing.basic.theoryLesson * 14).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driving Lessons (20x)</span>
                    <span>€{(pricing.basic.drivingLesson * 20).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Night Driving (3x)</span>
                    <span>€{(pricing.basic.nightDriving * 3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highway Driving (3x)</span>
                    <span>€{(pricing.basic.highwayDriving * 3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theory Exam Fee</span>
                    <span>€{pricing.basic.theoryExam.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practical Exam Fee</span>
                    <span>€{pricing.basic.examFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      €
                      {(
                        pricing.basic.registrationFee +
                        pricing.basic.theoryLesson * 14 +
                        pricing.basic.drivingLesson * 20 +
                        pricing.basic.nightDriving * 3 +
                        pricing.basic.highwayDriving * 3 +
                        pricing.basic.theoryExam +
                        pricing.basic.examFee
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Package Pricing</CardTitle>
              <CardDescription>Create and manage package deals for your driving school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(pricing.packages).map(([key, packageData]) => (
                <div key={key} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">{packageData.name}</h3>
                    <div className="flex items-center">
                      <Label htmlFor={`${key}-enabled`} className="mr-2">
                        Active
                      </Label>
                      <Switch
                        id={`${key}-enabled`}
                        checked={packageData.enabled}
                        onCheckedChange={(checked) => handlePackageChange(key, "enabled", checked)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-name`}>Package Name</Label>
                      <Input
                        id={`${key}-name`}
                        value={packageData.name}
                        onChange={(e) => handlePackageChange(key, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-price`}>Package Price (€)</Label>
                      <Input
                        id={`${key}-price`}
                        type="number"
                        value={packageData.price}
                        onChange={(e) => handlePackageChange(key, "price", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor={`${key}-description`}>Description</Label>
                    <Input
                      id={`${key}-description`}
                      value={packageData.description}
                      onChange={(e) => handlePackageChange(key, "description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-lessons`}>Driving Lessons</Label>
                      <Input
                        id={`${key}-lessons`}
                        type="number"
                        value={packageData.lessons}
                        onChange={(e) => handlePackageChange(key, "lessons", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-theory`}>Theory Lessons</Label>
                      <Input
                        id={`${key}-theory`}
                        type="number"
                        value={packageData.theoryLessons}
                        onChange={(e) => handlePackageChange(key, "theoryLessons", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Individual price: </span>
                        <span>
                          €
                          {(
                            pricing.basic.registrationFee +
                            pricing.basic.theoryLesson * packageData.theoryLessons +
                            pricing.basic.drivingLesson * packageData.lessons +
                            pricing.basic.nightDriving * 3 +
                            pricing.basic.highwayDriving * 3 +
                            pricing.basic.theoryExam +
                            pricing.basic.examFee
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Package savings: </span>
                        <span className="text-green-600">
                          €
                          {(
                            pricing.basic.registrationFee +
                            pricing.basic.theoryLesson * packageData.theoryLessons +
                            pricing.basic.drivingLesson * packageData.lessons +
                            pricing.basic.nightDriving * 3 +
                            pricing.basic.highwayDriving * 3 +
                            pricing.basic.theoryExam +
                            pricing.basic.examFee -
                            packageData.price
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <Button variant="outline" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discounts</CardTitle>
              <CardDescription>Set up discounts for special groups or promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(pricing.discounts).map(([key, discount]) => (
                  <div key={key} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Switch
                        id={`${key}-enabled`}
                        checked={discount.enabled}
                        onCheckedChange={(checked) => handleDiscountChange(key, "enabled", checked)}
                        className="mr-4"
                      />
                      <div>
                        <Label htmlFor={`${key}-enabled`} className="font-medium">
                          {key === "studentDiscount"
                            ? "Student Discount"
                            : key === "groupDiscount"
                              ? "Group Discount (2+ people)"
                              : "Seasonal Discount"}
                        </Label>
                        {key === "studentDiscount" && (
                          <p className="text-sm text-muted-foreground">Discount for students with valid ID</p>
                        )}
                        {key === "groupDiscount" && (
                          <p className="text-sm text-muted-foreground">
                            Discount when 2 or more people register together
                          </p>
                        )}
                        {key === "seasonalDiscount" && (
                          <p className="text-sm text-muted-foreground">
                            Special promotional discount for seasonal campaigns
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Input
                        id={`${key}-percentage`}
                        type="number"
                        value={discount.percentage}
                        onChange={(e) => handleDiscountChange(key, "percentage", e.target.value)}
                        className="w-20 text-center mr-2"
                      />
                      <span>%</span>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Discount
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Discount Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">Configure how discounts are applied and displayed to customers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stackable" className="font-medium">
                      Allow stackable discounts
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow customers to use multiple discounts at once</p>
                  </div>
                  <Switch id="stackable" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="display-savings" className="font-medium">
                      Display savings on website
                    </Label>
                    <p className="text-sm text-muted-foreground">Show potential savings to customers on your profile</p>
                  </div>
                  <Switch id="display-savings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-apply" className="font-medium">
                      Automatically apply best discount
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      System will apply the best discount for the customer
                    </p>
                  </div>
                  <Switch id="auto-apply" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SchoolDashboardLayout>
  )
}
