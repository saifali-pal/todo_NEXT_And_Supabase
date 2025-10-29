import SignupForm from "@/components/auth/SignupForm";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}