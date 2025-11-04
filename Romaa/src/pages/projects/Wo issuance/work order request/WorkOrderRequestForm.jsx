import React, { useEffect, useState } from "react";
import romaaLogo from "../../../../assets/images/romaa logo.png";
import Title from "../../../../components/Title";
import { HiArrowsUpDown } from "react-icons/hi2";
import axios from "axios";

import { toast } from "react-toastify";
import { API } from "../../../../constant";
import { useLocation, useParams } from "react-router-dom";

const WorkOrderRequestForm = ({ onCancel, onSubmit }) => {
const {tenderId,requestId} =useParams();
console.log(requestId,tenderId);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch materials dynamically from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(
          `${API}/workorderrequest/api/getdetailbyId/${tenderId}/${requestId}`
        );
        console.log(res.data.data.materialsRequired);

        if (
          res.data.data.materialsRequired &&
          Array.isArray(res.data.data.materialsRequired)
        ) {
          const formatted = res.data.data.materialsRequired.map(
            (item, index) => ({
              sno: index + 1,
              work: item.materialName || "Work",
              unit: item.unit || "",
              quantity: item.quantity || 0,
              enterPrice: "",
              total: "",
              materialId: item._id,
            })
          );
          setRows(formatted);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
        toast.error("Failed to load materials");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [tenderId]);

  // ✅ Update price & total dynamically
  const handlePriceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].enterPrice = value;
    updatedRows[index].total = value ? value * updatedRows[index].quantity : "";
    setRows(updatedRows);
  };

  // ✅ Submit data
  const handleSubmit = () => {
    const hasEmpty = rows.some((r) => !r.enterPrice);
    if (hasEmpty) {
      toast.warning("Please enter price for all items");
      return;
    }
    if (onSubmit) onSubmit(rows);
  };

  return (
    <>
      <Title
        title="Projects Management"
        sub_title="WOR / WO Issuance"
        active_title="Work Order Request"
      />

      <div className="font-roboto-flex rounded-md mx-10 mt-4 p-10 bg-white shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mt-2 pb-2 border-b border-dashed border-gray-300">
          <img src={romaaLogo} alt="ROMAA" className="h-10 object-contain" />
          <h3 className="text-xl font-semibold text-darkest-blue">
            Work Order Request
          </h3>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : (
          <>
            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-center text-sm border-collapse">
                <thead>
                  <tr className="text-black border-b border-gray-200">
                    {[
                      "S.no",
                      "Work",
                      "Unit",
                      "Quantity",
                      "Enter price",
                      "Total",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-3 py-2 whitespace-nowrap font-semibold"
                      >
                        <div className="flex items-center justify-center gap-1">
                          {heading}
                          <HiArrowsUpDown className="cursor-pointer text-gray-500" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-bold ">
                  {rows.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2.5 ">{row.sno}</td>
                      <td className="first-letter:uppercase">{row.work}</td>
                      <td>{row.unit}</td>
                      <td>{row.quantity}</td>
                      <td>
                        <input
                          type="number"
                          value={row.enterPrice}
                          onChange={(e) =>
                            handlePriceChange(index, e.target.value)
                          }
                          className="border border-blue-200 rounded-md px-2 py-1 text-center w-24 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.total}
                          readOnly
                          className="border border-blue-200 rounded-md px-2 py-1 text-center w-24 bg-gray-50"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onCancel}
                className="px-5 py-1.5 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-1.5 bg-darkest-blue text-white rounded-md hover:bg-blue-900 flex items-center gap-2 transition"
              >
                <span>Submit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WorkOrderRequestForm;
