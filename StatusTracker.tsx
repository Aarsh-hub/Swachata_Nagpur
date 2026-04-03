import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Eye, Wrench, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const STAGES = [
  { key: "reported", label: "Reported", icon: Clock, description: "Complaint submitted" },
  { key: "in_progress", label: "In Progress", icon: Wrench, description: "Team dispatched" },
  { key: "resolved", label: "Resolved", icon: CheckCircle2, description: "Issue resolved" },
];

const STATUS_INDEX: Record<string, number> = { reported: 0, in_progress: 1, resolved: 2 };

const CATEGORY_LABELS: Record<string, string> = {
  animal: "🐾 Injured Animal",
  garbage: "🗑️ Garbage / Waste",
  drainage: "🌊 Drainage Issue",
  road: "🛣️ Road Damage",
  other: "⚠️ Other Civic Issue",
};

interface Report {
  id: string;
  category: string;
  address: string;
  status: string;
  created_at: string;
}

const StatusTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("id, category, address, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-display font-bold text-foreground">Track Your Reports</h2>
        <p className="text-muted-foreground">
          Please{" "}
          <button onClick={() => navigate("/auth")} className="text-primary font-semibold hover:underline">
            sign in
          </button>{" "}
          to view your reports.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">Track Your Reports</h2>
        <p className="text-muted-foreground text-sm">View the progress of your submitted complaints below.</p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No reports yet. Submit your first report!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => {
            const statusIdx = STATUS_INDEX[report.status] ?? 0;
            return (
              <div key={report.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{report.id.slice(0, 8).toUpperCase()}</p>
                    <p className="font-semibold text-foreground mt-0.5">{CATEGORY_LABELS[report.category] || report.category}</p>
                    <p className="text-sm text-muted-foreground">{report.address}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(report.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-0">
                  {STAGES.map((stage, i) => {
                    const active = i <= statusIdx;
                    const current = i === statusIdx;
                    return (
                      <div key={stage.key} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              active
                                ? current
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <stage.icon className="h-4 w-4" />
                          </div>
                          <span className={`text-[10px] mt-1.5 font-medium text-center leading-tight ${active ? "text-foreground" : "text-muted-foreground"}`}>
                            {stage.label}
                          </span>
                        </div>
                        {i < STAGES.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 rounded-full ${i < statusIdx ? "bg-primary/40" : "bg-muted"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusTracker;
