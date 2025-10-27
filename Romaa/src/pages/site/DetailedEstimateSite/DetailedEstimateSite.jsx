import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../../../components/Title";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import GSsite from "./GS/GSsite";
import BillQtySite from "./BillQty/BillQtySite";
import NewInletSite from "./NewInletDetSite/NewInletSite";
import NewInletAbsSite from "./NewInletAbsSite/NewInletAbsSite";
import RoadAbstract from "./RoadAbstract/RoadAbstract";
import Retainingwall from "./RetainingWall/RatainingWall";
import RetainingAbstractSite from "./retaining abstract site/RetainingAbstractSite";
import ContractSite from "./contract site/ContractSite";
import VendorSite from "./vendor site/VendorSite";
import RoadDetails from "./Roaddetails/RoadDetails";

const tabs = [
  {
    id: "1",
    label: " GS",
    component:<GSsite />,
    buttons: [
      {
        label: "Export",
        icon: <TbFileExport size={23} />,
        className: "dark:bg-layout-dark dark:text-white bg-white text-darkest-blue",
      },
      {
        label: "Filter",
        icon: <BiFilterAlt size={23} />,
        className: " dark:bg-layout-dark dark:text-white bg-white text-darkest-blue",
      },
    ],
  },
  {
    id: "2",
    label: "Bill of Qty",
    component: <BillQtySite />,
    buttons:[]
  },
  {
    id: "3",
    label: "New Inlet Det",
    component: <NewInletSite />,
    buttons:[]
  },
  {
    id: "4",
    label: " New Inlet Abs",
     component: <NewInletAbsSite />,
    buttons:[]
  },
  {
    id: "5",
    label: " Road Detailed",
  component:<RoadDetails/>,
    
  },
  {
    id: "6",
    label: " Road Abstract",
    component:<RoadAbstract />
  },

  {
    id: "7",
    label: " Retaining Wall",
    component:<Retainingwall />
  },
  {
    id: "8",
    label: " Retaining Abstract",
    component:<RetainingAbstractSite />
  },
  {
    id: "9",
    label: "Contract",
    component:<ContractSite />
  },
  {
    id: "10",
    label: "Vendor",
    component:<VendorSite />  
  },
];

const DetailedEstimateSite = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
const [searchParams, setSearchParams] = useSearchParams();
const defaultTab = tabs[0].id;
const activeTab = searchParams.get("tab") || defaultTab;

const handleTabChange = (id) => {
  setSearchParams({ tab: id });
};

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
const buttonsWithHandlers = (activeTabData.buttons || []).map((button) => {
  const modalMap = {};
  if (modalMap[button.label]) {
    return {
      ...button,
      onClick: () => setOpenModal(modalMap[button.label]),
    };
  }
  return button;
});

  return (
    <>
      <div className="font-roboto-flex flex flex-col h-full">
        <div className="font-roboto-flex flex justify-between items-center ">
          <Title
            title="Site Management"
            sub_title="Detailed Estimate"
            active_title={activeTabData?.label}
          />
          <div className="flex gap-2">
            {buttonsWithHandlers.map((button, index) => (
              <button
                key={index}
                className={`cursor-pointer w-fit text-sm flex items-center gap-2 px-4 py-2 rounded-md ${button.className}`}
                onClick={button.onClick}
              >
                {button.icon} {button.label}
              </button>
            ))}
          </div>
        </div>
        <div className=" font-roboto-flex  cursor-pointer flex justify-between items-center  ">
          <div className="flex flex-wrap gap-2 py-2.5 ">
            {tabs.map(({ id, label }) => (
              <p
                key={id}
                className={`flex gap-2 items-center px-4 py-2.5 font-medium rounded-lg text-sm whitespace-nowrap ${
                  activeTab === id
                    ? "bg-darkest-blue text-white"
                    : "dark:text-white dark:bg-layout-dark bg-white text-darkest-blue "
                }`}
                onClick={() => handleTabChange(id)}
              >
                {label}
              </p>
            ))}
          </div>
        </div>
        <div className=" h-full overflow-y-auto  no-scrollbar">
          {activeTabData?.component}
        </div>
      </div>
    </>
  );
};

export default DetailedEstimateSite;
