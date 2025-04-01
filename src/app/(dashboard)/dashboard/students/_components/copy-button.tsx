'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CopyButton({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, [isCopied]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-green-400 hover:text-green-500 hover:bg-green-500/10"
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast.success('Link Copied Successfully!');
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </Button>
  );
}
