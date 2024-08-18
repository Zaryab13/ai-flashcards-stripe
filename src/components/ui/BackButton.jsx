import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="absolute rounded-full top-1 left-4"
      size="icon"
      variant="outline"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowBigLeft />
    </Button>
  );
};

export default BackButton;
