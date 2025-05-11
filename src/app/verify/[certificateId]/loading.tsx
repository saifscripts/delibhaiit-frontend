'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Award, Book, User } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <Award className="h-12 w-12 text-primary/40 mr-3" />
            <Skeleton className="h-10 w-64" />
          </div>

          <div className="flex items-center justify-center">
            <Skeleton className="h-6 w-40" />
          </div>

          <Skeleton className="h-6 w-52 mt-3 mx-auto" />
        </div>

        <div className="space-y-8">
          <Card className="overflow-hidden border-t-4 border-t-primary/30 shadow-md">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                <Skeleton className="h-7 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  <Skeleton className="w-[180px] h-[220px] mx-auto lg:mx-0 rounded-lg" />
                </div>
                <div className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-t-4 border-t-chart-2/30">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <Book className="h-5 w-5 mr-2 text-muted-foreground" />
                <Skeleton className="h-7 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="h-px bg-border w-full my-4" />

                <div>
                  <Skeleton className="h-6 w-32 mb-3" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="h-5 w-5 mt-0.5 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-t-4 border-t-chart-4/30">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                <Skeleton className="h-7 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/10 p-5 rounded-lg border border-border"
                  >
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
      </div>
    </div>
  );
}
