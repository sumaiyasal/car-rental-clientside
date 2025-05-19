import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Authprovide';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Mycar = ({ car, setMycars }) => {
    const { user } = useContext(AuthContext);
    const { car_image, model, daily_price, booking_count, availability, date_posted, rnumber, features, location, _id, description } = car;
    const navigate = useNavigate();

    const handledelete = () => {
        fetch(`${import.meta.env.VITE_API_URL}/cars/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setMycars(prevCars => prevCars.filter(car => car._id !== _id));
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newcar = {
            car_image: form.car_image.value,
            model: form.model.value,
            description: form.description.value,
            availability: form.availability.value,
            rnumber: form.rnumber.value,
            booking_count: form.bcount.value,
            location: form.location.value,
            daily_price: form.daily_price.value,
            email: form.email.value,
            displayName: form.name?.value || user.displayName,
            date_posted,
            status: form.status.value,
            features: Array.from(form.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value)
        };

        fetch(`${import.meta.env.VITE_API_URL}/cars/${_id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newcar)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    form.reset();
                    navigate(0);
                }
            });
    }

    return (
        <tr className="text-sm">
            <td><img src={car_image} alt="Car" className="w-32 h-20 object-cover" /></td>
            <td>{model}</td>
            <td>{daily_price}</td>
            <td>{booking_count}</td>
            <td>{availability}</td>
            <td>{date_posted}</td>
            <td>
                <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white btn-sm" onClick={() => document.getElementById('my_modal_1').showModal()}>Update</button>
            </td>
            <td>
                <button className="btn bg-red-300 hover:bg-red-400 border-none text-black btn-sm" onClick={handledelete}>Delete</button>
            </td>

            <dialog id="my_modal_1" className="modal ">
                <div className="modal-box bg-white text-black w-full max-w-2xl p-4 overflow-y-auto max-h-[90vh]">
                    <h1 className="text-2xl font-bold text-center mb-4">Update Car Info</h1>
                    <form onSubmit={handleSubmit} className="grid gap-4 bg-white">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input name="model" defaultValue={model} placeholder="Model" className="input input-bordered bg-white w-full" required />
                            <input name="daily_price" defaultValue={daily_price} placeholder="Daily Price" className="bg-white input input-bordered w-full " required />
                            <input name="availability" defaultValue={availability} placeholder="Availability" className="input input-bordered w-full bg-white" required />
                            <input name="rnumber" defaultValue={rnumber} placeholder="Registration No." className="input input-bordered w-full bg-white" required />
                        </div>

                        <div>
                            <label className="font-semibold">Features</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {["GPS", "Air Conditioning", "Bluetooth", "Automatic Transmission", "Heated Seats", "Sunroof"].map((feature, i) => (
                                    <label key={i} className="flex items-center gap-2">
                                        <input type="checkbox" name="features" value={feature} />
                                        <span>{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <textarea name="description" defaultValue={description} placeholder="Description" className="textarea textarea-bordered w-full bg-white" required></textarea>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <input name="bcount" defaultValue={booking_count} placeholder="Booking Count" className="input input-bordered w-full bg-white" required />
                            <input name="car_image" defaultValue={car_image} placeholder="Car Image URL" className="input input-bordered w-full bg-white" required />
                            <input name="location" defaultValue={location} placeholder="Location" className="input input-bordered w-full bg-white" required />
                            <input type="text" name="status" defaultValue="Pending" className="input input-bordered w-full bg-white" />
                        </div>

                        <input name="email" type="email" value={user.email} readOnly className="input input-bordered w-full bg-white" required />

                        <div className="modal-action mt-4 flex justify-between">
                            <button type="submit" className="btn bg-green-700 text-white border-none">Update</button>
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </tr>
    );
};

export default Mycar;