"use client";

import { useContainerWidth } from "@/app/hooks/useContainerWidth";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { Voenkomats } from "./admin-voenkomat-reference-data-table/data";
import { AdminVoenkomatReferenceDataTable } from "./admin-voenkomat-reference-data-table/AdminVoenkomatReferenceDataTable";
import { AdminPodrazdeleniyeReferenceDataTable } from "./admin-podrazdeleniya-reference-data-table/AdminPodrazdeleniyaReferenceDataTable";
import { Podrazdeleniya } from "./admin-podrazdeleniya-reference-data-table/data";

const ReferenceDataPage = () => {
  const { ref, isWide } = useContainerWidth(768);

  return (
    <div className="w-full flex flex-col" ref={ref}>
      <ResizablePanelGroup
        direction={isWide ? "horizontal" : "vertical"}
        className="w-full min-h-max mt-12 flex flex-col md:flex-row gap-2 xl:gap-3 overflow-auto"
      >
        <ResizablePanel defaultSize={50} className="min-h-max">
          <AdminVoenkomatReferenceDataTable data={Voenkomats} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className="min-h-max">
          <AdminPodrazdeleniyeReferenceDataTable data={Podrazdeleniya} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ReferenceDataPage;
