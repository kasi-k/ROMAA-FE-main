import React from "react";
import { TbPlus } from "react-icons/tb";
import Filters from "../../../components/Filters";
import Table from "../../../components/Table";
import AddPurchaseRequestSite from "./AddPurchaseRequestSite";
import { purchaseRequestSiteData } from "../../../components/Data";

const PurchaseRequestSite = () => {
  const purchaseRequestColumns = [
    { label: "Request ID", key: "requestId" },
    { label: "Material", key: "material" },
    { label: "Unit", key: "units" },
    { label: "Quantity", key: "quantity" },
    { label: "Site Location", key: "siteLocation" },
    { label: "Required On", key: "requiredOn" },
    { label: "Status", key: "status" },
  ];
  return (
    <Table
      title={"Site Management"}
      subtitle={"Purchase Request"}
      pagetitle={"Purchase Request"}
      endpoint={purchaseRequestSiteData}
      columns={purchaseRequestColumns}
      EditModal={false}
      routepoint={"viewpurchaserequestsite"}
      FilterModal={Filters}
      AddModal={AddPurchaseRequestSite}
      addButtonIcon={<TbPlus className="text-2xl text-primary" />}
      addButtonLabel={"Add Purchase Request"}
    />
  );
};

export default PurchaseRequestSite;
