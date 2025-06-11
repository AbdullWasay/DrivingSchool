"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value?: any[];
  onChange: (files: any[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 2,
  placeholder = "Add photos of your facilities, vehicles, or instructors",
  description = "JPG or PNG (max. 5 photos, 2MB each)",
  className,
  disabled = false,
}: MultiImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [objectUrls]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && value.length < maxFiles) {
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

    if (disabled || value.length >= maxFiles) return;

    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleFileSelect = async (newFiles: File[]) => {
    setError(null);

    // Filter valid image files
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      setError("Please select image files");
      return;
    }

    // Check file sizes
    const oversizedFiles = imageFiles.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(`Some files are too large. Maximum size is ${maxSize}MB`);
      return;
    }

    // Check total count
    const totalFiles = value.length + imageFiles.length;
    if (totalFiles > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for multiple upload
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      console.log("Uploading", imageFiles.length, "files to backend");

      // Upload to Cloudinary via our API
      const response = await fetch(
        "http://localhost:5000/api/upload/multiple",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with status:", response.status);
        console.error("Error response:", errorText);
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log("Upload result:", result);

      if (result.success) {
        // Create file-like objects with Cloudinary data
        const uploadedFiles = result.data.map(
          (cloudinaryData: any, index: number) => ({
            ...imageFiles[index],
            cloudinaryUrl: cloudinaryData.url,
            cloudinaryPublicId: cloudinaryData.public_id,
          })
        );

        onChange([...value, ...uploadedFiles]);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      setError("Failed to upload files");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(Array.from(files));
      // Reset the input to allow selecting the same files again if needed
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    // Clean up object URL for removed file
    if (objectUrls[index]) {
      URL.revokeObjectURL(objectUrls[index]);
      const newObjectUrls = objectUrls.filter((_, i) => i !== index);
      setObjectUrls(newObjectUrls);
    }

    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (!disabled && value.length < maxFiles && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getImageUrl = (file: any, index: number) => {
    if (file.cloudinaryUrl) {
      return file.cloudinaryUrl;
    }
    if (file instanceof File) {
      // Check if we already have an object URL for this index
      if (objectUrls[index]) {
        return objectUrls[index];
      }
      // Create new object URL and store it
      const newObjectUrl = URL.createObjectURL(file);
      const newObjectUrls = [...objectUrls];
      newObjectUrls[index] = newObjectUrl;
      setObjectUrls(newObjectUrls);
      return newObjectUrl;
    }
    return file;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        multiple
        disabled={disabled}
      />

      {/* Uploaded Images Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative group">
              <div className="relative rounded-lg overflow-hidden border aspect-square">
                <img
                  src={getImageUrl(file, index)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(index)}
                    disabled={disabled || isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {file.name || `Image ${index + 1}`}
              </p>
            </div>
          ))}

          {/* Add More Button */}
          {value.length < maxFiles && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors",
                isDragOver
                  ? "border-rose-500 bg-rose-50"
                  : "border-muted-foreground/25",
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-rose-500 hover:bg-rose-50/50"
              )}
              onClick={openFileDialog}>
              {isUploading ? (
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
              ) : (
                <Plus className="h-6 w-6 text-muted-foreground" />
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {isUploading ? "Uploading..." : "Add More"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Upload Area (shown when no files or as main area) */}
      {value.length === 0 && (
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
            {isUploading ? "Uploading..." : "Choose Files"}
          </Button>
        </div>
      )}

      {/* File Count Info */}
      {value.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {value.length} of {maxFiles} files uploaded
          </span>
          {value.length < maxFiles && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openFileDialog}
              disabled={disabled || isUploading}>
              <Plus className="h-4 w-4 mr-1" />
              Add More
            </Button>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
