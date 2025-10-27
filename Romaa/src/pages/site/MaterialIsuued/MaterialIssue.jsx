import React from 'react'
import Filters from '../../../components/Filters'
import { TbPlus } from 'react-icons/tb'
import { materialIssueData } from '../../../components/Data'
import Table from '../../../components/Table'
import AddMaterialIssue from './AddMaterialIssue'

const MaterialIssue = () => {
  const materialIssueColumns = [
    {label:"Site Name", key:"siteName"},
    {label:"Material", key:"material"},
    {label:"Unit", key:"unit"},
    {label:"Issued Qty", key:"issuedQty"},
    {label:"Work Location", key:"workLocation"},
    {label:"Priority Level", key:"priorityLevel"},
    {label:"Requested By", key:"requestedBy"}
  ]
  return (
   <Table
      title={"Site Management"}
      subtitle={"Material Issue"}
      pagetitle={"Material Issue"}
      endpoint={materialIssueData}
      columns={materialIssueColumns}
      EditModal={true}
      routepoint={"viewmaterialissued"}
      FilterModal={Filters}
      AddModal={AddMaterialIssue}
      addButtonIcon={<TbPlus className="text-2xl text-primary" />}
      addButtonLabel={"Add Material Issue "}
    />
  )
}

export default MaterialIssue
