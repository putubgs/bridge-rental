"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageUploaderProps {
    error?: string;
    onFileChange: (file: File | null) => void;
    initialImage?: string;
  }
  
  export default function ImageUploader({ error, onFileChange, initialImage }: ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (initialImage) {
          setPreview(initialImage);
        }
      }, [initialImage]);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        onFileChange(selectedFile);
      }
    };
  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const selectedFile = e.dataTransfer.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        onFileChange(selectedFile);
      }
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    const removeFile = () => {

      setFile(null);
      setPreview(null);
      onFileChange(null);
    };
  
    return (
      <div className="flex h-full w-full flex-col gap-2">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={removeFile}
          className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
            file || preview ? "bg-cover bg-center" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
          style={
            preview
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: "cover",
                }
              : {}
          }
        >
          {file || preview ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center text-white opacity-0 transition-opacity hover:opacity-100">
              <p className="text-lg font-medium">Tap to Remove</p>
            </div>
          ) : (
            <>
              <Image
                src="/assets/img/file-uploader-icon.png"
                width={62}
                height={62}
                alt="Upload Icon"
              />
              <p className="text-[#BBBBBB]">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-[#5E8EFF]"
                >
                  Click to Upload
                </label>{" "}
                or drag and drop
              </p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  