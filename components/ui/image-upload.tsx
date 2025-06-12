"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
  description?: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  uploadType?: "profile" | "logo" | "document" | "general";
}

export function ImageUpload({
  value,
  onChange,
  accept = "image/*",
  maxSize = 2,
  placeholder = "Drag and drop your image here",
  description = "PNG, JPG or SVG (max. 2MB)",
  className,
  multiple = false,
  disabled = false,
  uploadType = "general",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith("image/") && accept === "image/*") {
      setError("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", uploadType);

      // Upload to Cloudinary via our API
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${API_URL}/upload/single`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      if (result.success) {
        // Store the Cloudinary URL
        setUploadedUrl(result.data.url);

        // Create a file-like object with Cloudinary data
        const uploadedFile = {
          ...file,
          cloudinaryUrl: result.data.url,
          cloudinaryPublicId: result.data.public_id,
        } as any;

        onChange(uploadedFile);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      setError("Failed to upload file");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setUploadedUrl(null);

    // Clean up object URL
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFilePreview = () => {
    if (uploadedUrl) {
      return uploadedUrl;
    }
    if (value instanceof File) {
      // Clean up previous object URL
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      // Create new object URL
      const newObjectUrl = URL.createObjectURL(value);
      setObjectUrl(newObjectUrl);
      return newObjectUrl;
    }
    if (typeof value === "string") {
      return value;
    }
    return null;
  };

  const getFileName = () => {
    if (value instanceof File) {
      return value.name;
    }
    if (typeof value === "string") {
      return value.split("/").pop() || "Uploaded file";
    }
    return null;
  };

  const preview = getFilePreview();
  const fileName = getFileName();

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        multiple={multiple}
        disabled={disabled}
      />

      {value || uploadedUrl ? (
        <div className="relative">
          {preview && accept === "image/*" ? (
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={openFileDialog}
                    disabled={disabled || isUploading}>
                    <Upload className="h-4 w-4 mr-1" />
                    Change
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={handleRemove}
                    disabled={disabled || isUploading}>
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={openFileDialog}
                  disabled={disabled || isUploading}>
                  Change
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  disabled={disabled || isUploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragOver
              ? "border-rose-500 bg-rose-50"
              : "border-muted-foreground/25",
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-rose-500 hover:bg-rose-50/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}>
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          )}
          <p className="text-sm text-muted-foreground mb-1">
            {isUploading ? "Uploading to Cloudinary..." : placeholder}
          </p>
          <p className="text-xs text-muted-foreground mb-4">{description}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || isUploading}>
            {isUploading ? "Uploading..." : "Choose File"}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
