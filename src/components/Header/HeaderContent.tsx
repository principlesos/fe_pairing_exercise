import React, { useEffect, useState } from "react";
import { Avatar, Typography, Input } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LoadingOutlined } from "@ant-design/icons";
import { BaseType } from "antd/lib/typography/Base";
import SelectUserDropdown from "./SelectUserDropdown";

const HeaderContent = ({
  numNotifications,
  setFilter,
  fetchAvatar,
}: {
  numNotifications: number;
  setFilter: any;
  fetchAvatar: any;
}) => {
  const [textType, setTextType] = useState<BaseType>("warning");

  useEffect(() => {
    fetchAvatar();
  }, [fetchAvatar]);

  const url = useSelector(
    (state: RootState) => state.userState.currentUserAvatarUrl
  );

  const icon = url ? <img alt="bell" src={url} /> : <LoadingOutlined />;

  return (
    <>
      <div
        onMouseEnter={() => setTextType("success")}
        onMouseLeave={() => setTextType("warning")}
      >
        <Typography.Text type={textType}>
          <Avatar icon={icon} />
          {`  ${numNotifications} notifications`}
        </Typography.Text>
      </div>
      <Input.Search
        allowClear
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        style={{ maxWidth: "200px" }}
      />
      <SelectUserDropdown />
    </>
  );
};

export default HeaderContent;
