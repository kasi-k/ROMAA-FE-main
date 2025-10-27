import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../../components/Modal";
import { InputField } from "../../../components/InputField";

const schema = yup.object().shape({
  requestId: yup.string().required("Request ID is required"),
  material: yup.string().required("Material is required"),
  units: yup.string().required("Unit is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
  siteLocation: yup.string().required("Site Location is required"),
  requiredOn: yup.date().required("Required On is required"),
  status: yup
    .string()
    .oneOf(["Pending", "Approved", "Rejected"], "Invalid Status")
    .required("Status is required"),
});

const AddPurchaseRequestSite = ({ onclose }) => {
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
      title={"Add Purchase Request"}
      onclose={onclose}
      widthClassName={"lg:w-[500px] md:w-[500px] w-[96]"}
      child={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6">
            <div className="lg:space-y-4 space-y-3">
              <InputField
                label="Request ID"
                type="text"
                name="requestId"
                register={register}
                errors={errors}
                placeholder="Enter Request ID"
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
                name="units"
                register={register}
                errors={errors}
                placeholder="Enter Unit"
              />
              <InputField
                label="Quantity"
                type="number"
                name="quantity"
                register={register}
                errors={errors}
                placeholder="Enter Quantity"
              />
              <InputField
                label="Site Location"
                type="text"
                name="siteLocation"
                register={register}
                errors={errors}
                placeholder="Enter Site Location"
              />
              <InputField
                label="Required On"
                type="date"
                name="requiredOn"
                register={register}
                errors={errors}
                placeholder="Select Required Date"
              />
              <InputField
                label="Status"
                type="select"
                name="status"
                register={register}
                errors={errors}
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Approved", label: "Approved" },
                  { value: "Rejected", label: "Rejected" },
                ]}
                placeholder="Select Status"
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

export default AddPurchaseRequestSite;
