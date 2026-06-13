import { Button, Form } from "antd";
import JoditEditor from "../../../components/LazyJoditEditor";
import { useRef, useState, useEffect } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetAppContentQuery,
  useSaveAppContentMutation,
} from "../../../redux/features/setting/settingSlice";

const EditAbout = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(" ");
  const navigate = useNavigate();

  const { data } = useGetAppContentQuery("ABOUT_US");
  const [saveAppContent] = useSaveAppContentMutation();

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  const handleEditTermCondition = async () => {
    await saveAppContent({
      type: "ABOUT_US",
      title: "ABOUT_US Guideline",
      content: content,
      isActive: true,
    });

    navigate("/dashboard/settings/about");
  };

  return (
    <div className="mt-8 mx-6">
      <Link to="/dashboard/settings/about" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" !text-[#0FC3C2] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Edit About</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleEditTermCondition}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>

        <div className="text-right mt-6">
          <Form.Item>
            <Button
              htmlType="submit"
              className="!h-[44px] w-[260px] !bg-[#0FC3C2] !text-white rounded-[8px]"
            >
              Update AboutUs
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditAbout;
