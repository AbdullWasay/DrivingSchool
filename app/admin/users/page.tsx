// "use client"

// import { useState } from "react"
// import { Search, MoreHorizontal, Trash2 } from "lucide-react"

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

// // Mock data for users
// const initialUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "student",
//     status: "active",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "student",
//     status: "active",
//     createdAt: "2023-02-20",
//   },
//   {
//     id: 3,
//     name: "Michael Johnson",
//     email: "michael.johnson@example.com",
//     role: "student",
//     status: "inactive",
//     createdAt: "2023-03-10",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     email: "emily.davis@example.com",
//     role: "admin",
//     status: "active",
//     createdAt: "2023-01-05",
//   },
//   {
//     id: 5,
//     name: "Robert Wilson",
//     email: "robert.wilson@example.com",
//     role: "school_admin",
//     status: "active",
//     createdAt: "2023-04-12",
//   },
// ]

// export default function UsersPage() {
//   const [users, setUsers] = useState(initialUsers)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [userToDelete, setUserToDelete] = useState(null)

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleDeleteUser = () => {
//     setUsers(users.filter((user) => user.id !== userToDelete))
//     setDeleteDialogOpen(false)
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Active</Badge>
//       case "inactive":
//         return <Badge className="bg-gray-500">Inactive</Badge>
//       default:
//         return <Badge>{status}</Badge>
//     }
//   }

//   const getRoleBadge = (role) => {
//     switch (role) {
//       case "admin":
//         return <Badge className="bg-rose-500">Admin</Badge>
//       case "school_admin":
//         return <Badge className="bg-blue-500">School Admin</Badge>
//       case "student":
//         return <Badge className="bg-yellow-500">Student</Badge>
//       default:
//         return <Badge>{role}</Badge>
//     }
//   }

//   return (
//     <AdminDashboardLayout>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Users</h1>
//       </div>

//       <Card className="mb-6">
//         <CardHeader className="pb-3">
//           <CardTitle>User Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search users..."
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
//                   <TableHead>Email</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                       No users found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">{user.name}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{getRoleBadge(user.role)}</TableCell>
//                       <TableCell>{getStatusBadge(user.status)}</TableCell>
//                       <TableCell>{user.createdAt}</TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                               <span className="sr-only">Actions</span>
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem
//                               className="text-red-600"
//                               onClick={() => {
//                                 setUserToDelete(user.id)
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
//             <DialogTitle>Delete User</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this user? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteUser}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </AdminDashboardLayout>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { Search, MoreHorizontal, Trash2, Loader2 } from "lucide-react";

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

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async () => {
    try {
      await adminAPI.deleteUser(userToDelete);
      setUsers(users.filter((user) => user._id !== userToDelete));
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status || "Active"}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-rose-500">Admin</Badge>;
      case "school":
        return <Badge className="bg-blue-500">School Admin</Badge>;
      case "user":
        return <Badge className="bg-yellow-500">Student</Badge>;
      default:
        return <Badge>{role || "User"}</Badge>;
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
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
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
                              className="text-red-600"
                              onClick={() => {
                                setUserToDelete(user._id);
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
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
