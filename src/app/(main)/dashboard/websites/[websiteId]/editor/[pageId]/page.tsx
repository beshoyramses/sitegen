'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EditorProvider from '@/providers/editor/editor-provider';
import FunnelEditorNavigation from '../_components/funnel-editor-navigation';
import FunnelEditorSidebar from '../_components/editor-sidebar';
import FunnelEditor from '../_components/website-editor';
import { getPage } from '@/lib/firebase';

// Define the interface for the funnel page details
interface FunnelPageDetails {
  id: string;
  content?: string; // Optional property, add other properties as needed
}

// Define the type for the page component props
interface PageProps {
  params: {
    subaccountId: string;
    [key: string]: any; // Add more keys if necessary
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { websiteId, pageId } = useParams();

  // Ensure websiteId and pageId are strings (handle cases where they may be arrays)
  const parsedWebsiteId = Array.isArray(websiteId) ? websiteId[0] : websiteId;
  const parsedPageId = Array.isArray(pageId) ? pageId[0] : pageId;

  const [funnelPageDetails, setFunnelPageDetails] = useState<FunnelPageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const pageData = await getPage(parsedWebsiteId, parsedPageId);
        setFunnelPageDetails(pageData as FunnelPageDetails); // Ensure pageData is of type FunnelPageDetails
      } catch (err) {
        console.error('Failed to fetch page details:', err);
        setError('Failed to load page details.');
      } finally {
        setLoading(false);
      }
    };

    if (parsedWebsiteId && parsedPageId) {
      fetchPageDetails();
    }
  }, [parsedWebsiteId, parsedPageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden hide-scroll">
      {funnelPageDetails && (
        <EditorProvider funnelId={parsedWebsiteId} pageDetails={funnelPageDetails}>
          <FunnelEditorNavigation
            funnelId={parsedWebsiteId}
            funnelPageDetails={funnelPageDetails}
          />
          <div className="h-full flex justify-center">
            <FunnelEditor funnelPageId={parsedPageId} websiteId={parsedWebsiteId} />
          </div>
          <FunnelEditorSidebar subaccountId={params.subaccountId} />
        </EditorProvider>
      )}
    </div>
  );
};

export default Page;
