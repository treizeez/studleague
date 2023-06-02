import { Drawer, Menu, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import { cloneElement, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut } from "./LogOut";
import { UpdateUser } from "./UpdateUser";

export const UserDetails = ({ button }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleClick = (event) => {
    isMobile ? setMobileMenu(!mobileMenu) : setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const me = useSelector((state) => state.user);

  const ref = useRef(null);

  const children = (
    <Stack>
      <Link onClick={handleClose} to={`/users/${me.publicUID}`}>
        <MenuItem>Моя сторінка</MenuItem>
      </Link>
      <UpdateUser
        menuClose={handleClose}
        button={<MenuItem>Редагувати</MenuItem>}
      />
      <LogOut />
    </Stack>
  );

  return (
    <>
      {me.activated && cloneElement(button, { onClick: handleClick })}
      {isMobile ? (
        <Drawer anchor="bottom" open={mobileMenu} onClose={handleClick}>
          {children}
        </Drawer>
      ) : (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {children}
        </Menu>
      )}
    </>
  );
};
