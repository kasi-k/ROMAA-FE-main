import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Generaldata = [
  { label: "Business Type", value: "Contractor" },
  { label: "Project Division", value: "Housing" },
  { label: "Project Name", value: "Madurai shed" },
  { label: "Project Type", value: "Industrial"},

];

const schema = yup.object().shape({
  project_name: yup.string().required("Project Name is required"),
  project_type: yup.string().required("Project Type is required"),
  business_type: yup.string().required("Business Type is required"),
  project_division: yup.string().required("Project Division is required"),
});

const GeneralSetup = () => {

  
  return (
    <div className="h-full">
      <div className=" dark:bg-layout-dark bg-white w-full rounded-md p-6">
        <div className="flex flex-col col-span-2 sm:grid grid-cols-3 w-full gap-3">
          {Generaldata.map((field, idx) => (
            <React.Fragment key={idx}>
              <p className="text-sm col-span-1 font-bold dark:text-white text-gray-800">
                {field.label}
              </p>
              <p className="text-sm col-span-2 dark:text-gray-400 text-gray-600">
                {field.value}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralSetup;