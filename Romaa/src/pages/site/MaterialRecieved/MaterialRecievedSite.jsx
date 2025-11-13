import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { TbPlus } from "react-icons/tb";
import Filters from "../../../components/Filters";
import AddMaterial from "./AddMaterial";
import axios from "axios";
import { API } from "../../../constant";

const MaterialRecievedSite = () => {
  const tenderId = localStorage.getItem("tenderId");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const materialRecievedColumns = [
    { label: "Material", key: "item_description" },
    { label: "Unit", key: "unit" },
    { label: "PO Qty", key: "quantity" },
    { label: "Received Qty", key: "received_quantity" },
    { label: "Pending", key: "pending_quantity" },
    {
      label: "Ordered Date",
      key: "ordered_date",
      render: (row) => formatDate(row.ordered_date),
    },
    { label: "Amount", key: "total_amount" },
  ];

  // Helper: Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("en-GB"); // → 20/11/2025
  };

  // Fetch materials for tenderId

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/material/getall/${tenderId}`);

      // Filter to show only materials with received quantity
      const filtered = (res.data.data || []).filter(
        (item) => Number(item.received_quantity) > 0
      );

      setMaterials(filtered);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tenderId) fetchMaterials();
  }, [tenderId]);

  return (
    <Table
      title="Site Management"
      subtitle="Material Received"
      pagetitle="Material Received"
      endpoint={materials}
      loading={loading}
      columns={materialRecievedColumns}
      EditModal={true}
      routepoint="viewmaterialrecieved"
      FilterModal={Filters}
      AddModal={AddMaterial}
      addButtonIcon={<TbPlus className="text-2xl text-primary" />}
      addButtonLabel="Add Material Received"
      onSuccess={fetchMaterials}
    />
  );
};

export default MaterialRecievedSite;
