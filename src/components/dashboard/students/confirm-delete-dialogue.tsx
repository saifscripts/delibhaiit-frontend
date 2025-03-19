import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteStudent } from '@/hooks/student.hook';
import { Trash2 } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  studentName: string;
  studentId: string;
  certificateId: string;
}

export function ConfirmDeleteDialog({
  studentName,
  studentId,
  certificateId,
}: ConfirmDeleteDialogProps) {
  const {
    isDialogOpen,
    setIsDialogOpen,
    mutate: deleteStudent,
    isPending,
  } = useDeleteStudent();

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Student Profile</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p className="font-medium text-foreground">
              Student:{' '}
              <span className="text-muted-foreground">{studentName}</span>
            </p>
            <p className="font-medium text-foreground">
              Certificate ID:{' '}
              <span className="text-muted-foreground">{certificateId}</span>
            </p>
            <p className="mt-4">
              This action cannot be undone. This will permanently delete the
              profile and remove all associated data from our servers.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteStudent(studentId);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            Delete Profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
