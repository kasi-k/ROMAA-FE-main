import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { PiLinkBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import CreateEnquiry from "./CreateEnquiry";
import { IoReorderThree } from "react-icons/io5";

const PurchaseEnquiry = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [createEnquiry, setCreateEnquiry] = useState(false);
  const [data, setData] = useState([]);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // ✅ Dummy Sample Data
  useEffect(() => {
    const sampleData = [
      {
        _id: "ENQ001",
        description: "Cement Purchase Enquiry",
        vendorQuotations: [
          {
            _id: "VQ1",
            vendorName: "ABC Traders",
            approvalStatus: "Pending",
            items: [
              { material: "Cement Bag", qty: 50, unit: "Bags", rate: 350, amount: 17500 },
              { material: "White Cement", qty: 10, unit: "Bags", rate: 450, amount: 4500 },
            ],
          },
          {
            _id: "VQ2",
            vendorName: "XYZ Suppliers",
            approvalStatus: "Approved",
            items: [
              { material: "Cement Bag", qty: 50, unit: "Bags", rate: 340, amount: 17000 },
            ],
          },
        ],
      },

      {
        _id: "ENQ002",
        description: "Steel Rod Enquiry",
        vendorQuotations: [
          {
            _id: "VQ3",
            vendorName: "Metro Steel",
            approvalStatus: "Rejected",
            items: [
              { material: "Steel Rod 8mm", qty: 100, unit: "Nos", rate: 65, amount: 6500 },
            ],
          },
        ],
      },
    ];

    setData(sampleData);
  }, []);

  // Dummy Accept/Reject Handler
  const handleAction = (enquiryId, vendorQuoteId, action) => {
    setData((prev) =>
      prev.map((enq) =>
        enq._id === enquiryId
          ? {
              ...enq,
              vendorQuotations: enq.vendorQuotations.map((q) =>
                q._id === vendorQuoteId ? { ...q, approvalStatus: action } : q
              ),
            }
          : enq
      )
    );
    toast.success(`Vendor ${action} Successfully!`);
  };

  // Copy link
  const handleCopyLink = (item) => {
    const link = `${window.location.origin}/purchase/enquiry/enquiryform/${item._id}`;
    navigator.clipboard.writeText(link);
    toast.success("Enquiry Link Copied!");
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full  ">
      <div className="flex justify-between ">
        <Title
          title="Purchase Management"
          sub_title="Purchase Enquiry"
          page_title="Purchase Enquiry"
        />
        <div className="flex items-center gap-3">
          <Button
            button_name="Create Enquiry"
            button_icon={<IoReorderThree size={22} />}
            onClick={() => setCreateEnquiry(true)}
          />
          <Button button_icon={<TbFileExport size={22} />} button_name="Export" bgColor="bg-layout-dark"  />
          <Button button_icon={<BiFilterAlt size={22} />} button_name="Filter" bgColor="bg-layout-dark"  />
        </div>
      </div>

      <div className="mt-4 overflow-y-auto no-scrollbar ">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold text-sm dark:bg-layout-dark bg-white border-b-4 dark:border-border-dark-grey border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {["Contractor", "Unit Cost", "Unit", "Date", "Total", "Level", "Credit Days"].map(
                  (heading) => (
                    <th key={heading} className="p-3">
                      <h1 className="flex items-center justify-center gap-2">
                        {heading} <HiArrowsUpDown size={18} />
                      </h1>
                    </th>
                  )
                )}
                <th className="pr-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody className="text-greyish dark:text-gray-200 text-sm font-light">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  {/* MAIN ROW */}
                  <tr className="border-b-[3px] dark:bg-layout-dark dark:border-border-dark-grey bg-white border-light-blue text-center">
                    <td className="rounded-l-lg py-3">{index + 1}</td>
                    <td>{item.description}</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td>

                    <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2">
                      <p
                        onClick={() =>
                          navigate("viewpurchaseenquire", { state: { item } })
                        }
                        className="cursor-pointer bg-green-200 rounded-sm p-1.5 text-green-600"
                      >
                        <FiEye />
                      </p>

                      <p
                        onClick={() => handleCopyLink(item)}
                        className="cursor-pointer bg-cyan-200 p-1.5 rounded text-cyan-700"
                      >
                        <PiLinkBold />
                      </p>

                      <p
                        onClick={() => toggleRow(index)}
                        className="cursor-pointer bg-blue-200 rounded p-0.5 text-blue-600"
                      >
                        {expandedRow === index ? <ChevronUp /> : <ChevronDown />}
                      </p>
                    </td>
                  </tr>

                  {/* EXPANDED ROW */}
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="9" className="px-6 py-1">
                        <div className="dark:bg-layout-dark bg-white px-4 py-4 rounded-md">
                          {item.vendorQuotations.length > 0 ? (
                            item.vendorQuotations.map((quote, i) => (
                              <div
                                key={i}
                                className="border border-gray-300 dark:border-slate-700 rounded-lg mb-4 overflow-hidden"
                              >
                                <div className="bg-gray-100 dark:bg-slate-800 p-3 flex justify-between">
                                  <p className="font-semibold">
                                    {String.fromCharCode(97 + i)}) {quote.vendorName}
                                  </p>

                                  <p className="text-xs">
                                    Status:
                                    <span
                                      className={`ml-1 font-medium ${
                                        quote.approvalStatus === "Approved"
                                          ? "text-green-600"
                                          : quote.approvalStatus === "Rejected"
                                          ? "text-red-600"
                                          : "text-yellow-600"
                                      }`}
                                    >
                                      {quote.approvalStatus}
                                    </span>
                                  </p>
                                </div>

                                {/* Nested items */}
                                <table className="w-full text-xs border-t">
                                  <thead className="bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                                    <tr>
                                      <th className="border px-2 py-1">S.No</th>
                                      <th className="border px-2 py-1 text-left">Material</th>
                                      <th className="border px-2 py-1">Qty</th>
                                      <th className="border px-2 py-1">Unit</th>
                                      <th className="border px-2 py-1">Rate (₹)</th>
                                      <th className="border px-2 py-1">Amount (₹)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {quote.items.map((q, j) => (
                                      <tr key={j}>
                                        <td className="border px-2 py-1 text-center">{j + 1}</td>
                                        <td className="border px-2 py-1">{q.material}</td>
                                        <td className="border px-2 py-1 text-center">{q.qty}</td>
                                        <td className="border px-2 py-1 text-center">{q.unit}</td>
                                        <td className="border px-2 py-1 text-right">{q.rate}</td>
                                        <td className="border px-2 py-1 text-right text-green-700 font-medium">
                                          {q.amount}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>

                                <div className="flex justify-end gap-6 p-2">
                                  {quote.approvalStatus === "Pending" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleAction(item._id, quote._id, "Approved")
                                        }
                                        className="text-green-700 underline decoration-2 underline-offset-4 text-sm font-medium"
                                      >
                                        Accept
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleAction(item._id, quote._id, "Rejected")
                                        }
                                        className="text-red-500 underline decoration-2 underline-offset-4 text-sm font-medium"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}

                                  {quote.approvalStatus === "Approved" && (
                                    <span className="text-green-700 italic font-medium">
                                      Approved
                                    </span>
                                  )}

                                  {quote.approvalStatus === "Rejected" && (
                                    <span className="text-red-600 italic font-medium">
                                      Rejected
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-red-500 py-4">
                              No quotations available
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {createEnquiry && <CreateEnquiry onclose={() => setCreateEnquiry(false)} />}
    </div>
  );
};

export default PurchaseEnquiry;
