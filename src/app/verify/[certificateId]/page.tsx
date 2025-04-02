'use client';

import { useGetStudent } from '@/hooks/student.hook';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import Loading from './loading';

const course = {
  name: 'Basic Computer, Internet and Advance Microsoft Office Management',
  description:
    'Fundamental training in computer operation, internet usage, and advanced skills in Microsoft Office applications including Word, Excel, PowerPoint, and Outlook.',
  skills_acquired: [
    'Basic Computer Operation',
    'Internet and Email Management',
    'Microsoft Word (Advanced Document Formatting)',
    'Microsoft Excel (Data Analysis and Formulas)',
    'Microsoft PowerPoint (Professional Presentations)',
  ],
  projects: [
    {
      name: 'Professional Document Formatting',
      description:
        'Created a well-structured and formatted document in Microsoft Word, utilizing styles, headers, footers, table of contents, and mail merge.',
    },
    {
      name: 'Automated Financial Report',
      description:
        'Developed an Excel-based financial report using advanced formulas, pivot tables, and conditional formatting for data analysis and visualization.',
    },
    {
      name: 'Interactive Business Presentation',
      description:
        'Designed a professional PowerPoint presentation with animations, transitions, and multimedia elements for effective business communication.',
    },
  ],
};

export default function VerifyPage() {
  const { certificateId } = useParams() as { certificateId: string };
  const { student, isLoading } = useGetStudent(certificateId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Certificate Verification
          </h1>
          <p className="text-muted-foreground mt-2">
            Certificate ID: #{student?.certificateId}
          </p>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{student?.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Course</p>
                <p className="font-medium">{course?.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                {student?.startDate && (
                  <p className="font-medium">
                    {format(student?.startDate, 'PPP')}
                  </p>
                )}
              </div>
              <div>
                <p className="text-muted-foreground">Completion Date</p>
                {student?.completionDate && (
                  <p className="font-medium">
                    {format(student?.completionDate, 'PPP')}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Course Description</h3>
                <p className="text-muted-foreground">{course?.description}</p>
              </div>
              <div>
                <h3 className="font-medium">Skills Acquired</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {course?.skills_acquired?.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Projects Completed</h2>
            <div className="space-y-4">
              {course?.projects?.map((project) => (
                <div key={project.name}>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
