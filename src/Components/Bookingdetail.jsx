import React, { useContext, useState } from 'react';
import { AuthContext } from './Authprovide';
import trash from "../assets/icons8-trash-24.png";
import calender from "../assets/icons8-calendar-64.png";
import Swal from 'sweetalert2';

const Bookingdetail = ({ bcl }) => {
  const { _id, model, car_image, date, daily_price, status } = bcl;
  const [ndatee, setNdate] = useState("");
  const { user } = useContext(AuthContext);

  const handlemodal = (id, model) => {
    document.getElementById('my_modal_1').showModal();
    document.getElementById('cancel_nid').value = id;
    document.getElementById('cancel_name').value = model;
  };

  const handlemodal2 = (id) => {
    document.getElementById('my_modal_2').showModal();
    document.getElementById('cancel_nid').value = id;
  };

  const handleclick = (e) => {
    e.preventDefault();
    const nid = document.getElementById('cancel_nid').value;
    const nmodel = document.getElementById('cancel_name').value;

    fetch(`${import.meta.env.VITE_API_URL}/bookingdetails/${nid}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: "Canceled", model: nmodel })
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Canceled!',
          text: 'Canceled Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById('my_modal_1').close();
        document.getElementById('dbtn').disabled = true;
      });
  };

  const handleform = (e) => {
    e.preventDefault();
    const ndate = document.getElementById('date').value;
    const nid = document.getElementById('cancel_nid').value;

    fetch(`${import.meta.env.VITE_API_URL}/bookingdetails/${nid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: ndate })
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'Booking date updated successfully.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById('my_modal_2').close();
      });
  };

  return (
    <>
      <tr className="hover:shadow-inner hover:shadow-orange-200 text-xs sm:text-sm md:text-base">
        <td className="p-2 sm:p-3">
          <img src={car_image} className="w-20 sm:w-28 md:w-32 lg:w-40 rounded" alt="Car" />
        </td>
        <td className="p-2 sm:p-3 break-words max-w-[120px] sm:max-w-[160px]">{model}</td>
        <td className="p-2 sm:p-3 whitespace-nowrap">{date}</td>
        <td className="p-2 sm:p-3">{daily_price}</td>
        <td className="p-2 sm:p-3 text-center">{status}</td>
        <td className="p-2 sm:p-3 flex flex-col gap-2 items-start sm:items-center">
       <button
    onClick={() => handlemodal(_id, model)}
    className="btn bg-red-500 hover:bg-red-600 border-none text-white flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded"
    id="dbtn"
  >
    <img src={trash} className="w-3 sm:w-4" alt="Cancel" />
    Cancel
  </button>

  <button
    onClick={() => handlemodal2(_id)}
    className="btn bg-blue-500 hover:bg-blue-600 border-none text-white flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded"
  >
    <img src={calender} className="w-3 sm:w-4" alt="Modify" />
    Modify
  </button>
        </td>
      </tr>

      {/* Cancel Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-sm bg-white">
          <h3 className="text-center pb-4 text-lg font-bold">Booking Summary</h3>
          <p>Are you sure you want to cancel this booking?</p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-center gap-4">
              <input type="hidden" id="cancel_nid" name="cancel_nid" />
              <input type="hidden" id="cancel_name" name="cancel_name" />
              <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white" onClick={handleclick}>Yes</button>
              <button className="btn bg-red-500 hover:bg-red-600 border-none text-white">No</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modify Date Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-sm bg-white">
          <h3 className="text-center pb-4 text-lg font-bold">Modify Booking Date</h3>
          <form>
            <input type="hidden" id="cancel_nid" name="cancel_nid" />
            <div className="form-control mb-4 bg-white">
              <label className="label">
                <span className="label-text text-black">Booking Date</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="input input-bordered bg-white"
                onChange={(e) => setNdate(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="btn bg-orange-500 hover:bg-orange-600 border-none text-white"
                onClick={handleform}
              >
                Confirm
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog" className="flex justify-center">
              <button className="btn bg-red-500 border-none text-white">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Bookingdetail;