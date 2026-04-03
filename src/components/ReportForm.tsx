import { useState, useRef } from "react";
import { Camera, Upload, X, MapPin, Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: "animal", label: "Injured Animal", icon: "🐾", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "garbage", label: "Garbage / Waste", icon: "🗑️", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { id: "drainage", label: "Drainage Issue", icon: "🌊", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "road", label: "Road Damage", icon: "🛣️", color: "bg-red-100 text-red-700 border-red-200" },
  { id: "other", label: "Other Civic Issue", icon: "⚠️", color: "bg-gray-100 text-gray-700 border-gray-200" },
];

const ReportForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to submit a report");
      navigate("/auth");
      return;
    }
    if (!image) return toast.error("Please upload a photo as proof");
    if (!category) return toast.error("Please select an issue category");
    if (!address.trim()) return toast.error("Please enter the location address");

    setSubmitting(true);

    try {
      const { data, error } = await supabase.from("reports").insert({
  category,
  address: address.trim(),
  description: description.trim() || null,
  image_url: image,
}).select("id").single();

      if (error) throw error;

      toast.success(`Report submitted! ID: ${data.id.slice(0, 8).toUpperCase()}`, { duration: 6000 });
      setImage(null);
      setCategory("");
      setAddress("");
      setDescription("");
      navigate("/track");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {!user && (
        <div className="bg-accent border border-border rounded-xl p-4 text-center">
          <p className="text-sm text-foreground">
            Please{" "}
            <button type="button" onClick={() => navigate("/auth")} className="text-primary font-semibold hover:underline">
              sign in
            </button>{" "}
            to submit reports.
          </p>
        </div>
      )}

      {/* Photo Upload */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          Upload Photo Evidence *
        </Label>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />

        {image ? (
          <div className="relative rounded-xl overflow-hidden border border-border shadow-sm group">
            <img src={image} alt="Uploaded evidence" className="w-full h-64 object-cover" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-foreground/70 text-background hover:bg-foreground transition-colors active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-colors active:scale-[0.98]"
          >
            <Upload className="h-8 w-8" />
            <span className="text-sm font-medium">Tap to take a photo or upload</span>
            <span className="text-xs">JPG, PNG up to 10MB</span>
          </button>
        )}
      </div>

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Issue Category *
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all active:scale-[0.97] ${
                category === cat.id
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <p className="text-xs font-medium mt-1.5 text-foreground">{cat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-3">
        <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Location Address *
        </Label>
        <Input
          id="address"
          placeholder="e.g. Near City Park, MG Road, Nagpur"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          maxLength={200}
          className="h-12"
        />
      </div>

      {/* Description */}
      <div className="space-y-3">
        <Label htmlFor="desc" className="text-base font-semibold">
          Additional Details (optional)
        </Label>
        <Textarea
          id="desc"
          placeholder="Describe the issue in detail — what you saw, urgency level, any landmarks nearby..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground text-right">{description.length}/500</p>
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full h-14 text-base gap-2" disabled={submitting || !user}>
        {submitting ? (
          <span className="animate-pulse">Submitting report…</span>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Report to NGO
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your report will be forwarded to the nearest registered NGO for immediate action.
      </p>
    </form>
  );
};

export default ReportForm;
