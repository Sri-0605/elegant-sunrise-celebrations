
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import EventGallery from "./pages/EventGallery";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminServices from "./pages/admin/AdminServices";
import AdminSettings from "./pages/admin/AdminSettings";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />} />
            <Route path="booking" element={<Booking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:eventType" element={<EventGallery />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
