import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {  useLocation, useNavigate } from 'react-router-dom';

import updateImage from '../../public/image/updatepss.png';
import { MdOutlineArrowBackIos } from 'react-icons/md';
 
 
import toast, { Toaster } from 'react-hot-toast';

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

//   const location = useLocation();
//  const queryParams = new URLSearchParams(location.search)
//  const email = queryParams.get('email')

 
  const handlePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const validateConfirmPassword = (rule, value) => {
    const { password } = form.getFieldsValue();
    if (value && value !== password) {
      return Promise.reject('Passwords do not match!');
    }
    return Promise.resolve();
  };

 
  

  const resetPassword = async (values) => {
    // const { password } = values;
    // const resetData = {
    //   password,
    //   email
    // }
 console.log(values);
 navigate('/')
   
    // try{
    //   const res = await reset(resetData).unwrap()
    //   if(res?.code == 200){
    //     toast.success(res?.message)
    //     setTimeout(() => {
    //       navigate('/')
    //     }, 1000);
    //   }
    // }catch(error){
    //   console.log(error);
      
    // }


    };
   

  return (
    <div className="mt-20 h-[680px] shadow-xl w-[1096px] mx-auto bg-[#FFFFFF] rounded-[8px]">
     <Toaster />
      <div className="flex justify-around gap-4 px-10 mt-12 py-4">
        <div className="h-[488px] mt-[100px]">
          <img src={updateImage} alt="Update Password" />
        </div>
        <div className="mt-[150px] w-[50%]">
        <div className="flex items-center gap-2">
         <MdOutlineArrowBackIos className="text-2xl" />

          <h1 className="text-[#222222] font-medium text-xl md:text-2xl">
            Update Pssword!
          </h1>
         </div>
          <Form
            form={form}
            layout="vertical"
            className="mt-5"
            onFinish={resetPassword}
          >
            <Form.Item
              label="New Password"
              name="password"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password
                className="w-[494px] mb-4  bg-[#E6F9EF] h-12 rounded-[6px]"
                placeholder="New password"
                iconRender={visible => (
                  visible
                    ? <EyeOutlined onClick={handlePasswordVisibility} />
                    : <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                className="w-[494px] mb-4 bg-[#E6F9EF] h-12 rounded-[6px]"
                placeholder="Confirm Password"
                iconRender={visible => (
                  visible
                    ? <EyeOutlined onClick={handleConfirmPasswordVisibility} />
                    : <EyeInvisibleOutlined onClick={handleConfirmPasswordVisibility} />
                )}
              />
            </Form.Item>
            <Button 
            // loading={isLoading}
              type="primary"
              htmlType="submit"
           className="block w-full !h-[52px] px-2 py-4 mt-2 text-[#FFFFFF] !bg-[#594756]"
            >
              Update Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
