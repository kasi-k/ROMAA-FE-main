import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { LuDelete } from "react-icons/lu";
import Select from "react-select";

const vendorOptions = [
  { value: "vendor1", label: "Vendor 1" },
  { value: "vendor2", label: "Vendor 2" },
];

const categoryOptions = [
  { value: "cat1", label: "Category 1" },
  { value: "cat2", label: "Category 2" },
  { value: "cat3", label: "Category 3" },
];

const initialMaterial = { material: "", unit: "", qty: "" };

const CreateEnquiry = ({ onclose }) => {
  const [materials, setMaterials] = useState([ { ...initialMaterial }, { ...initialMaterial } ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [projectId, setProjectId] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddRow = () => setMaterials([...materials, { ...initialMaterial }]);
  const handleDeleteRow = () => materials.length > 1 && setMaterials(materials.slice(0, -1));
  const handleChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };
  const isDark = document.documentElement.classList.contains("dark");
    const selectStyles = {
    control: (base) => ({
      ...base,
    borderColor: isDark ? "#353535" : "#c7d2fe",
      borderRadius: "0.375rem",
      boxShadow: "none",
      minHeight: "42px",
      padding: "2px",
      fontSize: "0.875rem",
      backgroundColor: isDark ? "#0D0D0D" : "#fff",
      color: isDark ? "#e5e7eb" : "#1e293b",
       outline: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#0D0D0D" : "#fff",
      color: isDark ? "#e5e7eb" : "#1e293b",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark
          ? "#3730a3"
          : "#dbeafe"
        : state.isFocused
        ? isDark
          ? "#374151"
          : "#f1f5f9"
        : isDark
        ? "#23272f"
        : "#fff",
      color: isDark ? "#e5e7eb" : "#1e293b",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#3730a3" : "#dbeafe",
      color: isDark ? "#e5e7eb" : "#1e40af",
      borderRadius: "0.375rem",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#e5e7eb" : "#1e40af",
      fontSize: "0.75rem",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "#e5e7eb" : "#1e40af",
      ':hover': { color: "red" },
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? "#9ca3af" : "#9ca3af",
      fontSize: "0.875rem",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "#e5e7eb" : "#1e293b",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#e5e7eb" : "#1e293b",
    }),
  };

  return (
    <Modal
      onclose={onclose}
      title="Create Enquiry"
      child={
        <div className="max-w-5xl mx-auto p-6 dark:bg-layout-dark bg-white">
          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-nowrap">
            <div className="flex items-center gap-2">
              <label className=" dark:text-gray-200 text-gray-400">Project ID</label>
              <input
                className="w-full outline-none border dark:border-border-dark-grey border-input-bordergrey rounded-md px-3 py-2"
                type="text"
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="dark:text-gray-200 text-gray-400">Location</label>
              <input
                className="w-full outline-none border dark:border-border-dark-grey border-input-bordergrey rounded-md px-3 py-2"
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="dark:text-gray-200 text-gray-400">Due date</label>
              <input
                className="w-full outline-none border dark:border-border-dark-grey border-input-bordergrey rounded-md px-3 py-2"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Vendor & Category */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Vendor & Vendor Category</h3>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-6 flex items-center gap-3">
                <label className="text-sm font-medium dark:text-gray-200 text-gray-700 whitespace-nowrap w-96">Vendor</label>
                <div className="relative w-full">
                  <select
                    value={selectedVendor}
                    onChange={e => setSelectedVendor(e.target.value)}
                    className="appearance-none w-full border dark:border-border-dark-grey border-blue-100 rounded-md px-3 py-2 text-sm  dark:text-gray-200 text-gray-700 pr-8 focus:outline-none"
                  >
                    <option value="">Type Here</option>
                    {vendorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
              <div className="col-span-6 flex items-center gap-3">
                <label className="text-sm font-medium dark:text-gray-200 text-gray-700 whitespace-nowrap w-96">Vendor Category</label>
                <div className="w-full">
                  <Select
                    isMulti
                    options={categoryOptions}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder=""
                       styles={selectStyles}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Material Table */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleDeleteRow}
              className="flex items-center gap-2 text-red-600 px-4 py-2 rounded border border-red-500"
              disabled={materials.length === 1}
            >
              <LuDelete size={20} /> Delete
            </button>
            <button
              onClick={handleAddRow}
              className="bg-darkest-blue text-white px-6 py-2 rounded"
            >
              + Add
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-10 gap-2 font-semibold mb-2">
              <div>S no</div>
              <div className="col-span-3">Material</div>
              <div className="col-span-3">Unit</div>
              <div>Qty</div>
            </div>
            {materials.map((row, index) => (
              <div key={index} className="grid grid-cols-10 gap-2 items-center">
                <div className="px-3 py-2 border dark:border-border-dark-grey border-input-bordergrey rounded-md">{index + 1}</div>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="border col-span-3 dark:border-border-dark-grey border-input-bordergrey px-3 py-2 rounded-md"
                  value={row.material}
                  onChange={e => handleChange(index, "material", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Type Here"
                  className="border col-span-3 dark:border-border-dark-grey border-input-bordergrey px-3 py-2 rounded-md"
                  value={row.unit}
                  onChange={e => handleChange(index, "unit", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Type Here"
                  className="border col-span-3 dark:border-border-dark-grey border-input-bordergrey px-3 py-2 rounded-md"
                  value={row.qty}
                  onChange={e => handleChange(index, "qty", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={onclose} className="px-6 py-2 border dark:border-white dark:text-white border-darkest-blue rounded text-darkest-blue">Cancel</button>
            <button className="px-6 py-2 bg-darkest-blue text-white rounded">
              Save
            </button>
          </div>
        </div>
      }
    />
  );
};

export default CreateEnquiry;