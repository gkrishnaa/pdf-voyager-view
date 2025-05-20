
import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";
import PDFViewer from "@/components/PDFViewer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Revoke previous URL to prevent memory leaks
      if (url) URL.revokeObjectURL(url);
      
      // Create new URL for the PDF
      const fileUrl = URL.createObjectURL(file);
      setFile(file);
      setUrl(fileUrl);
      
      toast({
        title: "PDF Uploaded Successfully",
        description: `"${file.name}" is ready to view.`,
      });
    }
  };

  const handleRemoveFile = () => {
    if (url) URL.revokeObjectURL(url);
    setFile(null);
    setUrl(null);
    toast({
      title: "PDF Removed",
      description: "The PDF has been removed.",
    });
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            PDF Uploader & Viewer
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Upload your PDF document and view it directly in your browser
          </p>

          {!file ? (
            <PDFUploader onFileChange={handleFileChange} />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="truncate">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
              
              <PDFViewer url={url} filename={file.name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
