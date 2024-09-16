"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import FunnelEditorSidebar from "../_components/editor-sidebar";
import FunnelEditor from "../_components/website-editor";
import { getPage } from "@/lib/firebase";

const Page = ({ params }) => {
  const { websiteId, pageId } = useParams();
  const [funnelPageDetails, setFunnelPageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const pageData = await getPage(websiteId, pageId);
        setFunnelPageDetails(pageData);
      } catch (err) {
        console.error("Failed to fetch page details:", err);
        setError("Failed to load page details.");
      } finally {
        setLoading(false);
      }
    };

    if (websiteId && pageId) {
      fetchPageDetails();
    }
  }, [websiteId, pageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden hide-scrool">
      <EditorProvider funnelId={websiteId} pageDetails={funnelPageDetails}>
        <FunnelEditorNavigation
          funnelId={websiteId}
          funnelPageDetails={funnelPageDetails}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={pageId} websiteId={websiteId}/>
        </div>
        <FunnelEditorSidebar subaccountId={params.subaccountId} />
      </EditorProvider>
    </div>
  );
};

export default Page;
