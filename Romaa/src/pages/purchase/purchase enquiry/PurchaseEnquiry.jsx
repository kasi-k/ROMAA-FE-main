import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { purchaseEnquireData } from "../../../components/Data";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PiLinkBold } from "react-icons/pi";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import CreateEnquiry from "./CreateEnquiry";
import { IoReorderThree } from "react-icons/io5";

const PurchaseEnquiry = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(false);
  const [createEnquiry, setCreateEnquiry] = useState(false);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="flex justify-between ">
        <Title title="Purchase Management"
        sub_title="Purchase Enquiry" 
        page_title="Purchase Enquiry"/>
        <div className=" flex items-center gap-3">
            <Button
              button_name="Create Enquiry"
            button_icon={<IoReorderThree size={22} />}
              onClick={()=>setCreateEnquiry(true)}
            />
            <Button
              button_icon={<TbFileExport size={22} />}
              button_name="Export"
              bgColor="dark:bg-layout-dark bg-white"
              textColor="dark:text-white text-darkest-blue"
              // onClick={onExport}
            />
            <Button
              button_icon={<BiFilterAlt size={22} />}
              button_name="Filter"
              bgColor=" dark:bg-layout-dark bg-white"
              textColor=" dark:text-white text-darkest-blue"
             
            />
        </div>
      </div>
      <div className="mt-4 overflow-y-auto no-scrollbar ">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold  text-sm dark:bg-layout-dark bg-white border-b-4 dark:border-border-dark-grey border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {[
                  "Contractor",
                  "Unit Cost",
                  "Unit ",
                  "Date",
                  "Total",
                  "Level",
                  "Credit Days",
                ].map((heading) => (
                  <th key={heading} className="p-3">
                    <h1 className="flex items-center justify-center  gap-2">
                      {heading} <HiArrowsUpDown size={18} />
                    </h1>
                  </th>
                ))}
                <th className="pr-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody className="text-greyish dark:text-gray-200  text-sm font-light">
              {purchaseEnquireData.length > 0
                ? purchaseEnquireData.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-b-[3px] dark:bg-layout-dark dark:border-border-dark-grey bg-white border-light-blue text-center">
                          <td className="rounded-l-lg py-3">{index + 1}</td>
                          <td>{data.description}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2">
                            <p
                              onClick={() =>
                                navigate("viewpurchaseenquire", {
                                  state: { item: data },
                                })
                              }
                              className="cursor-pointer bg-green-200  rounded-sm  p-1.5  text-green-600"
                            >
                              <FiEye />
                            </p>
                            <p
                              onClick={() =>
                                navigate("viewworequest", {
                                  state: { item: data },
                                })
                              }
                              className="cursor-pointer bg-cyan-200 p-1.5  rounded  text-cyan-700"
                            >
                              <PiLinkBold   />
                            </p>
                            <p
                              onClick={() => toggleRow(index)}
                              className="cursor-pointer bg-blue-200  rounded p-0.5 text-blue-600"
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
                            <td colSpan="9" className="px-6 py-1  ">
                              <div className=" dark:bg-layout-dark bg-white px-4 py-4 rounded-md ">
                                <table className="w-full text-end  text-sm table-fixed ">
                                  <tbody className=" dark:bg-overall_bg-dark bg-gray-200">
                                    {data.details && data.details.length > 0 ? (
                                      <>
                                        {data.details.map((detail, i) => (
                                          <tr
                                            key={i}
                                            className="border-b-2 dark:border-border-dark-grey border-white "
                                          >
                                            <td className="py-1.5 text-start px-8">
                                              {String.fromCharCode(97 + i)}){" "}
                                              {detail.contractor}
                                            </td>
                                            <td>{`₹ ${detail.unitCost}`}</td>
                                            <td>{detail.unit}</td>
                                            <td>{detail.date}</td>
                                            <td>{detail.total}</td>
                                            <td>{detail.level}</td>
                                            <td>{detail.creditDays}</td>
                                            <td><div className="flex gap-4 px-4 items-center"><p className="text-green-800 underline  decoration-2 underline-offset-4 text-sm font-medium "> Accept</p><p className="text-red-500 underline  decoration-2 underline-offset-4 text-sm font-medium ">Reject</p></div></td>
                                          </tr>
                                        ))}
                                      </>
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="6"
                                          className="text-center py-4 text-red-500"
                                        >
                                          No data available
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
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      {createEnquiry && (
        <CreateEnquiry
     onclose={() => setCreateEnquiry(false)}
        />
      )}
    </div>
  );
};

export default PurchaseEnquiry;
