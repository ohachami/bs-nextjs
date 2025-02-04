'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, PlusIcon, Trash2 } from 'lucide-react';

interface FileUploadProps {
  uploadBtnText?: string;
  uploadBtnIcon?: React.ReactNode;
  acceptedFileFormats?: string;
  file: File | null;
  onFileUpload?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  uploadBtnText = 'Télécharger le fichier canva',
  uploadBtnIcon = <PlusIcon />,
  acceptedFileFormats = 'xlsx',
  onFileUpload,
  file
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(file);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // on file uploaded
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // validate that it's an excel file
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file);
      onFileUpload?.(file);
    } else {
      alert('Please select only .xlsx files');
    }
  };

  // trigger file selection
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // remove selected file
  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={acceptedFileFormats}
        onChange={handleFileSelect}
      />
      <Button
        variant="outline"
        className="w-full h-12"
        onClick={handleFileUpload}
      >
        {uploadBtnIcon} {uploadBtnText}
      </Button>
      <div className="flex justify-between items-center py-1 px-4 bg-gray-50 border border-[#E2E8F0] rounded-lg">
        <div className="flex justify-start items-center gap-3">
          <FileText size={20} />
          {selectedFile ? (
            <p className="font-medium">{selectedFile.name}</p>
          ) : (
            <p className="font-normal text-sm">Aucun fichier séléctionner</p>
          )}
        </div>
        <div
          className="cursor-pointer hover:bg-red-100 p-2 rounded-lg"
          onClick={handleFileRemove}
        >
          <Trash2 size={20} color="#db5a67" />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
