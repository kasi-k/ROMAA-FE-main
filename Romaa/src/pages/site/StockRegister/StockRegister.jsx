import React from 'react'
import Table from '../../../components/Table'
import Filters from '../../../components/Filters'
import { stockRegisterData } from '../../../components/Data'

const StockRegister = () => {
    const stockRegisterColumns = [
        {label: "Material", key: "material"},
        {label: "Unit", key: "unit"},
        {label:"Opening Stock", key: "openingStock"},
        {label:"Received",key: "received"},
        {label:"Issued", key: "issued"},
        {label:"Balance", key: "balance"},
        {label:"Status", key: "status"},
    ]
  return (
    
    <Table
        title={"Site Management"}
        subtitle={"Stock Register"}
        pagetitle={"Stock Register"}
        endpoint={stockRegisterData}
        columns={stockRegisterColumns}
        EditModal={true}
        routepoint={"viewstockregistersite"} 
        FilterModal={Filters} 
        AddModal={false} 
     />
  )
}

export default StockRegister
