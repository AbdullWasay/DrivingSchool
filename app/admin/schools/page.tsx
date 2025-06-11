// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Plus, Pencil, Trash2, Search, MoreHorizontal, Check, X, Clock } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"

// // Mock data for schools
// const initialSchools = [
//   {
//     id: 1,
//     name: "Fahrschule Mustermann",
//     city: "Berlin",
//     email: "info@mustermann-fahrschule.de",
//     phone: "+49 123 456789",
//     status: "active",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "City Driving School",
//     city: "Munich",
//     email: "contact@citydriving.de",
//     phone: "+49 987 654321",
//     status: "active",
//     createdAt: "2023-02-20",
//   },
//   {
//     id: 3,
//     name: "Autobahn Fahrschule",
//     city: "Hamburg",
//     email: "info@autobahnfahrschule.de",
//     phone: "+49 456 789123",
//     status: "pending",
//     createdAt: "2023-03-10",
//   },
//   {
//     id: 4,
//     name: "Schmidt Driving Academy",
//     city: "Cologne",
//     email: "office@schmidtacademy.de",
//     phone: "+49 321 654987",
//     status: "inactive",
//     createdAt: "2023-01-05",
//   },
//   {
//     id: 5,
//     name: "Fahrschule Express",
//     city: "Frankfurt",
//     email: "info@express-fahrschule.de",
//     phone: "+49 789 123456",
//     status: "active",
//     createdAt: "2023-04-12",
//   },
// ]

// export default function SchoolsPage() {
//   const router = useRouter()
//   const [schools, setSchools] = useState(initialSchools)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [schoolToDelete, setSchoolToDelete] = useState(null)
//   const [statusDialogOpen, setStatusDialogOpen] = useState(false)
//   const [schoolToUpdateStatus, setSchoolToUpdateStatus] = useState(null)
//   const [newStatus, setNewStatus] = useState("")

//   const filteredSchools = schools.filter(
//     (school) =>
//       school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       school.email.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleDeleteSchool = () => {
//     setSchools(schools.filter((school) => school.id !== schoolToDelete))
//     setDeleteDialogOpen(false)
//   }

//   const handleUpdateStatus = () => {
//     setSchools(
//       schools.map((school) => (school.id === schoolToUpdateStatus ? { ...school, status: newStatus } : school)),
//     )
//     setStatusDialogOpen(false)
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Active</Badge>
//       case "pending":
//         return <Badge className="bg-yellow-500">Pending</Badge>
//       case "inactive":
//         return <Badge className="bg-gray-500">Inactive</Badge>
//       default:
//         return <Badge>{status}</Badge>
//     }
//   }

//   return (
//     <AdminDashboardLayout>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Driving Schools</h1>
//         <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => router.push("/admin/schools/add")}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add School
//         </Button>
//       </div>

//       <Card className="mb-6">
//         <CardHeader className="pb-3">
//           <CardTitle>School Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search schools..."
//                 className="pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>City</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredSchools.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                       No schools found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredSchools.map((school) => (
//                     <TableRow key={school.id}>
//                       <TableCell className="font-medium">{school.name}</TableCell>
//                       <TableCell>{school.city}</TableCell>
//                       <TableCell>
//                         <div>{school.email}</div>
//                         <div className="text-sm text-muted-foreground">{school.phone}</div>
//                       </TableCell>
//                       <TableCell>{getStatusBadge(school.status)}</TableCell>
//                       <TableCell>{school.createdAt}</TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                               <span className="sr-only">Actions</span>
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => router.push(`/admin/schools/edit/${school.id}`)}>
//                               <Pencil className="mr-2 h-4 w-4" />
//                               Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => {
//                                 setSchoolToUpdateStatus(school.id)
//                                 setNewStatus(school.status)
//                                 setStatusDialogOpen(true)
//                               }}
//                             >
//                               <Check className="mr-2 h-4 w-4" />
//                               Change Status
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               className="text-red-600"
//                               onClick={() => {
//                                 setSchoolToDelete(school.id)
//                                 setDeleteDialogOpen(true)
//                               }}
//                             >
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete School</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this school? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteSchool}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Status Update Dialog */}
//       <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update School Status</DialogTitle>
//             <DialogDescription>Change the status of this driving school.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-3 gap-4">
//               <Button
//                 variant={newStatus === "active" ? "default" : "outline"}
//                 className={newStatus === "active" ? "bg-green-500 hover:bg-green-600" : ""}
//                 onClick={() => setNewStatus("active")}
//               >
//                 <Check className="mr-2 h-4 w-4" />
//                 Active
//               </Button>
//               <Button
//                 variant={newStatus === "pending" ? "default" : "outline"}
//                 className={newStatus === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
//                 onClick={() => setNewStatus("pending")}
//               >
//                 <Clock className="mr-2 h-4 w-4" />
//                 Pending
//               </Button>
//               <Button
//                 variant={newStatus === "inactive" ? "default" : "outline"}
//                 className={newStatus === "inactive" ? "bg-gray-500 hover:bg-gray-600" : ""}
//                 onClick={() => setNewStatus("inactive")}
//               >
//                 <X className="mr-2 h-4 w-4" />
//                 Inactive
//               </Button>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateStatus}>Update Status</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </AdminDashboardLayout>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import { adminAPI } from "@/lib/api";

export default function SchoolsPage() {
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [schoolToUpdateStatus, setSchoolToUpdateStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllSchools();
      setSchools(response.data || []);
    } catch (err) {
      console.error("Error fetching schools:", err);
      setError("Failed to load schools. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSchool = async () => {
    try {
      await adminAPI.deleteSchool(schoolToDelete);
      setSchools(schools.filter((school) => school._id !== schoolToDelete));
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting school:", err);
      setError("Failed to delete school. Please try again.");
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await adminAPI.updateSchoolStatus(schoolToUpdateStatus, newStatus);
      setSchools(
        schools.map((school) =>
          school._id === schoolToUpdateStatus
            ? { ...school, status: newStatus }
            : school
        )
      );
      setStatusDialogOpen(false);
    } catch (err) {
      console.error("Error updating school status:", err);
      setError("Failed to update school status. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status || "Unknown"}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Driving Schools</h1>
        <Button
          className="bg-rose-500 hover:bg-rose-600"
          onClick={() => router.push("/admin/schools/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>School Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search schools..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground">
                      No schools found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchools.map((school) => (
                    <TableRow key={school._id}>
                      <TableCell className="font-medium">
                        {school.name}
                      </TableCell>
                      <TableCell>{school.location?.city || "N/A"}</TableCell>
                      <TableCell>
                        <div>{school.email || "N/A"}</div>
                        <div className="text-sm text-muted-foreground">
                          {school.phone || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(school.status)}</TableCell>
                      <TableCell>
                        {new Date(school.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/admin/schools/edit/${school._id}`)
                              }>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSchoolToUpdateStatus(school._id);
                                setNewStatus(school.status || "pending");
                                setStatusDialogOpen(true);
                              }}>
                              <Check className="mr-2 h-4 w-4" />
                              Change Status
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSchoolToDelete(school._id);
                                setDeleteDialogOpen(true);
                              }}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete School</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this school? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchool}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update School Status</DialogTitle>
            <DialogDescription>
              Change the status of this driving school.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={newStatus === "active" ? "default" : "outline"}
                className={
                  newStatus === "active"
                    ? "bg-green-500 hover:bg-green-600"
                    : ""
                }
                onClick={() => setNewStatus("active")}>
                <Check className="mr-2 h-4 w-4" />
                Active
              </Button>
              <Button
                variant={newStatus === "pending" ? "default" : "outline"}
                className={
                  newStatus === "pending"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : ""
                }
                onClick={() => setNewStatus("pending")}>
                <Clock className="mr-2 h-4 w-4" />
                Pending
              </Button>
              <Button
                variant={newStatus === "inactive" ? "default" : "outline"}
                className={
                  newStatus === "inactive"
                    ? "bg-gray-500 hover:bg-gray-600"
                    : ""
                }
                onClick={() => setNewStatus("inactive")}>
                <X className="mr-2 h-4 w-4" />
                Inactive
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
