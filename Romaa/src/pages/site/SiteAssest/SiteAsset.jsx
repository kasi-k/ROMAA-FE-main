import React from 'react'
import Table from '../../../components/Table'
import Filters from '../../../components/Filters'
import { siteAssetData } from '../../../components/Data'

const SiteAsset = () => {
    const siteAssestColumns = [
        {label: "Asset Name", key: "assetName"},
        {label: "Asset Type", key: "assetType"},
        {label:"Unit", key: "unit"},
        {label:"Alloted To", key: "allotedTo"},
        {label:"Site Location", key: "siteLocation"},
        {label:"Date",key: "date"},
        {label:"Status", key: "status"},
    ]
  return (
   <Table  
   title={"Site Management"}
   subtitle={"Site Asset"}
   pagetitle={"Site Asset"}
   endpoint={siteAssetData}
   columns={siteAssestColumns}
   EditModal={false}
   routepoint={"viewsiteassest"}
   FilterModal={Filters}
   ViewModal={true}
  
   />
  )
}

export default SiteAsset
