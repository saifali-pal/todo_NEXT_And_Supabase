"use client";

import SignupForm from "@/components/auth/SignupForm";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md p-6">
        <CardContent className="pt-6">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
