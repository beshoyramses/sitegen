"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWebsiteById, fetchPagesForWebsite } from "@/lib/firebase";
import AddPageModal from "@/components/AddPageModal"; // Import the modal component
import { useRouter } from "next/navigation";

// Define the type for website
interface Website {
  id: string;
  name: string;
  domain?: string;
  [key: string]: any; // Adjust according to the structure of the website data
}

interface Page {
  id: string;
  title: string;
  desc?: string;
  imageUrl?: string;
}

const ManageWebsitePage = () => {
  const { websiteId } = useParams();
  const [website, setWebsite] = useState<Website | null>(null); // Update type
  const [pages, setPages] = useState<Page[]>([]); // Define pages type
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    if (websiteId) {
      const loadWebsiteAndPages = async () => {
        setLoading(true); // Start loading

        try {
          const websiteData = await fetchWebsiteById(websiteId as string);
          setWebsite(websiteData as any); // Should now match the defined Website type

          const pagesData = await fetchPagesForWebsite(websiteId as string);
          setPages(pagesData as any);
        } catch (error) {
          console.error("Error loading website and pages:", error);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      loadWebsiteAndPages();
    }
  }, [websiteId, isModalOpen]);

  const handleAddPage = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-2 py-0 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                ></path>
              </svg>
              <p className="text-white mt-2">Loading...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 w-full">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center sm:text-left mb-4 sm:mb-0">
                Manage Website: {website?.name}
              </h1>
              <button
                onClick={handleAddPage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Add New Page
              </button>
            </div>

            {website && (
              <div className="bg-gray-900 hover:bg-gray-800 transition-all duration-200 p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-400 mb-2">
                    {website.name}
                  </h2>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-100">
                Pages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-100 truncate">
                        {page.title}
                      </h3>
                      <span className="text-sm text-gray-400">16 days ago</span>
                    </div>

                    {page.imageUrl ? (
                      <img
                        src={page.imageUrl}
                        alt={page.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-600 rounded-md flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {page.desc || "No description available."}
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/dashboard/websites/${websiteId}/editor/${page.id}`
                          );
                        }}
                      >
                        <span>Edit</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L8 9.172V13h3.828l6.586-6.586a2 2 0 000-2.828zM8 13H6v-2l6.586-6.586 2 2L8 13z"></path>
                        </svg>
                      </button>

                      <button
                        className="text-green-400 hover:text-red-300 flex items-center space-x-2"
                        onClick={() => {
                          router.push(`/${website.domain}/${page.id}`);
                        }}
                      >
                        <span>Visit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <AddPageModal websiteId={websiteId as string} onClose={closeModal} />
      )}
    </div>
  );
};

export default ManageWebsitePage;
