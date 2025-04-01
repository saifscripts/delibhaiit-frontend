import { Button } from '@/components/ui/button';
import { IStudent } from '@/types';
import { format } from 'date-fns';
import { QrCodeIcon } from 'lucide-react';
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
        size={1000}
        ref={qrRef}
        className="hidden"
        marginSize={1}
        title={student.name}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:text-blue-500 hover:bg-blue-500/10"
        onClick={handleDownload}
      >
        <QrCodeIcon className="size-4" />
      </Button>
    </>
  );
}
