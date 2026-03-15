import { useState, useEffect } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetAppContentQuery } from "../../../redux/features/setting/settingSlice";

const TermCondition = () => {
  const [content, setContent] = useState("");

  const { data } = useGetAppContentQuery("TERMS_CONDITION");

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  return (
    <div className=" mt-8 mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Terms & Condition</p>
      </Link>

      <div className="mt-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className=" text-right mt-16">
        <button
          onClick={() => navigate(`/dashboard/settings/edittermcondition`)}
          className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TermCondition;
