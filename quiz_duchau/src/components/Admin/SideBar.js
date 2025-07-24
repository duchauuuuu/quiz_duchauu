import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.scss";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";


import sidebarBg from "../../assets/xinhgai.png";
import { HiAcademicCap } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaGem } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate= useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <HiAcademicCap size={"3em"} />
            <span onClick={()=>navigate('/')}>Quiz Đức Hậu</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                Quản lý Users
                <Link to="/admins/manager-users" />
              </MenuItem>

              <MenuItem>
                Quản lý bài Quiz
                <Link to="/admins/manager-quizzes" />
              </MenuItem>

              <MenuItem>Quản lý câu hỏi
              <Link to="/admins/manager-questions" />
              
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/duchauuuuu"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaRegMoneyBill1 size={"2em"} />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Nguyễn Đức Hậu
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
