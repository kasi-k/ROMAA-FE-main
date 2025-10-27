import Table from "../../../components/Table";
import { ProjectAssetData } from "../../../components/Data";
import Filters from "../../../components/Filters";

const Columns = [
  { label: "Asset Name ", key: "assetname" },
  { label: "Category", key: "category" },
  { label: "Location", key: "location" },
  { label: "Assigned to", key: "assignedto" },
  { label: "Remarks ", key: "remarks" },
  { label: "Date", key: "date" },
];

const PurchaseAssets = () => {
  return (
    <Table
      title={"Purchase Management"}
      subtitle={"Assets"}
      pagetitle={" Assets"}
      endpoint={ProjectAssetData}
      columns={Columns}
      FilterModal={Filters}
    />
  );
};

export default PurchaseAssets;
