import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../../components/Modal";
import { InputField } from "../../../components/InputField";

const schema = yup.object().shape({
  siteName: yup.string().required("Site Name is required"),
  material: yup.string().required("Material is required"),
  unit: yup.string().required("Unit is required"),
  issuedQty: yup
    .number()
    .typeError("Issued Qty must be a number")
    .required("Issued Qty is required"),
  workLocation: yup.string().required("Work Location is required"),
  priorityLevel: yup
    .string()
    .oneOf(["High", "Medium", "Low"], "Invalid Priority Level")
    .required("Priority Level is required"),
  requestedBy: yup.string().required("Requested By is required"),
});

const AddMaterialIssue = ({ onclose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onclose();
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
                name="siteName"
                register={register}
                errors={errors}
                placeholder="Enter Site Name"
              />
              <InputField
                label="Material"
                type="text"
                name="material"
                register={register}
                errors={errors}
                placeholder="Enter Material"
              />
              <InputField
                label="Unit"
                type="text"
                name="unit"
                register={register}
                errors={errors}
                placeholder="Enter Unit"
              />
              <InputField
                label="Issued Qty"
                type="number"
                name="issuedQty"
                register={register}
                errors={errors}
                placeholder="Enter Issued Qty"
              />
              <InputField
                label="Work Location"
                type="text"
                name="workLocation"
                register={register}
                errors={errors}
                placeholder="Enter Work Location"
              />
              <InputField
                label="Priority Level"
                type="select"
                name="priorityLevel"
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
                name="requestedBy"
                register={register}
                errors={errors}
                placeholder="Enter Requested By"
              />
            </div>
          </div>
          <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={onclose}
              className="cursor-pointer border dark:border-white dark:text-white border-darkest-blue text-darkest-blue px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 bg-darkest-blue text-white rounded"
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
