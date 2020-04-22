import React from "react";
import { Button, Menu, MenuItem, Grid } from "@material-ui/core/";
import { useHistory } from "react-router-dom";

const NavMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="NavMenu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="NavMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => handleClose("/")}> Products </MenuItem>
        <MenuItem onClick={() => handleClose("/cart")}> Shopping Cart</MenuItem>
        <MenuItem onClick={() => handleClose("/checkout")}>Check out</MenuItem>
      </Menu>
    </div>
  );
};
export default NavMenu;
