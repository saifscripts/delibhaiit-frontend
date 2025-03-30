import { DownloadIcon } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

export default function DownloadQRCode({
  certificateUrl,
  studentName,
}: {
  certificateUrl: string;
  studentName: string;
}) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = studentName.split(' ').join('_');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <QRCodeCanvas
        value={certificateUrl}
        size={200}
        ref={qrRef}
        className="hidden"
        includeMargin
        marginSize={1}
        title={studentName}
      />
      <DownloadIcon
        className="size-5 cursor-pointer hover:text-blue-800"
        onClick={() => handleDownload()}
      />
    </>
  );
}
