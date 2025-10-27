import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../../components/Modal";
import { InputField } from "../../../components/InputField";

const schema = yup.object().shape({
  material: yup.string().required("Material is required"),
  unit: yup.string().required("Unit is required"),
  poQty: yup
    .number()
    .typeError("PO Qty must be a number")
    .required("PO Qty is required"),
  recievedQty: yup
    .number()
    .typeError("Recieved Qty must be a number")
    .required("Recieved Qty is required"),
  pending: yup
    .number()
    .typeError("Pending must be a number")
    .required("Pending is required"),
  orderedDate: yup.date().required("Ordered Date is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
});

const AddMaterial = ({ onclose }) => {
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
      title={"Add Material Recieved"}
      onclose={onclose}
      widthClassName={"lg:w-[500px] md:w-[500px] w-[96]"}
      child={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-6">
            <div className="lg:space-y-4 space-y-3">
              <InputField
                label="Material"
                type="text"
                name="material"
                register={register}
                errors={errors}
                placeholder="Enter material"
              />
              <InputField
                label="Unit"
                type="text"
                name="unit"
                register={register}
                errors={errors}
                placeholder="Enter unit"
              />
              <InputField
                label="PO Qty"
                type="number"
                name="poQty"
                register={register}
                errors={errors}
                placeholder="Enter PO Qty"
              />
              <InputField
                label="Recieved Qty"
                type="number"
                name="recievedQty"
                register={register}
                errors={errors}
                placeholder="Enter Recieved Qty"
              />
              <InputField
                label="Pending"
                type="number"
                name="pending"
                register={register}
                errors={errors}
                placeholder="Enter Pending Qty"
              />
              <InputField
                label="Oredered Date"
                type="date"
                name="orderedDate"
                register={register}
                errors={errors}
                placeholder="Select Ordered Date"
              />
              <InputField
                label="Amount"
                type="number"
                name="amount"
                register={register}
                errors={errors}
                placeholder="Enter Amount"
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

export default AddMaterial;
