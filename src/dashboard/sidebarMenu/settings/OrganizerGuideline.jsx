import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
 
import { Button } from "antd";
 
// const decodeHtml = (html) => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// };

const OrganizerGuideline = () => {
 
  const navigate = useNavigate(); 
  const [content, setContent] = useState("");
 
 

 
//   useEffect(() => {
//     if (aboutus?.data?.attributes?.docs?.length) {
//       const decodedContent = decodeHtml(aboutus.data.attributes.docs[0].content);
//       setContent(decodedContent);
//     }
//   }, [aboutus]);

 

  return (
    
    <div className=" mt-8 mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Organizer Guideline</p>
      </Link>
      <div className='mt-4'>
        {/* <p dangerouslySetInnerHTML={{ __html: content }}> 
        </p> */}
        <p>OrganizerGuideline</p>
 
      </div>
      <div className=" text-right mt-16">
        <Button  onClick={() => navigate(`/dashboard/settings/update-organizerg-uideline`)}
        className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
         >
          Edit</Button>
      </div>
    </div>
  );
};

export default OrganizerGuideline;
