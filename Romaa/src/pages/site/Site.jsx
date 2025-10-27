
import { sitedata } from "../../components/Data";
import Filters from "../../components/Filters";
import Table from "../../components/Table";
import { LuLandPlot } from "react-icons/lu";
import AddSite from "./AddSite";
const Columns = [
  { label: "Project ID", key: "projectid" },
  { label: "Site name", key: "sitename" },
  { label: "Category", key: "category" },
  { label: " Date", key: "date" },
  { label: "Assigned to", key: "assignedto" },
  { label: "Status", key: "status" },
];

const Site = () => {
  return (
    <Table
      title="Site Management"
      subtitle="Site"
      pagetitle="Site Management"
      columns={Columns}
      endpoint={sitedata}
      AddModal={AddSite}
      EditModal={true}
      routepoint={"boqsite"}
      FilterModal={Filters}
      addButtonLabel="New site Problem"
      addButtonIcon={<LuLandPlot size={24}/>}
    />
  );
};

export default Site;
