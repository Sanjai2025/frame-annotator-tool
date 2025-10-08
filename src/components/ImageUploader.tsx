import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelect: (files: FileList) => void;
}

export function ImageUploader({ onFilesSelect }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const commonDragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    onDragLeave: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files?.length > 0) {
        onFilesSelect(e.dataTransfer.files);
      }
    },
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Upload Your Frames</h1>
        <p className="text-muted-foreground mb-8">
          Select or drag & drop the image sequence you want to annotate.
        </p>
        <label
          htmlFor="file-upload"
          {...commonDragEvents}
          className={`relative block w-full border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary hover:bg-accent'
          }`}
        >
          <div className="flex flex-col items-center">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <span className="mt-4 text-lg font-medium text-foreground">
              Drag & Drop or <span className="text-primary">click to browse</span>
            </span>
            <span className="mt-1 text-sm text-muted-foreground">PNG, JPG, WEBP supported</span>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="sr-only"
            onChange={(e) => e.target.files?.length && onFilesSelect(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
