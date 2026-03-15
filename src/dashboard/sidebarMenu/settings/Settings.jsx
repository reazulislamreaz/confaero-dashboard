import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { useChangePasswordMutation } from "../../../redux/features/userSlice/userSlice";

const Settings = () => {
  const navigate = useNavigate();
  const [changePasswordApi] = useChangePasswordMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // const changePassword = (values) => {
  //   const { confirmPassword, ...ChangePassword } = values;
  //   console.log("Form values: ", ChangePassword);
  // };
  const changePassword = async (values) => {
    const { confirmPassword, ...rest } = values;

    const payload = {
      ...rest,
      currentPassword: confirmPassword,
    };

    try {
      const res = await changePasswordApi(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Password changed successfully");
        setIsModalOpen(false);
      } else {
        toast.error(res?.message || "Password change failed");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Password change failed");
    }
  };

  return (
    <div className=" mx-6 ">
      <h1 className="font-semibold text-[30px]">Settings</h1>
      <div>
        <div
          onClick={openModal}
          className="mt-8 cursor-pointer flex justify-between border rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-[#616161]">
            Change Password
          </p>
          <p className="mr-8 px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </p>
        </div>
        <Modal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="flex flex-col w-[80%] mx-auto ">
            <h2 className="text-[28px] text-left font-semibold mb-4">
              Change Password
            </h2>
            <p className="  mb-8 text-gray-600">
              Your password must be 8-10 character long.
            </p>
            <Form
              name="changePassword"
              layout="vertical"
              onFinish={changePassword}
            >
              <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your old password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    outline: "none",

                    border: "1px solid green",
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
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    outline: "none",

                    border: "1px solid green",
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
                        new Error(
                          "The two passwords that you entered do not match!",
                        ),
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

                    border: "1px solid green",
                  }}
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

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

        {/* Privacy policy */}
        <div
          onClick={() => navigate("/dashboard/settings/profile")}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] text-[#616161] ml-8 font-medium">
            Personal Information
          </p>
          <Link
            to="/dashboard/settings/privacypolicy"
            className="mr-8 text-[#616161] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>

        <div
          onClick={() => navigate("/dashboard/settings/organizer-guideline")}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] text-[#616161] ml-8 font-medium">
            Organizer Guideline
          </p>
          <Link
            to="/dashboard/settings/privacypolicy"
            className="mr-8 text-[#616161] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>

        <div
          onClick={() => navigate("/dashboard/settings/privacypolicy")}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] text-[#616161] ml-8 font-medium">
            Privacy Policy
          </p>
          <Link
            to="/dashboard/settings/privacypolicy"
            className="mr-8 text-[#616161] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
        <div
          onClick={() => navigate("/dashboard/settings/termcondition")}
          className="mt-8 flex justify-between cursor-pointer bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] text-[#616161] ml-8 font-medium">
            Terms and Condition
          </p>
          <Link
            to="/dashboard/settings/termcondition"
            className="mr-8 text-[#616161] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
        <div
          onClick={() => navigate("/dashboard/settings/about")}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] text-[#616161] ml-8 font-medium">
            About Us
          </p>
          <Link
            to="/dashboard/settings/about"
            className="mr-8 text-[#616161] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
