// "use client"

// import { Building2, User, Users } from "lucide-react"
// import Link from "next/link"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"

// export default function AdminDashboardPage() {
//   // Mock statistics
//   const stats = [
//     {
//       name: "Total Schools",
//       value: "24",
//       description: "8 pending approval",
//       icon: Building2,
//       color: "text-blue-500",
//       link: "/admin/schools",
//     },
//     {
//       name: "Total Users",
//       value: "1,234",
//       description: "152 new this month",
//       icon: Users,
//       color: "text-green-500",
//       link: "/admin/users",
//     },
//     {
//       name: "Active Students",
//       value: "892",
//       description: "↑ 14% from last month",
//       icon: User,
//       color: "text-amber-500",
//       link: "/admin/users",
//     },
//     {
//       name: "School Owners",
//       value: "42",
//       description: "3 new this week",
//       icon: Building2,
//       color: "text-purple-500",
//       link: "/admin/schools",
//     },
//   ]

//   return (
//     <AdminDashboardLayout>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <p className="text-muted-foreground">Welcome to the Fahrschulfinder admin panel</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.name}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
//               <stat.icon className={`h-5 w-5 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">{stat.description}</p>
//               <Link href={stat.link} className="text-xs text-rose-500 hover:text-rose-600 mt-2 inline-block">
//                 View details →
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 mt-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Schools</CardTitle>
//             <CardDescription>Latest driving schools registered on the platform</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { name: "Fahrschule Express", city: "Munich", date: "2023-11-28", status: "Active" },
//                 { name: "Drive Easy", city: "Berlin", date: "2023-11-25", status: "Pending" },
//                 { name: "City Fahrschule", city: "Hamburg", date: "2023-11-22", status: "Active" },
//                 { name: "Premium Fahrschule", city: "Frankfurt", date: "2023-11-20", status: "Active" },
//               ].map((school) => (
//                 <div key={school.name} className="flex items-center justify-between py-2">
//                   <div>
//                     <div className="font-medium">{school.name}</div>
//                     <div className="text-sm text-muted-foreground">{school.city}</div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="text-sm text-muted-foreground">{school.date}</div>
//                     <div
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         school.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {school.status}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Link href="/admin/schools" className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
//               View all schools →
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Users</CardTitle>
//             <CardDescription>Latest users registered on the platform</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { name: "Max Mustermann", email: "max@example.com", date: "2023-11-28", role: "Student" },
//                 { name: "Anna Schmidt", email: "anna@example.com", date: "2023-11-27", role: "Student" },
//                 { name: "Thomas Weber", email: "thomas@example.com", date: "2023-11-26", role: "School Owner" },
//                 { name: "Julia Fischer", email: "julia@example.com", date: "2023-11-25", role: "Student" },
//               ].map((user) => (
//                 <div key={user.name} className="flex items-center justify-between py-2">
//                   <div>
//                     <div className="font-medium">{user.name}</div>
//                     <div className="text-sm text-muted-foreground">{user.email}</div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="text-sm text-muted-foreground">{user.date}</div>
//                     <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">{user.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Link href="/admin/users" className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
//               View all users →
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </AdminDashboardLayout>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { Building2, User, Users, Loader2 } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import { adminAPI } from "@/lib/api";
import { translations } from "@/lib/translations";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await adminAPI.getStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError(
          "Fehler beim Laden der Dashboard-Daten. Bitte versuchen Sie es später erneut."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      </AdminDashboardLayout>
    );
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </AdminDashboardLayout>
    );
  }

  // Default stats in case API doesn't return expected format
  const dashboardStats = [
    {
      name: translations.admin.totalSchools,
      value: stats?.schools || 0,
      description: translations.admin.drivingSchools,
      icon: Building2,
      color: "text-blue-500",
      link: "/admin/schools",
    },
    {
      name: translations.admin.totalUsers,
      value: stats?.users || 0,
      description: translations.admin.registeredUsers,
      icon: Users,
      color: "text-green-500",
      link: "/admin/users",
    },
    {
      name: translations.admin.reviews,
      value: stats?.reviews || 0,
      description: translations.admin.totalReviews,
      icon: User,
      color: "text-amber-500",
      link: "/admin/reviews",
    },
    {
      name: translations.admin.schoolOwners,
      value: stats?.schoolOwners || 0,
      description: translations.admin.registeredSchoolOwners,
      icon: Building2,
      color: "text-purple-500",
      link: "/admin/schools",
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">{translations.admin.title}</h1>
        <p className="text-muted-foreground">
          {translations.admin.welcome}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <Link
                href={stat.link}
                className="text-xs text-rose-500 hover:text-rose-600 mt-2 inline-block">
                View details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Rated Schools</CardTitle>
            <CardDescription>
              Highest rated driving schools on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.topSchools?.length > 0 ? (
                stats.topSchools.map((school) => (
                  <div
                    key={school._id}
                    className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{school.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Rating: {school.averageRating?.toFixed(1) || "N/A"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No schools found
                </div>
              )}
            </div>
            <Link
              href="/admin/schools"
              className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
              View all schools →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Reviews</CardTitle>
            <CardDescription>
              Recent reviews submitted on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.latestReviews?.length > 0 ? (
                stats.latestReviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{review.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.user?.name} on {review.school?.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {review.rating}/5
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No reviews found
                </div>
              )}
            </div>
            <Link
              href="/admin/reviews"
              className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
              View all reviews →
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
