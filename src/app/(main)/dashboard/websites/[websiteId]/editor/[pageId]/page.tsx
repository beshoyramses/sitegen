"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import FunnelEditorSidebar from "../_components/editor-sidebar";
import FunnelEditor from "../_components/website-editor";
import { getPage } from "@/lib/firebase";

const Page: React.FC = () => {
  const router = useRouter();
  const { websiteId, pageId, subaccountId } = router.query as { websiteId?: string; pageId?: string; subaccountId?: string };
  const [funnelPageDetails, setFunnelPageDetails] = useState<any>(null); // Adjust `any` to a more specific type if available
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        if (websiteId && pageId) {
          const pageData = await getPage(websiteId, pageId);
          setFunnelPageDetails(pageData);
        }
      } catch (err) {
        console.error("Failed to fetch page details:", err);
        setError("Failed to load page details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageDetails();
  }, [websiteId, pageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden hide-scroll">
      <EditorProvider funnelId={websiteId} pageDetails={funnelPageDetails}>
        <FunnelEditorNavigation
          funnelId={websiteId}
          funnelPageDetails={funnelPageDetails}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={pageId} websiteId={websiteId} />
        </div>
        <FunnelEditorSidebar subaccountId={subaccountId} />
      </EditorProvider>
    </div>
  );
};

export default Page;
