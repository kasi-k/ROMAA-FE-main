import React, { useState } from "react";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import { TbPencil } from "react-icons/tb";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ViewMaterialRecieved = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Sample data for Material Received
  const [fields, setFields] = useState([
    {
      label: "Material",
      value: "Cement",
      type: "text",
      key: "material",
      tooltip: "Name of the material received",
    },
    {
      label: "Unit",
      value: "Bags",
      type: "text",
      key: "unit",
      tooltip: "Measurement unit for the material",
    },
    {
      label: "PO Qty",
      value: 100,
      type: "number",
      key: "poQty",
      tooltip: "Purchase Order Quantity",
    },
    {
      label: "Recieved Qty",
      value: 80,
      type: "number",
      key: "recievedQty",
      tooltip: "Quantity of material received",
    },
    {
      label: "Pending",
      value: 20,
      type: "number",
      key: "pending",
      tooltip: "Pending quantity to be received",
    },
    {
      label: "Ordered Date",
      value: "2024-05-20",
      type: "date",
      key: "orderedDate",
      tooltip: "Date when the material was ordered",
    },
    {
      label: "Amount",
      value: 32000,
      type: "number",
      key: "amount",
      tooltip: "Total amount for the material",
    },
  ]);

  const updateField = (key, newValue) => {
    setFields(
      fields.map((item) =>
        item.key === key ? { ...item, value: newValue } : item
      )
    );
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Saved Fields:", fields);
    // API save calls here
  };

  // Tooltip wrapper
  const TooltipWrapper = ({ tooltip, children }) => {
    if (!tooltip) return children;
    return (
      <div className="relative group inline-block cursor-help">
        {children}
        <div className="absolute z-10 hidden group-hover:block bg-indigo-100 text-black text-xs font-semibold px-3 py-1 rounded shadow-md -top-6 left-36 -translate-x-1/2 w-52 whitespace-normal">
          {tooltip}
          <div className="absolute -bottom-1 left-1 w-3.5 h-3 bg-indigo-100 transform rotate-45"></div>
        </div>
      </div>
    );
  };

  const renderField = (field) => {
    if (isEditing) {
      if (field.type === "textarea") {
        return (
          <textarea
            className="w-full p-2 border border-input-bordergrey dark:border-border-dark-grey rounded resize-none text-xs"
            rows={4}
            value={field.value}
            onChange={(e) => updateField(field.key, e.target.value)}
          />
        );
      }
      return (
        <input
          type={field.type || "text"}
          className="w-full p-1 border border-input-bordergrey dark:border-border-dark-grey  rounded text-xs"
          value={field.value}
          onChange={(e) => updateField(field.key, e.target.value)}
        />
      );
    }
    // Not editing: show value + tooltip
    return (
      <TooltipWrapper tooltip={field.tooltip}>
        <p className="text-xs opacity-50">{field.value}</p>
      </TooltipWrapper>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <Title
          title="Site Management"
          sub_title="Material Recieved"
          active_title={isEditing?"Edit Material Received":"View Material Recieved"}
        />
        {!isEditing ? (
          <Button
            button_name="Edit"
            button_icon={<TbPencil size={23} />}
            onClick={handleEditClick}
          />
        ) : (
          <Button button_name="Save" onClick={handleSaveClick} />
        )}
      </div>

      <div className="dark:bg-layout-dark bg-white p-4 rounded-lg space-y-2 text-sm">
        <p className="font-semibold text-center text-lg">
          Material Recieved Details
        </p>
        <div className="grid grid-cols-12 gap-2 items-start">
          {fields.map((field) => (
            <React.Fragment key={field.key}>
              <p className="col-span-4 font-medium">{field.label}</p>
              <div className="col-span-8">{renderField(field)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-end py-2 ">
        <Button
          onClick={() => navigate("..")}
          button_name="Back"
          button_icon={<IoChevronBackSharp />}
        />
      </div>
    </div>
  );
};

export default ViewMaterialRecieved;
