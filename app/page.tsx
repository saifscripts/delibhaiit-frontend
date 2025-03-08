import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Course Management System</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Verify certificates and manage student records for our computer
          training center.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <Link href="/verify/example-id">
            <Button variant="outline" size="lg">
              Verify Certificate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
