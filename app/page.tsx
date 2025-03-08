'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const certificateId = formData.get('certificateId') as string;

    if (certificateId.trim()) {
      router.push(`/verify/${certificateId.trim()}`);
      setOpen(false);
    }
  };

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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg">
                Verify Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="certificateId"
                    className="block text-sm font-medium mb-2"
                  >
                    Certificate ID
                  </label>
                  <Input
                    id="certificateId"
                    name="certificateId"
                    placeholder="Enter Certificate ID"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Verify
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
