import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
 
 
 

const EditProfiel = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fileList, setFileList] = useState([]);
  
  
 
  const [imageUrl, setImageUrl] = useState();
 
//  console.log(profile?.data?.attributes);
 
//  const initialValues = {
//   name: profile?.data?.attributes?.name ||'',
//   email: profile?.data?.attributes?.email ||'',
//   phoneNumber: profile?.data?.attributes?.phoneNumber ||'',
// };

// useEffect(() => {
//   if (profile?.data?.attributes) {
//     setPhoneNumber(profile.data.attributes.phoneNumber || '');
//     const existingImageUrl = url + profile?.data?.attributes?.image;
//     if (existingImageUrl) {
//       setImageUrl(existingImageUrl);
//     }
//     initialValues.fullName = profile.data.attributes.fullName || '';
//     initialValues.email = profile.data.attributes.email || '';
//   }
// }, [profile]);




  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };
//  console.log("fileeeeeeeeeeeeeeeeeeeee", imageUrl);
//  console.log(fileList, phoneNumber);
 
 
  const handleUpdateProfile = async (values) => {
    console.log(values); 
    
    
    // const formData = new FormData();
    // formData.append("name", values?.name); 
    // formData.append("phoneNumber", phoneNumber);
    // if (fileList[0]?.originFileObj) {
    //   formData.append("image", fileList[0].originFileObj);
    //   // formData.append("image", imageUrl);
    // }
    // try{
    //   const res = await updateProfile(formData).unwrap();
    //   console.log(res);
    //   if(res?.code === 200){
    //     toast.success(res?.message)
    //   }
    //   setTimeout(() => {
    //     navigate('/dashboard/profile')
    //   }, 1000);
      
    // }catch(error){
    //   console.log(error?.data);
       
    // }
     
  };

  return (
    <div className="">
      {/* <Toaster /> */}
      <div
        onClick={() => navigate("/dashboard/settings/profile")}
        className="flex items-center cursor-pointer ml-6 mt-10 mb-16"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-x  font-medium ml-2">Edit Profile</h1>
      </div>

      <div className="mx-6 p-9 rounded-xl bg-white shadow-md">
        <Form
          layout="vertical"
          // initialValues={initialValues}
          autoComplete="off"
          onFinish={handleUpdateProfile}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border">
              <div className="relative w-56 h-56 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
                <Upload
                  name="avatar"

                  showUploadList={false}
                  onChange={handleUploadChange}
                 
                >
                  <img
                    className="w-44 h-44 rounded-full"
                    src={imageUrl}
                    in
                    alt="Profile"
                  />
                  <Button
                    className="border-none text-md text-blue-500 absolute bottom-6 flex items-center"
                    icon={<LuImagePlus size={20} className="mr-2" />}
                  >
                    Change Picture
                  </Button>
                </Upload>

              </div>


              <div className="text-center mt-6">
                <p className="text-lg">{'admin'}</p>
                <h1 className="text-2xl font-medium">{"absayed"}</h1>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-2/3">
              <div className="flex flex-col gap-6">
                <Form.Item
                  label={<span className="text-lg font-medium">Name</span>}
                  name="name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                  // initialValue={"absayed"}
                >
                  <Input
                    placeholder="Name"
                    className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-lg font-medium">Email</span>}
                  name="email"
                  
                  rules={[{ required: true, message: "Please input your email!" }]}
                  // initialValue={"ab@gamil.com"}
                >
                  <Input
                    placeholder="Email"
                    readOnly
                    className="p-4 rounded-lg border-gray-300 bg-gray-100"
                   
                  />
                </Form.Item>

                <div className="flex flex-col">
                  <label className="text-lg font-medium mb-2">Phone Number</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    international
                    // defaultCountry="us"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className="p-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    style={{ height: '50px',  }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            htmlType="submit"
            className="w-full mt-12 h-14 !bg-[#0FC3C2] rounded-lg text-lg font-medium"
          >
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfiel;
