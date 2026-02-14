import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  hideSidebar?: boolean;
}

const PageLayout = ({ children, breadcrumbs, title, subtitle, hideSidebar = false }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumbs */}
      {breadcrumbs && (
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-xs sm:text-sm overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2 whitespace-nowrap">
                  {crumb.href ? (
                    <a href={crumb.href} className="text-primary hover:underline">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-muted-foreground">›</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-secondary-foreground/80 mt-1 text-sm sm:text-base">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className={`grid grid-cols-1 ${hideSidebar ? '' : 'lg:grid-cols-3'} gap-6 lg:gap-8`}>
            {/* Main Content Area */}
            <div className={`${hideSidebar ? 'w-full' : 'lg:col-span-2'} order-1`}>
              {children}
            </div>

            {/* Sidebar */}
            {!hideSidebar && (
              <div className="lg:col-span-1 order-2">
                <Sidebar />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
