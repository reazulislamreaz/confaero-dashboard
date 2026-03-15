import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useGetAppContentQuery } from "../../../redux/features/setting/settingSlice";

const OrganizerGuideline = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const { data } = useGetAppContentQuery("ORGANIZER_GUIDELINE");

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  return (
    <div className=" mt-8 mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Organizer Guideline</p>
      </Link>

      <div className="mt-4">
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>

      <div className=" text-right mt-16">
        <Button
          onClick={() =>
            navigate(`/dashboard/settings/update-organizerg-uideline`)
          }
          className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default OrganizerGuideline;
