import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../components/data/authProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lift Workout",
  description: "Your Gym Partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white dark:bg-zinc-400 ${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
