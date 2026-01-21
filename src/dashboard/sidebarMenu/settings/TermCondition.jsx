import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
 
 
// const decodeHtml = (html) => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// };

const TermCondition = () => {
  const [content, setContent] = useState("");
//  const {data: termcondition} = useTearmConditonQuery()
//  console.log(termcondition); 
  const navigate = useNavigate(); 
//   console.log(termcondition?.data?.attributes?.docs[0]._id);
  

//   useEffect(() => {
//     if (termcondition?.data?.attributes?.docs?.length) {
//       // Decode the HTML content before setting it
//       const decodedContent = decodeHtml(termcondition?.data?.attributes?.docs[0].content);
//       setContent(decodedContent);
//     }
//   }, [termcondition]);


 


  return (
    
    <div className=" mt-8 mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Terms & Condition</p>
      </Link>
      <div className='mt-4'>
        {/* <p dangerouslySetInnerHTML={{ __html: termCondition?.data?.attributes[0]?.content }}> 
        </p> */}
          {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
          <p>termcomditions</p>
       
      </div>
      <div className=" text-right mt-16">
        <button onClick={() => navigate(`/dashboard/settings/edittermcondition`)}  
        className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
        >Edit</button>
      </div>
    </div>
  );
};

export default TermCondition;
