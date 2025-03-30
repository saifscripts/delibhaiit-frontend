import { IStudent } from '@/types';
import { format } from 'date-fns';
import { DownloadIcon } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

export default function DownloadQRCode({ student }: { student: IStudent }) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${student.name} ${student.certificateId} ${format(
        student.startDate,
        'PPP'
      )}`
        .split(',')
        .join('')
        .split(' ')
        .join('_');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <QRCodeCanvas
        value={`${window.location.origin}/verify/${student.certificateId}`}
        size={200}
        ref={qrRef}
        className="hidden"
        includeMargin
        marginSize={1}
        title={student.name}
      />
      <DownloadIcon
        className="size-5 cursor-pointer hover:text-blue-800"
        onClick={() => handleDownload()}
      />
    </>
  );
}
