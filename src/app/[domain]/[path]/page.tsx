"use client";

import FunnelEditor from '@/app/(main)/dashboard/websites/[websiteId]/editor/_components/website-editor';
import { getPageByDomain } from '@/lib/firebase';
import EditorProvider from '@/providers/editor/editor-provider';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { path, domain } = useParams(); // Make sure `domain` is correctly passed in your routing.
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the page data from Firebase
        const data = await getPageByDomain(domain, path);
        if (data) {
          setPageData(data);
        } else {
          router.replace("/404"); // Redirect to a custom 404 page if no page data is found
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
        router.replace("/404"); // Redirect to 404 on fetch failure
      } finally {
        setLoading(false);
      }
    };

    if (domain && path) {
      fetchData();
    }
  }, [domain, path, router]);

  if (loading) return <div>Loading...</div>;

  if (!pageData) return <div>Page not found</div>;

  // `websiteId` should be extracted from `pageData` after fetching
  const websiteId = pageData.websiteId; // Assuming pageData contains a `websiteId` field

  return (
    <EditorProvider
      pageDetails={pageData}
      funnelId={websiteId} // Assuming this is `websiteId` you intend to pass
    >
      <FunnelEditor
        websiteId={websiteId}
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  );
};

export default Page;
