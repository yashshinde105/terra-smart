import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageTransition } from "./ui/page-transition";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;