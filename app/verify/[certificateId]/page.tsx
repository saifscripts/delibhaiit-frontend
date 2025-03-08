import { getStudent } from '@/services/student.service';
import { Student } from '@/types';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BASE_URL}/api/v1/students`, {
    next: { tags: ['students'] },
  });
  const { data: students } = await res.json();

  console.log({ students });

  return students.map((student: Student) => ({
    certificateId: student.certificateId,
  }));
}

export default async function VerifyPage({
  params,
}: {
  params: { certificateId: string };
}) {
  const { data: student } = await getStudent(params.certificateId);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Certificate Verification
          </h1>
          <p className="text-muted-foreground mt-2">
            Certificate ID: #{student.certificateId}
          </p>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Course</p>
                <p className="font-medium">Full Stack Development</p>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {format(student.startDate, 'PPP')}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Completion Date</p>
                <p className="font-medium">
                  {format(student.completionDate, 'PPP')}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Course Description</h3>
                <p className="text-muted-foreground">
                  Comprehensive training in modern web development technologies
                  including HTML, CSS, JavaScript, React, Node.js, and database
                  management.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Skills Acquired</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Frontend Development with React</li>
                  <li>Backend Development with Node.js</li>
                  <li>Database Management</li>
                  <li>API Development</li>
                  <li>Version Control with Git</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Projects Completed</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">E-commerce Platform</h3>
                <p className="text-muted-foreground">
                  Built a full-stack e-commerce platform with product
                  management, shopping cart, and payment integration.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Social Media Dashboard</h3>
                <p className="text-muted-foreground">
                  Developed a responsive dashboard for social media analytics
                  with real-time data visualization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
