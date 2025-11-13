import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Modal from "../../../components/Modal";
import { InputField } from "../../../components/InputField";
import { API } from "../../../constant";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  site_name: yup.string().required("Site Name is required"),
  item_description: yup.string().required("Material is required"),
  unit: yup.string().required("Unit is required"),
  quantity: yup.number().typeError("Invalid Quantity"),
  work_location: yup.string().required("Work Location is required"),
  priority_level: yup
    .string()
    .oneOf(["High", "Medium", "Low"], "Invalid Priority Level")
    .required("Priority Level is required"),
  requested_by: yup.string().required("Requested By is required"),
});

const AddMaterialIssue = ({ onclose, onSuccess }) => {
  const tenderId = localStorage.getItem("tenderId");
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Fetch all materials for tenderId
  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${API}/material/getall/${tenderId}`);
      const data = res.data.data || [];
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    if (tenderId) fetchMaterials();
  }, [tenderId]);

  // ✅ When user selects material, autofill unit and total (readonly)
  const handleMaterialChange = (e) => {
    const materialName = e.target.value;
    const found = materials.find(
      (item) => item.item_description === materialName
    );

    if (found) {
      setSelectedMaterial(found);
      setValue("unit", found.unit || "");
      setValue("quantity", found.quantity || 0); // 🔹 use total_material for overall quantity
    } else {
      setSelectedMaterial(null);
      setValue("unit", "");
      setValue("quantity", "");
    }
  };

  // ✅ Submit form
  const onSubmit = async (data) => {
    try {
      const payload = {
        tender_id: tenderId,
        item_description: data.item_description,
        unit: data.unit,
        quantity: data.quantity,
        site_name: data.site_name,
        work_location: data.work_location,
        priority_level: data.priority_level,
        requested_by: data.requested_by,
      };

      console.log("Submitting:", payload);

      await axios.post(`${API}/material/addissued`, payload);
      toast.success("Material issued successfully!");
      if (onSuccess) onSuccess();
      onclose();
    } catch (error) {
      console.error("Error issuing material:", error);
      toast.error("Failed to issue material");
    }
  };

  return (
    <Modal
      title={"Add Material Issue"}
      onclose={onclose}
      widthClassName={"lg:w-[500px] md:w-[500px] w-[96]"}
      child={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6">
            <div className="lg:space-y-4 space-y-3">
              <InputField
                label="Site Name"
                type="text"
                name="site_name"
                register={register}
                errors={errors}
                placeholder="Enter Site Name"
              />

              {/* Material Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-white">
                  Material
                </label>
                <select
                  {...register("item_description")}
                  onChange={handleMaterialChange}
                  className="w-full bg-layout-dark mt-1 p-2 border rounded text-sm"
                >
                  <option value="">Select Material</option>
                  {materials.map((mat, index) => (
                    <option key={index} value={mat.item_description}>
                      {mat.item_description}
                    </option>
                  ))}
                </select>
                {errors.item_description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.item_description.message}
                  </p>
                )}
              </div>

              <InputField
                label="Unit"
                type="text"
                name="unit"
                register={register}
                errors={errors}
                placeholder="Enter Unit"
                readOnly
              />

              {/* Read-only Issued Quantity (autofilled) */}
              <InputField
                label="Issued Qty (Total Available)"
                type="number"
                name="quantity"
                register={register}
                errors={errors}
                placeholder="Auto-filled quantity"
                readOnly
              />

              <InputField
                label="Work Location"
                type="text"
                name="work_location"
                register={register}
                errors={errors}
                placeholder="Enter Work Location"
              />

              <InputField
                label="Priority Level"
                type="select"
                name="priority_level"
                register={register}
                errors={errors}
                options={[
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
                placeholder="Select Priority Level"
              />

              <InputField
                label="Requested By"
                type="text"
                name="requested_by"
                register={register}
                errors={errors}
                placeholder="Enter Requested By"
              />
            </div>
          </div>

          <div className="mx-5 text-xs flex justify-end gap-2 mb-4">
            <button
              type="button"
              onClick={onclose}
              className="border dark:border-white dark:text-white border-darkest-blue text-darkest-blue px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 bg-darkest-blue text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      }
    />
  );
};

export default AddMaterialIssue;
