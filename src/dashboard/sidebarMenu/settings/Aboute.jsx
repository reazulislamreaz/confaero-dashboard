import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useGetAppContentQuery } from "../../../redux/features/setting/settingSlice";
import { useIsAdmin } from "../../../hooks/useUserRole";

const About = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const { data } = useGetAppContentQuery("ABOUT_US");

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  //Check userRole
  const isAdmin = useIsAdmin();
  console.log(isAdmin);
  return (
    <div className=" mt-8 mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">About Us</p>
      </Link>

      <div className="mt-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className=" text-right mt-16">
        {isAdmin && (
          <Button
            onClick={() => navigate(`/dashboard/settings/editabout`)}
            className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default About;
