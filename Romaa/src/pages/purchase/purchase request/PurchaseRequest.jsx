import Filters from "../../../components/Filters";
import Table from "../../../components/Table";
import { PurchaserequestData } from "../../../components/Data";
import { AiOutlineFileAdd } from "react-icons/ai";
import RequestRegister from "./RequestRegister";

const Columns = [
  { label: "Request ID", key: "id" },
  { label: "Date", key: "date" },
  { label: "Project", key: "project" },
  { label: "Date of Requirements", key: "dor" },
  { label: "Requested by", key: "requestby" },
];

const PurchaseRequest = () => {
  return (
    <Table
      title="Purchase Management"
      subtitle="Purchase Request"
      pagetitle="Purchase Request"
      endpoint={PurchaserequestData}
      columns={Columns}
      AddModal={RequestRegister}
      routepoint={"viewpurchaserequest"}
      FilterModal={Filters}
      addButtonLabel="Request Register"
      addButtonIcon={<AiOutlineFileAdd size={24} />}
    />
  );
};

export default PurchaseRequest;
