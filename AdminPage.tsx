import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  category: string;
  address: string;
  description: string | null;
  status: string;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  animal: "🐾 Injured Animal",
  garbage: "🗑️ Garbage / Waste",
  drainage: "🌊 Drainage Issue",
  road: "🛣️ Road Damage",
  other: "⚠️ Other Civic Issue",
};

const STATUS_OPTIONS = ["reported", "in_progress", "resolved"] as const;

const STATUS_COLORS: Record<string, string> = {
  reported: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const AdminPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) {
      navigate("/");
      return;
    }

    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("id, category, address, description, status, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [user, isAdmin, authLoading, navigate]);

  const updateStatus = async (reportId: string, newStatus: string) => {
    const { error } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", reportId);

    if (error) {
      toast.error("Failed to update status");
      return;
    }

    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
    toast.success(`Status updated to ${newStatus.replace("_", " ")}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all submitted reports and update their status.</p>
        </div>

        {reports.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No reports found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Address</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {report.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      {CATEGORY_LABELS[report.category] || report.category}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                      {report.address}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative inline-block">
                        <select
                          value={report.status}
                          onChange={(e) => updateStatus(report.id, e.target.value)}
                          className={`appearance-none cursor-pointer rounded-full px-3 py-1 pr-7 text-xs font-semibold border-0 focus:ring-2 focus:ring-primary/30 ${STATUS_COLORS[report.status] || ""}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPage;
