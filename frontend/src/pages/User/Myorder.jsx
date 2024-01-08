import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myOrders } from "../../actions/orderAction";
// myOrders
import Loader from '../../Components/Loader';
import { Link, useParams } from "react-router-dom";

// Metadata
import { Launch } from '@mui/icons-material';
import Metadata from '../Metadata';
import { myOrders,clearErrors } from '../../Actions/orderAction';
import { toast } from 'react-toastify';
import { Fragment,useEffect } from 'react';
// DataGrid
// useParams

const Myorder = () => {
    const params=useParams();
    const dispatch = useDispatch();

    // const alert = useAlert();
  
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.row.status === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.row.id}`}>
              <Launch />
            </Link>
          );
        },
      },
    ];
    const rows = [];
  
    orders &&
      orders.forEach((item, index) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myOrders());
    }, [dispatch, error]);
  
    return (
      <Fragment>
        <Metadata title={`${user.name} - Orders`} />
  
        {loading ? (
          <Loader />
        ) : (

        


          <div className="myOrdersPage h-screen">
             <h2 className=" text-center font-bold text-xl my-10">{user.name}'s Orders</h2>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
  
           
          </div>
        )}
      </Fragment>
    );
}

export default Myorder