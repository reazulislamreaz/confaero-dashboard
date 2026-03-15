import { ArrowLeft } from "lucide-react";
import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";

import {
  useFetchUserProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/userSlice/userSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: profileData } = useFetchUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const user = profileData?.data;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });

      setPhoneNumber(user.phone || "");

      if (user.avatar) {
        setImageUrl(user.avatar);
      }
    }
  }, [user, form]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      const payload = {
        data: {
          name: values.name,
          phone: phoneNumber,
        },
        image: fileList[0]?.originFileObj,
      };

      await updateProfile(payload).unwrap();

      navigate("/dashboard/settings/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <Link to="/dashboard/settings/profile">
                <ArrowLeft className="w-6 h-6 text-[#0FC3C2]" />
              </Link>
            </button>

            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Edit Profile
            </h1>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="lg:flex md:flex">
              {/* Left Profile Card */}
              <div className="lg:w-1/3 bg-gradient-to-br from-gray-50 to-blue-50 border-r border-gray-100">
                <div className="flex flex-col justify-center items-center p-8 gap-8">
                  <div className="relative group">
                    <div className="rounded-full overflow-hidden h-48 w-48 mx-auto shadow-2xl ring-4 ring-white">
                      <Upload
                        showUploadList={false}
                        onChange={handleUploadChange}
                      >
                        <img
                          src={
                            imageUrl
                              ? imageUrl
                              : "https://randomuser.me/api/portraits/men/57.jpg"
                          }
                          className="w-full h-full object-cover cursor-pointer"
                          alt="Profile"
                        />
                      </Upload>
                    </div>

                    <Button
                      icon={<LuImagePlus />}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white shadow-md"
                    >
                      Change Picture
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 text-emerald-700 rounded-full text-sm font-semibold uppercase">
                      admin
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800">
                      {user?.name || "Admin"}
                    </h2>

                    <div className="h-1 w-16 bg-gradient-to-r from-[#0FC3C2] to-[#0BC5EA] rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:w-2/3 p-8 lg:p-12 space-y-8">
                <Form.Item
                  label={<span className="text-xl font-semibold">Name</span>}
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input
                    className="p-5 text-lg rounded-xl"
                    placeholder="Name"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xl font-semibold">Email</span>}
                  name="email"
                >
                  <Input
                    readOnly
                    className="p-5 text-lg rounded-xl bg-gray-100"
                  />
                </Form.Item>

                <div>
                  <label className="text-xl font-semibold block mb-3">
                    Phone Number
                  </label>

                  <PhoneInput
                    international
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className="p-4 rounded-xl border"
                  />
                </div>

                <Button
                  htmlType="submit"
                  className="w-full h-14 mt-8 !bg-[#0FC3C2] text-lg font-semibold rounded-xl"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;