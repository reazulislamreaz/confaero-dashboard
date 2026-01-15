import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
 
import { Button, Form, notification } from "antd";
import '../../../index.css'
 
// import toast, { Toaster } from "react-hot-toast";
 
// const decodeHtml = (html) => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// };

const EditPrivacy = () => {
//  const {id} = useParams()
 
 
//  const [updatePrivacy, {isLoading}] = useUpdatePrivacyMutation(id)
//   const {data: privacy} = usePrivacyPolicyQuery()
//   // console.log(privacy)
  const editor = useRef(null);
  const navigate = useNavigate() 
 
  
 
const [content, setContent] = useState("");
 
// useEffect(() => {
//   if (privacy?.data?.attributes?.docs?.length) {
//     // Decode the HTML content before setting it
//     const decodedContent = decodeHtml(privacy.data.attributes.docs[0].content);
//     setContent(decodedContent);
//   }
// }, [privacy]);
 
//   const dataContent  = {
//     content:content 
//   }
// console.log(content);


  const handlePostPrivacy = async (values) => {
  
    // console.log(content);
    
    
    navigate("/dashboard/settings/privacypolicy")
 
    // try{
     
    //   const res = await updatePrivacy({id, content}).unwrap();
    //   console.log(res.message);
      
    //    if(res?.code ==200){
    //     toast.success(res?.message)
    //    }
    //    setTimeout(() => {
        
    //      navigate("/dashboard/settings/privacypolicy")
    //    },1000);
    // }catch(error){
    //   console.log(error);
      
    // } 
  }
  

  return (
    <div className="mt-8 mx-6">
  
        <Link to ='/dashboard/settings/privacypolicy' className="flex items-center gap-2">
      <FaCircleArrowLeft className=" !text-[#04D9FF] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Edit Privacy Policy</p>
      </Link>
      <Form
     labelCol={{ span: 22 }}
     wrapperCol={{ span: 40 }}
     layout="vertical"
     initialValues={{
       remember: true,
       
     }}
     onFinish = {handlePostPrivacy}
      > 
      <div className="mt-6">
        <JoditEditor 
          ref={editor}
          value ={content}
         
          onChange={(newContent) => {
            setContent(newContent)
          }}
        />
      </div>
      <div className="text-right mt-6">
          <Form.Item>
            <Button 
              htmlType="submit"
              className="h-[44px] w-[260px] !bg-[#04D9FF] rounded-[8px]"
            >
              Update Privacy
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditPrivacy;
