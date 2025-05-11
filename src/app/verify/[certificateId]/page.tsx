'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetStudent } from '@/hooks/student.hook';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Award, Book, Calendar, CheckCircle, User } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from './loading';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const course = {
  name: 'Basic Computer, Internet and Advance Microsoft Office Management',
  description:
    'Fundamental training in computer operation, internet usage, and advanced skills in Microsoft Office applications including Word, Excel, and PowerPoint.',
  skills: [
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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={fadeIn} className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <Award className="h-10 sm:h-12 w-10 sm:w-12 text-primary mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-card-foreground">
              Certificate Verification
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Verified Certificate</span>
            </Badge>
          </div>

          <p className="text-muted-foreground mt-3 text-lg">
            Certificate ID:{' '}
            <span className="font-medium">#{student?.certificateId}</span>
          </p>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-8">
          <Card className="overflow-hidden border-t-4 border-t-primary shadow-md">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <User className="h-5 w-5 mr-2" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  {student?.photo && (
                    <div className="w-[180px] h-[220px] relative mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-md border-2 border-muted">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground text-sm">Full Name</p>
                      <p className="font-semibold text-xl">{student?.name}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground text-sm">Program</p>
                      <p className="font-semibold text-xl">{course?.name}</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                          Start Date
                        </p>
                      </div>
                      {student?.startDate && (
                        <p className="font-medium">
                          {format(student?.startDate, 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                          Completion Date
                        </p>
                      </div>
                      {student?.completionDate && (
                        <p className="font-medium">
                          {format(student?.completionDate, 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-t-4 border-t-chart-2">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <Book className="h-5 w-5 mr-2" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Course Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course?.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-lg mb-3">Skills Acquired</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                    {course?.skills?.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-card-foreground">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-t-4 border-t-chart-4">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center text-2xl">
                <Award className="h-5 w-5 mr-2" />
                Projects Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {course?.projects?.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-muted/20 p-5 rounded-lg border border-border hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="font-medium text-lg mb-2 text-primary">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            This certificate was issued on{' '}
            {student?.createdAt && format(student?.createdAt, 'MMMM d, yyyy')}{' '}
            and is verified as authentic by our secure certification system.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
