import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface FileUploadProps {
  onFileSelect: (base64: string) => void;
  isFieldError?: boolean;
}

export default function FileUpload({
  onFileSelect,
  isFieldError = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };

  const transformToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (isImageFile(file)) {
      setFile(file);
      setError(null);
      try {
        const base64 = await transformToBase64(file);
        onFileSelect(base64);
      } catch (error) {
        setError("Error processing the image. Please try again.");
      }
    } else {
      setError("Please upload an image file.");
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`h-full cursor-pointer rounded-lg border text-center transition-colors ${
        isDragging && "border-primary-variant-3 bg-primary-variant-1"
      } ${isFieldError ? "border-red-600" : "border-[#B2B2B2] bg-white hover:border-black"}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
        accept="image/*"
        name="file"
      />
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/assets/img/file-upload.png"
          alt="Upload"
          width={64}
          height={64}
          className="mb-4"
        />
        <p className="mb-2 text-[#ACACAC]">Passport/ID Card</p>
        <div className="text-sm text-[#BBBBBB]">
          {file ? (
            file.name
          ) : (
            <p>
              <span className="text-primary-variant-3">Click to upload</span> or
              drag and drop an image
            </p>
          )}
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
