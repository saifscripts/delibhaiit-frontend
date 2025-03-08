import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-[300px] mx-auto mb-4" />
          <Skeleton className="h-5 w-[200px] mx-auto" />
        </div>

        <div className="space-y-6">
          {/* Student Information Section */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-[180px] mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[80px] mb-2" />
                  <Skeleton className="h-5 w-[150px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Course Details Section */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-[140px] mb-4" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-[160px] mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
              <div>
                <Skeleton className="h-5 w-[140px] mb-2" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-[70%]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-[200px] mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-[220px] mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
