
import { BoqSitedata } from "../../../components/Data";
import DeleteModal from "../../../components/DeleteModal";
import Filters from "../../../components/Filters";
import Table from "../../../components/Table";
import EditBOQSite from "./EditBOQSite";


const BoqSiteColumns = [
  { label: "S.no", key: "id" },
  { label: "Specification", key: "specification" },
  { label: "Quantity", key: "quantity" },
  { label: "Units", key: "units" },
  { label: "Final Rate", key: "rate" },
  { label: "Amount", key: "amount" },
];

const BOQSite = () => {


  return (
    <Table
      title="Site"
      subtitle="BOQ"
      pagetitle="BOQ"
      endpoint={BoqSitedata}
      columns={BoqSiteColumns}
      EditModal={EditBOQSite}
      ViewModal={true}
      DeleteModal={DeleteModal}
      deletetitle="BOQ"
      FilterModal={Filters}
      onExport={() => console.log("Exporting...")}
    />
  );
};

export default BOQSite;
