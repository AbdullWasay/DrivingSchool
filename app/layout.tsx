import { AuthProvider } from "@/context/AuthContext";
import { SchoolAuthProvider } from "@/context/SchoolAuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SchoolAuthProvider>{children}</SchoolAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
