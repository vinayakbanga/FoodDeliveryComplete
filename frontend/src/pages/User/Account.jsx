import React, { Fragment, useEffect } from 'react';
import Metadata from '../Metadata';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

const Account = () => {
    const { user,loading, isAuthenticated } = useSelector((state) => state.user);
    // const userRole = user && user.user ? user.user.name : null;
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated === false){
            navigate('/login');
        }
      
    
      
    }, [navigate,isAuthenticated])
    
    // // Dummy state for new password
    // const [newPassword, setNewPassword] = useState('');

    // // Dummy state for updated profile information
    // const [updatedProfile, setUpdatedProfile] = useState({
    //     fullName: user && user.name,
    //     email: user && user.email,
    // });

    // const handleUpdatePassword = () => {
    //     // Dummy logic for updating password
    //     // You can replace this with your actual logic
    //     console.log('Updating password...');
    //     // Add your password update logic here
    // };

    // const handleUpdateProfile = () => {
    //     // Dummy logic for updating profile
    //     // You can replace this with your actual logic
    //     console.log('Updating profile...');
    //     // Add your profile update logic here
    // };

    return (
        <Fragment>
            <Metadata title={`Users Profile`} />
            {loading?<Loader/>:( <div className='container mx-auto my-10 p-6 bg-white rounded-lg shadow-md h-screen'>
                <h2 className='text-2xl font-bold mb-4'>My Profile</h2>

                <div className='flex flex-col space-y-4 justify-center items-center'>
                    <div className='flex items-center'>
                        <span className='font-bold mr-2'>Full Name:</span>
                        <span>{user && user.name}</span>
                    </div>

                    <div className='flex items-center'>
                        <span className='font-bold mr-2'>Email:</span>
                        <span>{user && user.email}</span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='font-bold mb-2'>My Orders:</span>
                        {user && user.orders && user.orders.length > 0 ? (
                            <ul className='list-disc pl-6'>
                                {user.orders.map((order) => (
                                    <li key={order.orderId}>{/* Display order details */}</li>
                                ))}
                            </ul>
                        ) : (
                            <span>No orders found.</span>
                        )}
                    </div>

                    <div className='flex items-center space-x-4'>
                        {/* <button onClick={handleUpdatePassword} className='btn'>
                            Update Password
                        </button> */}
                        <Link to="/password/update" className='border-2 bg-orange-500 rounded-full px-5 p-3 text-white hover:text-orange-500 hover:bg-white hover:border-orange-500'>Change Password</Link>
                        <Link to="/me/update" className='border-2 bg-orange-500 rounded-full px-5 p-3 text-white hover:text-orange-500 hover:bg-white hover:border-orange-500'>Update Profile</Link>
                    </div>
                </div>
            </div>)}
           
        </Fragment>
    );
};

export default Account;
