import React from "react";
import Table from "../../../components/Table";
import { TbPlus } from "react-icons/tb";
import Filters from "../../../components/Filters";
import { materialRecievedData } from "../../../components/Data";
import AddMaterial from "./AddMaterial";

const MaterialRecievedSite = () => {
  const materialRecievedColumns = [
    { label: "Material", key: "material" },
    { label: "Unit", key: "unit" },
    { label: "PO Qty", key: "poQty" },
    { label: "Recieved Qty", key: "recievedQty" },
    { label: "Pending", key: "pending" },
    { label: "Oredered Date", key: "orderedDate" },
    { label: "Amount", key: "amount" },
  ];
  return (
    <Table
      title={"Site Management"}
      subtitle={"Material Recieved"}
      pagetitle={"Material Recieved"}
      endpoint={materialRecievedData}
      columns={materialRecievedColumns}
      EditModal={true}
      routepoint={"viewmaterialrecieved"}
      FilterModal={Filters}
      AddModal={AddMaterial}
      addButtonIcon={<TbPlus className="text-2xl text-primary" />}
      addButtonLabel={"Add Material Recieved "}
    />
  );
};

export default MaterialRecievedSite;
