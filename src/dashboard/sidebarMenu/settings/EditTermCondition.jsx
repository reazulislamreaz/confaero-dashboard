
import { Button, Form } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
 
// import Swal from "sweetalert2";
// const decodeHtml = (html) => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// };
 

const EditTermCondition = () => {
//   const {data: termcondition} = useTearmConditonQuery()
//   const {id} = useParams()
//   const [updateTC, {isLoading}] =  useUpdatetermConditionMutation(id)
  // console.log(addTermCondition);
  const editor = useRef(null);
  const [content, setContent] = useState(" "); 
  const navigate = useNavigate() 
//   useEffect(() => {
//     if (termcondition?.data?.attributes?.docs?.length) {
//       // Decode the HTML content before setting it
//       const decodedContent = decodeHtml(termcondition.data.attributes.docs[0].content);
//       setContent(decodedContent);
//     }
//   }, [termcondition]); 
 

  const handleEditTermCondition = async () => {
    navigate("/dashboard/settings/termcondition")
    // try{
      
    //   const res = await updateTC({id: id, content}).unwrap();
    //   if(res?.code ==200){
    //     toast.success(res?.message)
    //   }
    //   setTimeout(() => {
    //     navigate("/dashboard/settings/termcondition")
    //   }, 1000);
    // }
    // catch(error){
    //    console.log(error);
       
    //   }
       
   
  }
    
  return (
    <div className="mt-8 mx-6">
      {/* <Toaster position="top-center" reverseOrder= {false} /> */}
        <Link to ='/dashboard/settings/termcondition' className="flex items-center gap-2">
      <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Edit Term&Condition</p>
      </Link>
      <Form
     labelCol={{ span: 22 }}
     wrapperCol={{ span: 40 }}
     layout="vertical"
     initialValues={{
       remember: true,
       
     }}
     onFinish = {handleEditTermCondition}
      > 
      <div className="mt-6">
        <JoditEditor 
          ref={editor}
          value={content} 
          onChange={(newContent) => {
            setContent(newContent)
          }}
        />
      </div>
      <div className="text-right mt-6">
          <Form.Item>
            <Button 
              htmlType="submit"
            className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
            >
              Update termCondition
            </Button>
          </Form.Item>
        </div>
      </Form>
       
    </div>
  );
};

export default EditTermCondition;
