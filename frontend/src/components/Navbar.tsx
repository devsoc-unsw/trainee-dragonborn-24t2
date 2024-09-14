import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Home from "@mui/icons-material/Home";
import Notifications from "@mui/icons-material/Notifications";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { getAuth, signOut } from "firebase/auth";
import { Link, useLocation } from "wouter";
import { useAuthUser } from "../firebase.ts";
import logo from "../assets/images/logo (2).png";

const Navbar = () => {
  const [, setLocation] = useLocation();
  const [user] = useAuthUser();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? "?";
  const profileImg = user?.profileimg;

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("auth-user");
    setLocation("/login");
  };

  return (
    <Card
      sx={{
        backgroundColor: "#F98568",
        padding: "10px 20px",
        color: "white",
        position: "fixed",
        width: "100%",
        height: "60px",
        zIndex: 1000,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link to="/" style={{ textDecoration: "none",display: "flex", alignItems: "center", gap: "9px"}}>
          <img src={logo} alt="logo" height="45px" />
          <Typography level="body-md" sx={{fontFamily: "var(--font-primary)", fontWeight: 600, color: "black"}}>TripTrekker</Typography>
        </Link>

        <Stack direction="row" spacing={2} alignItems="center">
          <Link to="/home">
            <IconButton>
              <Home style={{ color: "var(--tertiary-color)" }} />
            </IconButton>
          </Link>

          <IconButton>
            <CalendarMonth style={{ color: "var(--tertiary-color)" }} />
          </IconButton>

          <Dropdown>
            <MenuButton variant="plain" sx={{ p: 0 }}>
              <IconButton>
                <Notifications style={{ color: "var(--tertiary-color)" }} />
              </IconButton>
            </MenuButton>
            <Menu>
              <MenuItem>No notifications yet</MenuItem>
            </Menu>
          </Dropdown>

          <Dropdown>
            <MenuButton variant="plain" sx={{ p: 0 }}>
              <Avatar
                src={profileImg || undefined}
                sx={{ color: "var(--tertiary-color)" }}
              >
                {!profileImg && userInitial}
              </Avatar>
            </MenuButton>
            <Menu>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <MenuItem>View Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Navbar;