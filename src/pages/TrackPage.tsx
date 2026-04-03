import StatusTracker from "@/components/StatusTracker";

const TrackPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container opacity-0 animate-fade-up">
        <StatusTracker />
      </div>
    </div>
  );
};

export default TrackPage;
