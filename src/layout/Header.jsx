
 
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar, Badge, Button, Modal, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";
 
import { IoIosNotificationsOutline } from "react-icons/io";
// import { FaRegUser } from "react-icons/fa6";
import './header.css' 
import Swal from "sweetalert2";
import { useState } from "react";
import { MessageCircle, MessageCircleCodeIcon, MessageSquareMore } from "lucide-react";
  
 
 
 
 

const Header = () => {

 
  const navigate = useNavigate();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [error, setError] = useState('')
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000
        });
        navigate('/');
      }
    });
  };

  const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    console.log("Form values: ", ChangePassword);
 
  // try{
  //   const res = await passwordChange(ChangePassword).unwrap();
  //   if(res?.code == 200){
  //     setIsModalOpen(false)
  //     toast.success(res?.message)
  //   }
  //   setTimeout(() => { 
  //     navigate('/dashboard/home')
  //   }, 1000);
    
  // }catch(error){
  //   console.log(error.data);
  //   setError(error?.data?.message)
    
  // }
};
 

const handleMenuVisibility = (visible) => {
  setMenuVisible(visible);
};
 

  return (
    <div className=" flex justify-between items-center shadow-md mb-[24px] p-[16px] rounded-md bg-[#FFF]"> 
    {/* <Toaster /> */}
     <div className="flex items-center gap-1.5
     ">
      <img className="h-12 rounded-full" src="https://randomuser.me/api/portraits/men/57.jpg" alt=""/>
      <h1 className=" font-bold">AbSayed  <br /><span className="text-#2E978C font-normal">Organizer Panel</span></h1>
       
     </div>

      <div className="flex gap-5 items-center">
        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        <div
          onClick={(e) => navigate("/dashboard/notification")}
          className="relative flex items-center"
        >
          <Badge style={{ backgroundColor: "red", marginTop:'10px', marginRight:'5px' }} count={2}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={` bg-primary w-[52px] h-[52px] rounded-full p-2 `}
            />
          </Badge>
        </div>
        <div className=" cursor-pointer" 
         onClick={() => navigate("/dashboard/messages")}
        >
          <MessageSquareMore />
        </div>
        {/* </Dropdown> */}
        {/* <div
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center cursor-pointer mr-[30px] bg-primary 
          w rounded-full p-1"
        >
          <FaRegUser className="text-[#Ffff] border-2 border-[#Fffff] rounded-full p-2 w-[52px] h-[52px]" />
        </div> */}
        <div>
        {/* <Dropdown className="px-2" overlay={menu} trigger={['click']} onVisibleChange={handleMenuVisibility}> */}
  
  {/* </Dropdown> */}
        </div>
        <Modal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="flex flex-col w-[80%] mx-auto ">
            <h2 className="text-[28px] text-left font-semibold mb-4">Change Password</h2>
            <p className="  mb-8 text-gray-600">Your password must be 8-10 character long.</p>
            <Form
              name="changePassword"
              layout="vertical"
              onFinish={changePassword}
             
            >
              <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[{ required: true, message: "Please enter your old password!" }]}
              >
                <Input.Password
                 style={{
                  height: "40px",
                  background: "#E6F9EF",
                  outline: "none",
                 
                  border: '1px solid green'
                }}
                  placeholder="Old Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "Please enter your new password!" }]}
              >
                <Input.Password
                   style={{
                    height: "40px",
                    background: "#E6F9EF",
                    outline: "none",
                   
                    border: '1px solid green'
                  }}
                  placeholder="New Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords that you entered do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    outline: "none",
                   
                    border: '1px solid green'
                  }}
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              {/* <p className="text-red-500 font-medium">{error}</p> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-10 py-3 !bg-[#69C0BE] !text-black text-[16px] rounded-md"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;