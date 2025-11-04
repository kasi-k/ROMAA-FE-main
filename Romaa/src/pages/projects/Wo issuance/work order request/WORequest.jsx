import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { PiLinkBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../constant";

const WORequest = () => {
  const projectId = localStorage.getItem("tenderId");
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/workorderrequest/api/getbyId/${projectId}`);
        if (res.data.data && Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          toast.error("No Work Order Requests found");
        }
      } catch (error) {
        console.error("Error fetching WorkOrderRequests:", error);
        toast.error("Failed to fetch Work Order Requests");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // ✅ Generate link for a Work Order Request
  const handleGenerateWO = (item) => {
    const link = `${window.location.origin}/projects/woissuance/requestform/${projectId}/${"WO006"}`;
    navigator.clipboard.writeText(link);
    toast.success("Work Order link copied to clipboard!");
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="mt-4 overflow-y-auto no-scrollbar">
        <div className="overflow-auto no-scrollbar">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading...</div>
          ) : (
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="font-semibold text-sm dark:bg-layout-dark bg-white border-b-4 dark:border-border-dark-grey border-light-blue">
                  <th className="p-3.5 rounded-l-lg">S.no</th>
                  {[
                    "Contractor",
                    "Unit Cost",
                    "Unit",
                    "Date",
                    "Total",
                    "Level",
                    "Credit Days",
                  ].map((heading) => (
                    <th key={heading} className="p-3">
                      <h1 className="flex items-center justify-center gap-2">
                        {heading} <HiArrowsUpDown size={18} />
                      </h1>
                    </th>
                  ))}
                  <th className="pr-2 rounded-r-lg">Action</th>
                </tr>
              </thead>

              <tbody className="text-greyish dark:text-gray-200 text-sm font-light">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b-[3px] dark:bg-layout-dark dark:border-border-dark-grey bg-white border-light-blue text-center">
                        <td className="rounded-l-lg py-3">{index + 1}</td>
                        <td className="first-letter:uppercase">{item.title || "—"}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2">
                          {/* 👁 View */}
                          <p
                            onClick={() =>
                              navigate("viewworequest", { state: { item } })
                            }
                            className="cursor-pointer bg-green-200 rounded-sm p-1.5 text-green-600"
                            title="View Work Order"
                          >
                            <FiEye />
                          </p>

                          {/* 🔗 Generate Link */}
                          <p
                            onClick={() => handleGenerateWO(item)}
                            className="cursor-pointer bg-cyan-200 p-1.5 rounded text-cyan-700"
                            title="Copy Work Order Link"
                          >
                            <PiLinkBold />
                          </p>

                          {/* ⬇ Expand */}
                          <p
                            onClick={() => toggleRow(index)}
                            className="cursor-pointer bg-blue-200 rounded p-0.5 text-blue-600"
                            title="View Quotations"
                          >
                            {expandedRow === index ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
                          </p>
                        </td>
                      </tr>

                      {expandedRow === index && (
                        <tr>
                          <td colSpan="9" className="px-6 py-1">
                            <div className="dark:bg-layout-dark bg-white px-4 py-4 rounded-md">
                              <table className="w-full text-end text-sm table-fixed">
                                <tbody className="dark:bg-overall_bg-dark bg-gray-200">
                                  {item.vendorQuotations?.length > 0 ? (
                                    item.vendorQuotations.map((quote, i) => (
                                      <tr
                                        key={i}
                                        className="border-b-2 dark:border-border-dark-grey border-white"
                                      >
                                        <td className="py-1.5 text-start px-8">
                                          {String.fromCharCode(97 + i)}){" "}
                                          {quote.vendorName}
                                        </td>
                                        <td>{`₹ ${quote.totalQuotedValue || 0}`}</td>
                                        <td>{quote.deliveryPeriod || "—"}</td>
                                        <td>
                                          {quote.quotationDate
                                            ? new Date(quote.quotationDate).toLocaleDateString()
                                            : "—"}
                                        </td>
                                        <td>{quote.paymentTerms || "—"}</td>
                                        <td>{quote.approvalStatus}</td>
                                        <td>
                                          <div className="flex gap-4 px-4 items-center">
                                            <p className="text-green-800 underline decoration-2 underline-offset-4 text-sm font-medium cursor-pointer">
                                              Accept
                                            </p>
                                            <p className="text-red-500 underline decoration-2 underline-offset-4 text-sm font-medium cursor-pointer">
                                              Reject
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="7" className="text-center py-4 text-red-500">
                                        No quotations available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No Work Order Requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default WORequest;
