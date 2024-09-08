import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div>
      <Typography variant="h2" className="leading-10 !font-semibold">
        Streamify
      </Typography>
      <Typography className="leading-6 !font-semibold">
        Welcome back, here are your metrics!
      </Typography>
    </div>
  );
};

export default Header;
