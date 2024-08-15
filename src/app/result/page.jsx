"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import MainHeader from "@/components/ui/MainHeader";
import { Button } from "@/components/ui/button";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        setloading(true);
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );

        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        toast({
          title: "Session server error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setloading(false);
      }
    };

    fetchCheckoutSession();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-hero flex items-center justify-center">
        <Loader2 className="size-10 mr-2 animate-spin text-accent" />
        <h6 className="sr-only">Loading...</h6>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full h-hero flex items-center justify-center">
        <h6>{error}</h6>
      </div>
    );
  }

  return (
    <div className="text-center mt-4">
      {session.payment_status === "paid" ? (
        <>
          <MainHeader>Thank You For your Purchase</MainHeader>
          <div className="mt-20">
            <h5>Session ID: {session_id}</h5>
            <h2>Your payment was successful!</h2>
            <h3>Your will recieve an email shortly with the order details</h3>
          </div>
        </>
      ) : (
        <>
          <MainHeader>Your Payment was not Seccessfull</MainHeader>
        </>
      )}
    </div>
  );
};

export default ResultPage;
