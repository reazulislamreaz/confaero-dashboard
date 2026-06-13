import { useState, useEffect } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetAppContentQuery } from "../../../redux/features/setting/settingSlice";
import { useIsAdmin } from "../../../hooks/useUserRole";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { data } = useGetAppContentQuery("PRIVACY_POLICY");

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);
  const isAdmin = useIsAdmin();
  console.log(isAdmin);
  return (
    <div className="h-[575px]">
      <div className="mt-8 mx-6">
        <Link to="/dashboard/settings" className="flex items-center gap-2">
          <FaCircleArrowLeft className="!text-[#0FC3C2] w-8 h-8" />
          <p className="font-semibold text-[30px]">Privacy Policy</p>
        </Link>

        <div className="mt-4">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="text-right mt-16">
          {isAdmin && (
            <button
              onClick={() => navigate(`/dashboard/settings/editprivacypolicy`)}
              className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
