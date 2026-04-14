import Navbar from "@/components/Navbar";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Admin Paneli</h1>
          <p className="text-muted-foreground">Yakında burada olacak.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
