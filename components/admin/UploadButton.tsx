"use client";

import { useRef, useState } from "react";

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0 MB";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 100 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

type UploadButtonProps = {
  onUploaded: (urls: string[]) => void;
  label?: string;
  helperText?: string;
  multiple?: boolean;
  maxFiles?: number;
};

export default function UploadButton({
  onUploaded,
  label = "Upload images",
  helperText,
  multiple = false,
  maxFiles = 12,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePick = () => inputRef.current?.click();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, maxFiles);
    event.target.value = "";
    if (!files.length) return;

    setIsUploading(true);
    setError(null);
    setStatus(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`);

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(payload?.error || `Failed to upload ${file.name}`);
        }
        if (payload?.url) uploadedUrls.push(payload.url);
      }

      if (!uploadedUrls.length) {
        throw new Error("Upload finished without a valid file URL.");
      }

      onUploaded(uploadedUrls);
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      setStatus(`${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} uploaded • ${formatBytes(totalSize)}`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
      setStatus(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handlePick}
        disabled={isUploading}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isUploading ? "Uploading..." : label}</span>
      </button>

      {helperText ? <p className="text-xs text-white/45">{helperText}</p> : null}
      {status ? <p className="text-xs text-emerald-300">{status}</p> : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
