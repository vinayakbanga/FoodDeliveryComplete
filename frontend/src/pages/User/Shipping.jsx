import React, { Fragment, useState } from "react";
// import "./Shipping.css"
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../Actions/cartActions";
import Metadata from "../Metadata";
import PinDropIcon from "@mui/icons-material/PinDrop"
import { Home } from "@mui/icons-material";
import { LocationCity } from "@mui/icons-material";
import { Public } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import { TransferWithinAStation } from "@mui/icons-material";
import { Country, State } from "country-state-city";
// import { useAlert } from "react-alert";
// import CheckoutSteps from "../Cart/CheckoutSteps";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
//   const alert = useAlert();
  const { shippinginfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippinginfo.address);
  const [city, setCity] = useState(shippinginfo.city);
  const [state, setState] = useState(shippinginfo.state);
  const [country, setCountry] = useState(shippinginfo.country);
  const [pinCode, setPinCode] = useState(shippinginfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippinginfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <Metadata title="Shipping details"/>
       <CheckoutSteps activeStep={0}/>
      <div className="bg-zinc-200 flex justify-center items-center min-h-screen   ">
        <div className=" shipingBox border-2 ">
          <h2 className="text-center font-bold text-lg md:text-3xl  mb-5">Shipping details</h2>

          <form
            className="shippingForm bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 m-6"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="flex items-center gap-2 mb-3 ">
              <Home className="block text-gray-700 text-sm font-bold mb-2" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <LocationCity className="block text-gray-700 text-sm font-bold mb-2" />
              <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <PinDropIcon className="block text-gray-700 text-sm font-bold mb-2" />
              <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Phone className="block text-gray-700 text-sm font-bold mb-2" />
              <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Public className="block text-gray-700 text-sm font-bold mb-2" />

              <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="flex items-center gap-2 mb-3">
                <TransferWithinAStation className="block text-gray-700 text-sm font-bold mb-2" />

                <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="text-center">

            <input
              type="submit"
              value="Continue"
              className="shippingBtn  bg-orange-500  text-gray-100  font-bold py-2 border-2 px-4 rounded-full hover:bg-gray-100 hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:shadow-outline"
              disabled={state ? false : true}
            />
            </div>
          </form>


        </div>
      </div>
      
    </Fragment>
  );
};

export default Shipping;
