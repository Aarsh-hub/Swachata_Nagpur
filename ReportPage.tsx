import ReportForm from "@/components/ReportForm";

const ReportPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container">
        <div className="text-center mb-10 opacity-0 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Upload a photo, describe the problem, and we'll notify the nearest NGO.
          </p>
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <ReportForm />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
