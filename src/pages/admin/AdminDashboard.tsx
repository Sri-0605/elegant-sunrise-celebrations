
import { Card } from "@/components/ui/card";
import { Motion } from "@/components/ui/motion";

const AdminDashboard = () => {
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white mb-4">
          Dashboard
        </h1>
        <p className="text-white/60">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <h3 className="font-semibold text-white mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-accent">0</p>
        </Card>
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <h3 className="font-semibold text-white mb-2">Pending Bookings</h3>
          <p className="text-3xl font-bold text-accent">0</p>
        </Card>
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <h3 className="font-semibold text-white mb-2">Total Services</h3>
          <p className="text-3xl font-bold text-accent">0</p>
        </Card>
      </div>
    </Motion>
  );
};

export default AdminDashboard;
