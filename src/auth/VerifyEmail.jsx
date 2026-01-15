import otpImage from '../../public/image/otp.png';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input'; 

import { Button } from 'antd';
import { MdOutlineArrowBackIos } from 'react-icons/md';
 
 

const VerifyOtp = () => {
    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const [error, setError] = useState('')
    // const email = queryParams.get('email')
    const [otp, setOtp] = useState('');
     const navigate = useNavigate()
//  const [verifyOtp, {isLoading}] = useVerifyEmailMutation()

    //  const verifyData = {
    //     oneTimeCode : otp,
    //        email: email 
    //  }

    const sendOtp = async() => { 
        console.log(otp);
        navigate(`/updatepassword`)
        // try{
        //     const res = await verifyOtp(verifyData).unwrap()
        //     if(res?.code == 200 ){
        //         toast.success(res?.message)
        //         setTimeout(() => {
        //             navigate(`/updatepassword?email=${email}`)
        //         }, 1000)
        //     }
        // }catch(error){
        //     console.log(error);
        //     setError(error?.data?.message)
            
        // }
        

    
    }

    return (
        <div className='w-full max-w-[1296px] shadow-xl mt-12 sm:mt-24 mx-auto rounded-[8px] p-4 sm:p-10'>
            {/* <Toaster position='top-center' reverseOrder = {false} /> */}
            
            <div className="flex flex-col sm:flex-row md:justify-around justify-between items-center gap-4 sm:gap-10">
                <div className='w-full sm:w-[480px] flex justify-center sm:justify-start'>
                    <img src={otpImage} alt="OTP Illustration" className='w-[200px] sm:w-[480px] h-auto' />
                </div>
                <div className='w-full sm:w-[494px] mt-4 sm:mt-0'>
                <div className="flex items-center gap-2">
         <MdOutlineArrowBackIos onClick={() => navigate('/forgotpassword')} className="text-2xl cursor-pointer" />

          <h1 className="text-[#222222] font-medium text-xl md:text-2xl">
            Send Otp!
          </h1>
         </div>
                    <p className='font-poppins text-[14px] sm:text-[16px] font-normal mt-2'>
                        We'll send a verification code to your email. Check your inbox and enter the code here.
                    </p>
                    <div className="py-4 sm:py-6">
                        <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                        <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputStyle={{
                                    height: "52px",
                                    width: "55px", // Default width for mobile
                                    background: "transparent",
                                    border: "1px solid green",

                                    borderRadius: '10px',
                                    marginRight: "8px",
                                    outline: "none",
                                    // Adjusting width for larger screens
                                    sm: {
                                        width: "80px" // Width for larger screens
                                    }
                                }}
                                renderSeparator={<span className="md:w-6"> </span>}
                                renderInput={(props) => <input {...props} className="sm:w-[60px]" />}
                            />
                        </div>
                        <div className='flex justify-between items-center mt-4 sm:mt-6'>
                            <small className='text-[14px] sm:text-[16px] font-normal'>Didn’t receive the code?</small>
                            <small className='text-[14px] sm:text-[16px] font-medium text-[#00BF63] cursor-pointer'>Resend</small>
                        </div>
                    </div>
                        {/* <p className="text-red-500 font-medium">{error}</p> */}
                     
                        <Button  onClick={sendOtp} 
                        className="block w-full h-[52px] px-2 py-4 mt-2 text-[#FFFFFF] !bg-[#594756]"
                         >
                            Verify
                        </Button>
                    
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
