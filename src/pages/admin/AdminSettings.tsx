
import { Motion } from "@/components/ui/motion";

const AdminSettings = () => {
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white mb-4">
          Settings
        </h1>
        <p className="text-white/60">Manage your admin settings</p>
      </div>
    </Motion>
  );
};

export default AdminSettings;
