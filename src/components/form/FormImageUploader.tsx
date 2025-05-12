'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface IFormImageUploaderProps {
  name: string;
  label: string;
  width?: number;
  height?: number;
  imageSize?: string;
}

export default function FormImageUploader({
  name,
  label,
  width = 150,
  height = 180,
  imageSize = '150x180',
}: IFormImageUploaderProps) {
  const form = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const value = form.watch(name);

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    form.setValue(name, null);
    setPreview(null);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              className="relative"
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <label
                htmlFor={name}
                className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer relative bg-gray-50 hover:bg-gray-100 h-full w-full`}
              >
                <Input
                  id={name}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {preview ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={width}
                      height={height}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                      {label}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">{imageSize}</p>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                      {label}
                    </div>
                  </div>
                )}
              </label>
              {preview && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={handleDelete}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
