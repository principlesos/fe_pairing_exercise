import React from "react";
import { Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCurrentUserId } from "../../store/user";
import { DownOutlined } from "@ant-design/icons";

const SelectUserDropdown = () => {
  const dispatch = useDispatch();
  const loggedInUsers = useSelector(
    (state: RootState) => state.userState.loggedInUsers
  );

  const menu = (
    <Menu>
      {loggedInUsers.map((user) => (
        <Menu.Item key={user.id}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            onClick={(e) => {
              e.preventDefault();
              dispatch(setCurrentUserId(user.id));
            }}
          >
            {user.name}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div style={{ flex: 1, textAlign: "end" }}>
      <Dropdown overlay={menu}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Select User <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default SelectUserDropdown;
