"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchWebsiteByDomain } from '@/lib/firebase'; // Function to fetch data by domain
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useRouter } from "next/navigation"; // For navigation

const Page = () => {
  const { domain } = useParams() as { domain: any }; // Cast to any to avoid type error
  const [websiteData, setWebsiteData] = useState<any>(null); // Use any type for state
  const router = useRouter();

  useEffect(() => {
    const getWebsiteData = async () => {
      if (domain) {
        try {
          const website = await fetchWebsiteByDomain(domain as any); // Cast to any
          setWebsiteData(website);
        } catch (error) {
          console.error("Failed to fetch website data:", error);
        }
      }
    };

    getWebsiteData();
  }, [domain]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      <div className="max-w-4xl w-full mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Website Page</h1>
        <p className="text-lg mb-6 text-center">
          <span className="font-bold text-indigo-400">Domain:</span> {domain}
        </p>

        {websiteData ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-2">{websiteData.name}</h2>
            <p className="text-lg mb-4">{websiteData.desc}</p>
            <p className="mb-6">
              This is your website. If you want to go to a specific page, visit: <span className="font-bold text-indigo-400">/{domain}/your-page-name</span> Or create a Page from the
            </p>
            <Button
              onClick={() => router.push('/dashboard/websites')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Dashboard
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">Loading website data...</p>
            <p>
              If you haven't created a website yet, please create one from the 
              <Button
                onClick={() => router.push('/dashboard/websites')}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-2 rounded-md transition duration-200"
              >
                Dashboard
              </Button>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
