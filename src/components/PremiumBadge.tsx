import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const PremiumBadge = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();

        setIsPremium(profile?.subscription_tier === "premium");
      } catch (error) {
        console.error("Error checking premium status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPremiumStatus();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkPremiumStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading || !isPremium) return null;

  return (
    <Badge 
      variant="secondary" 
      className="bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-slow px-3 py-1"
    >
      <Star className="h-3 w-3 mr-1 fill-current" />
      Premium
    </Badge>
  );
};

export default PremiumBadge;
