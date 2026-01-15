

 
import { Form, Input, Button } from "antd";
import character from "../../public/image/forgotpass.png";
import { HiOutlineMailOpen } from "react-icons/hi";
 
import { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
 

const ForgotPassword = () => {
 const navigate = useNavigate()
  const [error, setError] = useState('')
 
  const handleForgotPassword = async(values) => {
    console.log("Received values:", values);
    navigate(`/verifyotp`);
    // try{
    //   const res = await forgotpassword(values).unwrap()
    //   // console.log(res);
      
    //   if(res?.code ==200){
    //     toast.success(res?.message)
    //     setTimeout(() => {
    //       navigate(`/verifyotp?email=${values?.email}`);
    //     }, 1000);
    //   }
     
    // }catch(error){
    //  console.log(error);
    //  setError(error?.data?.message)
      
    // }

    // Handle form submission here
   
  };

  return (
    <div className="mt-20 shadow-xl w-[80%] md:w-[1096px] mx-auto bg-white rounded-lg">
      {/* <Toaster position="top-center" reverseOrder = {false} />  */}
     
      
  
      <div className="flex flex-col md:flex-row justify-around gap-4 px-6 md:px-10 py-8 md:py-4">
        
        {/* Image Section */}
        <div className="hidden md:block mt-4 md:mt-[80px] w-full md:w-[490px] h-[300px] md:h-[460px] mx-auto md:mx-0">
          <img src={character} alt="Forgot Password" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[494px] mt-8 md:mt-[140px] mx-auto md:mx-0">
         <div className="flex items-center gap-2">
         <MdOutlineArrowBackIos onClick={() => navigate('/')} className="text-2xl cursor-pointer" />

          <h1 className="text-[#222222] font-medium text-xl md:text-2xl">
            Forgot Password!
          </h1>
         </div>
          <p className="font-poppins text-[14px] md:text-[16px] font-normal mt-2">
            Enter the email address associated with your account. We'll send
            you an OTP to your email.
          </p>

          <Form
            name="forgot_password"
            layout="vertical"
            onFinish={handleForgotPassword}
            className="mt-5"
          >
           <Form.Item
  name="email"
  label={<span className="text-[16px] mt-5 font-medium">Email</span>}
  rules={[
    {
      required: true,
      message: "Please input your email!",
    },
   
  ]}
>
  <Input
    size="large"
    placeholder="Enter Your Email"
    name="email"
    prefix={
      <HiOutlineMailOpen
        className="mr-2 bg-white text-black rounded-full p-[6px]"
        size={28}
        color="red"
      />
    }
    style={{
      height: "52px",
      background: "#E6F9EF",
      outline: "none",
      marginBottom: "20px",
      border: '1px solid green'
    }}
  />
</Form.Item>
{/* <p className="text-red-500 font-medium">{error}</p> */}
            <Form.Item>
              <Button 
            //   loading = {isLoading}
                type="primary"
                htmlType="submit"
            className="block w-full h-[52px] px-2 py-4 mt-2 text-[#FFFFFF] !bg-[#594756]"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
