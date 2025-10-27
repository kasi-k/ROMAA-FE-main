import React, { useState } from "react";
import Title from "../../../components/Title";

const ViewSiteAssest = () => {
  const [mainFields] = useState([
    {
      label: "Asset Name",
      value: "Excavator",
      tooltip: "Name of the asset",
    },
    {
      label: "Asset Type",
      value: "Heavy Equipment",
      tooltip: "Type/category of the asset",
    },
    {
      label: "Unit",
      value: "Nos",
      tooltip: "Unit of measurement for the asset",
    },
    {
      label: "Alloted To",
      value: "John Doe",
      tooltip: "Person to whom the asset is allotted",
    },
    {
      label: "Site Location",
      value: "Site A",
      tooltip: "Location where the asset is deployed",
    },
    {
      label: "Date",
      value: "2024-06-01",
      tooltip: "Date of allotment or record",
    },
    {
      label: "Status",
      value: "Active",
      tooltip: "Current status of the asset",
    },
  ]);

  // Tooltip wrapper
  const TooltipWrapper = ({ tooltip, children }) => {
    if (!tooltip) return children;
    return (
      <div className="relative group inline-block cursor-help">
        {children}
        <div className="absolute z-10 hidden group-hover:block bg-indigo-100 text-black text-xs font-semibold px-3 py-1 rounded shadow-md -top-6 left-36 -translate-x-1/2 w-52 whitespace-normal">
          {tooltip}
          <div className="absolute -bottom-1 left-1 w-3.5 h-3 bg-indigo-100 transform rotate-45"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Title title="Site Management" active_title="Site Asset Details" />
      <div className="dark:bg-layout-dark bg-white p-4 rounded-lg space-y-2 text-sm mt-3">
        <p className="font-semibold text-center text-lg">Site Asset Details</p>
        <div className="grid grid-cols-12 gap-2 items-start mt-3">
          {mainFields.map((field, idx) => (
            <React.Fragment key={idx}>
              <p className="col-span-6 font-medium">{field.label}</p>
              <div className="col-span-6">
                <TooltipWrapper tooltip={field.tooltip}>
                  <span className="text-xs opacity-70">{field.value}</span>
                </TooltipWrapper>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSiteAssest;
