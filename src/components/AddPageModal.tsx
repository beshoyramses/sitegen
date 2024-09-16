import { createPage } from "@/lib/firebase";
import React, { useState } from "react";
import { uploadImageToStorage } from "@/lib/firebase"; // Import your upload function

interface AddPageModalProps {
  websiteId: string;
  onClose: () => void;
}

const AddPageModal: React.FC<AddPageModalProps> = ({ websiteId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // State to handle image file
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Preview image
  const [uploadProgress, setUploadProgress] = useState<number>(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState<boolean>(false); // State to indicate if uploading

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage)); // Show image preview
    }
  };

  const handleAddPage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      setIsUploading(true); // Start uploading

      // If an image is selected, handle the image upload here
      if (image) {
        imageUrl = await uploadImageToStorage(image, setUploadProgress); // Track progress
      }

      // Function to add a new page to Firebase
      await createPage(title, content, websiteId, imageUrl);
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error adding page:", error);
    } finally {
      setIsUploading(false); // End uploading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Add New Page</h2>
        <form onSubmit={handleAddPage}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Page Title (This will be the path)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
              placeholder="Page title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
              placeholder="Page description"
              rows={5}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Upload Page Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-gray-400"
              accept="image/*"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Uploading Image...</label>
              <div className="relative h-2 rounded-full bg-gray-600">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-gray-400">{Math.round(uploadProgress)}%</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Add Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPageModal;
