import { Typography, Box } from "@mui/material";

// Component to create A header for each route
const Header = ({ title, subtitle }) => {
    return (
        <Box>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="h5">{subtitle}</Typography>
        </Box>
    )
}

export default Header;