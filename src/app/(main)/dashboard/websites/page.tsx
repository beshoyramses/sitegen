"use client";

import React, { useEffect, useState } from "react";
import { fetchUserWebsites } from "@/lib/firebase"; // Import your Firebase function
import { useUser } from "@clerk/nextjs"; // Clerk to get user info
import { Button } from "@/components/ui/button";
import CreateWebsiteForm from "@/components/create-website-form";
import { useRouter } from "next/navigation";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CastIcon from '@mui/icons-material/Cast';

const ManageWebsitesPage = () => {
  const [websites, setWebsites] = useState([]);
  const { user } = useUser(); // Get the current user
  const router = useRouter();

  const [isFormOpen, setIsFormOpen] = useState(false); // Control the form visibility

  const handleAddWebsiteClick = () => {
    setIsFormOpen(true); // Open the form when "Add New Website" is clicked
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Close the form when the close button is clicked
  };

  // Fetch user websites on component mount
  useEffect(() => {
    const loadWebsites = async () => {
      if (user?.id) {
        try {
          const userWebsites = await fetchUserWebsites(user.id);
          setWebsites(userWebsites);
        } catch (error) {
          console.error("Failed to load websites:", error);
        }
      }
    };

    loadWebsites();
  }, [user?.id, isFormOpen]);

  return (
    <div className="min-h-screen p-2 py-0 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 w-full">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center sm:text-left mb-4 sm:mb-0">
            Manage Your Websites
          </h1>
          <Button
            onClick={handleAddWebsiteClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Add New Website
          </Button>
        </div>

        {isFormOpen && <CreateWebsiteForm onClose={handleCloseForm} />}

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {websites.map((website) => (
            <div
              key={website.id}
              className="bg-gray-900 hover:bg-gray-800 transition-all duration-200 p-6 rounded-lg shadow-lg"
            >
              {/* Website Image */}
              {website.imageUrl && (
                <div className="mb-4">
                  <img
                    src={website.imageUrl}
                    alt={website.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}

              {/* Website Information */}
              <div className="text-center">
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-indigo-400 mb-2 cursor-pointer"
                  onClick={() => {
                    router.push(`/dashboard/websites/${website.id}`);
                  }}
                >
                  {website.name}
                </h2>

                <div className="flex flex-col gap-2 mt-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-all"
                  onClick={() => {
                    router.push(`/dashboard/websites/${website.id}`);
                  }}
                >
                  <ManageHistoryIcon className="mr-2" /> Manage
                </button>
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-all"
                  onClick={() => {
                    router.push(`/${website.domain}`);
                  }}
                >
                  <CastIcon className="mr-2" /> Visit: {website.domain}
                </button>
              </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageWebsitesPage;
