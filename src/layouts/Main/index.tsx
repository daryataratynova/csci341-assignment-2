import React from "react";
import { Box, Container, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import FlagIcon from '@mui/icons-material/Flag';
import PublicIcon from '@mui/icons-material/Public';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GradeIcon from '@mui/icons-material/Grade';
import ViewListIcon from '@mui/icons-material/ViewList';
import Cloud from '@mui/icons-material/Cloud';
import { useRouter } from "next/router";

const Item: React.FC<{ icon: React.ReactNode, label: string, href: string, additional?: string }> = ({ icon, label, href, additional }) => {
    const { pathname, push } = useRouter();

    const isSelected = pathname === href;

    return (
        <MenuItem
            sx={{
                margin: 0.5,
                borderRadius: 1,
                paddingX: 1.5,
            }}
            selected={isSelected}
            onClick={() => push(href)}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{
                fontSize: 14,
            }}>
                {label}
            </ListItemText>
            {additional && (
                <Typography variant="caption" color="text.secondary">
                    {additional}
                </Typography>
            )}
        </MenuItem>
    )
};

const ShortDivider = () => {
    return (
        <Divider sx={{
            marginX: 2
        }} />
    )
}

export const MainLayout: React.FC<React.ComponentProps<'div'>> = ({
    children,
}) => {
    return (
        <Container sx={{
            display: 'flex',
            alignItems: 'start',
        }} maxWidth="lg" disableGutters>
            <Box sx={{
                width: 240,
                flexShrink: 0,
                minHeight: '100vh',
            }}>
                <Box sx={{
                    padding: 2,
                }}>
                    <Typography color="text.secondary" fontSize={15} fontWeight="bold" component="h5">
                        CRUD Web Interface
                    </Typography>
                </Box>
                <ShortDivider />
                <MenuList>
                    <Item
                        icon={<HomeIcon fontSize="small" />}
                        href="/"
                        label="Home"
                    />
                    <Item
                        icon={<TypeSpecimenIcon fontSize="small" />}
                        href="/diseaseType"
                        label="Disese Types"
                        additional="CRUD"
                    />
                    <Item
                        icon={<FlagIcon fontSize="small" />}
                        href="/country"
                        label="Country"
                        additional="CRUD"
                    />
                    <Item
                        icon={<CoronavirusIcon fontSize="small" />}
                        href="/disease"
                        label="Disease"
                        additional="CRUD"
                    />
                    <Item
                        icon={<PublicIcon fontSize="small" />}
                        href="/discover"
                        label="Discover"
                        additional="CRUD"
                    />
                    <Item
                        icon={<PersonIcon fontSize="small" />}
                        href="/users"
                        label="Users"
                        additional="CRUD"
                    />
                    <ShortDivider />
                    <Item
                        icon={<LocalHospitalIcon fontSize="small" />}
                        href="/doctor"
                        label="Doctors"
                        additional="CRUD"
                    />
                    <Item
                        icon={<GradeIcon fontSize="small" />}
                        href="/specialize"
                        label="Specialize"
                    />
                    <ShortDivider />
                    <Item
                        icon={<PersonIcon fontSize="small" />}
                        href="/publicServant"
                        label="Public Servant"
                    />
                    <Item
                        icon={<ViewListIcon fontSize="small" />}
                        href="/records"
                        label="Records"
                    />
                </MenuList>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Container sx={{ paddingY: 2 }}>
                {children}
            </Container>
        </Container>
    )
}