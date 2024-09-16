import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createWebsite } from "@/lib/firebase"; // Import the updated createWebsite function
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress"; // Custom Progress component
import { X } from "lucide-react"; // Close icon
import { useUser } from "@clerk/nextjs";

const CreateWebsiteForm = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const [progress, setProgress] = useState(0); // State to track the upload progress
  const userId = useUser().user.id;

  const onSubmit = async (data) => {
    const { websiteName, description, domain, websiteImg } = data;
    
    try {
      await createWebsite(userId, websiteName, description, domain, websiteImg, setProgress); 
      await onClose();
      
    } catch (error) {
      console.error("Error creating website:", error);
    }
  };

  return (
    // Overlay background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md text-black">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose} // Trigger close on click
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Create Website</h2>
        
        {/* Upload Progress Bar */}
        {progress > 0 && (
          <div className="mb-4">
            <Progress value={progress} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Website Name Input */}
          <div className="mb-4">
            <Input
              {...register("websiteName", { required: true })}
              placeholder="Website Name"
            />
          </div>
          
          {/* Description Textarea */}
          <div className="mb-4">
            <Textarea
              {...register("description", { required: true })}
              placeholder="Website Description"
            />
          </div>
          
          {/* Domain Input */}
          <div className="mb-4">
            <Input
              {...register("domain", { required: true })}
              placeholder="Website Domain"
            />
          </div>

          {/* File input for the website image */}
          <div className="mb-4">
            <input
              type="file"
              {...register("websiteImg", { required: true })}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-4 w-full">
            Create Website
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateWebsiteForm;
