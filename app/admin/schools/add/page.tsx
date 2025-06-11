// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Check, ChevronDown } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { cn } from "@/lib/utils"
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"

// const cities = [
//   { value: "berlin", label: "Berlin" },
//   { value: "munich", label: "Munich" },
//   { value: "hamburg", label: "Hamburg" },
//   { value: "cologne", label: "Cologne" },
//   { value: "frankfurt", label: "Frankfurt" },
//   { value: "stuttgart", label: "Stuttgart" },
//   { value: "dusseldorf", label: "Düsseldorf" },
//   { value: "leipzig", label: "Leipzig" },
//   { value: "dortmund", label: "Dortmund" },
//   { value: "essen", label: "Essen" },
// ]

// export default function AddSchoolPage() {
//   const router = useRouter()
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState("")
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     description: "",
//     website: "",
//     status: "pending",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       // In a real app, you would call an API to create the school
//       console.log("Creating school:", formData)

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Redirect to schools list
//       router.push("/admin/schools")
//     } catch (error) {
//       console.error("Error creating school:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <AdminDashboardLayout>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Add New Driving School</h1>
//         <p className="text-muted-foreground">Create a new driving school in the system</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//               <CardDescription>Enter the basic details of the driving school</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">School Name *</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter school name"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="website">Website</Label>
//                 <Input
//                   id="website"
//                   name="website"
//                   value={formData.website}
//                   onChange={handleChange}
//                   placeholder="Enter website URL"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Location & Description</CardTitle>
//               <CardDescription>Enter the location details and description</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="address">Street Address *</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Enter street address"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>City *</Label>
//                 <Popover open={open} onOpenChange={setOpen}>
//                   <PopoverTrigger asChild>
//                     <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
//                       {value ? cities.find((city) => city.value === value)?.label : "Select city..."}
//                       <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-full p-0">
//                     <Command>
//                       <CommandInput placeholder="Search city..." />
//                       <CommandList>
//                         <CommandEmpty>No city found.</CommandEmpty>
//                         <CommandGroup>
//                           {cities.map((city) => (
//                             <CommandItem
//                               key={city.value}
//                               value={city.value}
//                               onSelect={(currentValue) => {
//                                 setValue(currentValue)
//                                 handleSelectChange("city", city.label)
//                                 setOpen(false)
//                               }}
//                             >
//                               <Check
//                                 className={cn("mr-2 h-4 w-4", value === city.value ? "opacity-100" : "opacity-0")}
//                               />
//                               {city.label}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="postalCode">Postal Code *</Label>
//                 <Input
//                   id="postalCode"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   placeholder="Enter postal code"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter a description of the driving school"
//                   rows={5}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="mt-6 flex justify-end gap-4">
//           <Button type="button" variant="outline" onClick={() => router.push("/admin/schools")}>
//             Cancel
//           </Button>
//           <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
//             {isSubmitting ? "Creating..." : "Create School"}
//           </Button>
//         </div>
//       </form>
//     </AdminDashboardLayout>
//   )
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import { adminAPI, usersAPI } from "@/lib/api";

const cities = [
  { value: "berlin", label: "Berlin" },
  { value: "munich", label: "Munich" },
  { value: "hamburg", label: "Hamburg" },
  { value: "cologne", label: "Cologne" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "stuttgart", label: "Stuttgart" },
  { value: "dusseldorf", label: "Düsseldorf" },
  { value: "leipzig", label: "Leipzig" },
  { value: "dortmund", label: "Dortmund" },
  { value: "essen", label: "Essen" },
  { value: "solingen", label: "Solingen" },
];

export default function AddSchoolPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    description: "",
    website: "",
    status: "pending",
    user: "", // This will be set to a school owner user ID
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch school owner users
  useState(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const { data } = await usersAPI.getUsers("?role=school");
        setUsers(data.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare data for API
      const schoolData = {
        name: formData.name,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        location: {
          city: formData.city,
          zipcode: formData.postalCode,
          country: "Germany",
        },
        status: formData.status,
        user: formData.user,
        features: ["Theory Lessons", "Practical Lessons"], // Default features
      };

      await adminAPI.addSchool(schoolData);
      router.push("/admin/schools");
    } catch (err) {
      console.error("Error creating school:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create school. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Driving School</h1>
        <p className="text-muted-foreground">
          Create a new driving school in the system
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details of the driving school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">School Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Enter website URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleSelectChange("status", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">School Owner *</Label>
                <Select
                  value={formData.user}
                  onValueChange={(value) => handleSelectChange("user", value)}
                  disabled={loadingUsers}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingUsers
                          ? "Loading users..."
                          : "Select school owner"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location & Description</CardTitle>
              <CardDescription>
                Enter the location details and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>City *</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between">
                      {value
                        ? cities.find((city) => city.value === value)?.label
                        : "Select city..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search city..." />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {cities.map((city) => (
                            <CommandItem
                              key={city.value}
                              value={city.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue);
                                handleSelectChange("city", city.label);
                                setOpen(false);
                              }}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === city.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a description of the driving school"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/schools")}>
            Abbrechen
          </Button>
          <Button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600"
            disabled={isSubmitting}>
            {isSubmitting ? "Erstelle..." : "Fahrschule erstellen"}
          </Button>
        </div>
      </form>
    </AdminDashboardLayout>
  );
}
