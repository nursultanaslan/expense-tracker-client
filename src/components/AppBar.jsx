import {
    AppBar, IconButton, Typography, Toolbar, Tooltip,
    Box, Zoom, SvgIcon, Divider, Drawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { DarkModeTwoTone, LightModeTwoTone } from "@mui/icons-material";
import { useState } from "react";
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CurrencyLiraRoundedIcon from '@mui/icons-material/CurrencyLiraRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const ResponsiveAppBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)  //drawer açık mı kapalı mı? başlangıcta kapalı
    const [themeMode, setThemeMode] = useState('light');
    const [language, setLanguage] = useState('tr');
    const navigate = useNavigate();

    const pages = [
        { title: "Dashboard", url: "/dashboard", icon: <HomeOutlinedIcon /> },
        { title: "Harcama Ekle", url: "/addExpense", icon: <CurrencyLiraRoundedIcon /> },
        { title: "Harcamaları Listele", url: "/expenses", icon: <SellOutlinedIcon /> }
    ]

    const handleNavigate = (url) => {
        toggleDrawerClose();         //drawer'ı kapat
        navigate(url);                //url'ye git
    }

    const toggleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    const toggleDrawerClose = () =>{
        setDrawerOpen(false);
    }

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const toggleLang = () => {
        setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
    }

    return (
        <>
        <Box sx={{display: "flex"}}>
            <AppBar
                position="fixed"
                open = {drawerOpen}
                sx={{
                    top: 0,
                    width: '%100',
                    zIndex: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: 'blur(2px)'

                }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        onClick={toggleDrawerOpen}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                    <Typography
                        color="black"
                        sx={{ fontSize: { xs: '18px', md: '25px' }, flexGrow: 1 }}
                    >
                        Expense Tracker
                    </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Açık Mod" slots={{ transition: Zoom }}>
                            <IconButton onClick={toggleTheme}>
                                {themeMode === 'light' ? <DarkModeTwoTone /> : <LightModeTwoTone />}

                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dil" slots={{ transition: Zoom }}>
                            <IconButton onClick={toggleLang}>
                                {language === 'tr' ?
                                    <SvgIcon viewBox='0 0 512 512'>
                                        <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                        <g mask="url(#a)" fillRule="evenodd">
                                            <path fill="#e30a17" d="M0 0h512v512H0z" />
                                            <path fill="#fff" d="M348.8 264c0 70.6-58.3 127.9-130.1 127.9s-130.1-57.3-130.1-128 58.2-127.8 130-127.8S348.9 193.3 348.9 264z" />
                                            <path fill="#e30a17" d="M355.3 264c0 56.5-46.6 102.3-104.1 102.3s-104-45.8-104-102.3 46.5-102.3 104-102.3 104 45.8 104 102.3z" />
                                            <path fill="#fff" d="m374.1 204.2-1 47.3-44.2 12 43.5 15.5-1 43.3 28.3-33.8 42.9 14.8-24.8-36.3 30.2-36.1-46.4 12.8-27.5-39.5z" />
                                        </g>
                                    </SvgIcon> :
                                    <SvgIcon viewBox="0 0 512 512">
                                        <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                        <g mask="url(#a)" fillRule="evenodd">
                                            <g strokeWidth="1pt">
                                                <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" />
                                                <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V315H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0z" />
                                            </g>
                                            <path fill="#192f5d" d="M0 0h389.1v275.7H0z" />
                                            <path fill="#fff" d="m32.3 11.8 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.9-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6L65 61l-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 67l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6L212 78h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6L277 78h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.5 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.6h11.4zm64.7 0 4 11h11l-9.1 6.7L139 123l-9.4-6.7-9 6.7 3.5-10.7-9.5-6.6h11.8zm65 0 3.5 11h11.4l-9 6.7L204 123l-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.6H191zm65 0 3.5 11h11.4l-9.4 6.7L269 123l-9.5-6.7-9.4 6.7 4-10.7-9.5-6.6H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.6h11.8zM32.7 122.1l3.1 11h11.9l-9.5 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7L139 178l-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7L204 178l-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7L269 178l-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 177.2l3.1 11h11.9l-9.5 6.8 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.8 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.8 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.8 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.8zM32.7 232.4l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4z" />
                                        </g>
                                    </SvgIcon>}
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Tooltip title="Giriş" slots={{ transition: Zoom }}>
                            <IconButton>
                                <PersonOutlineOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>


            {/* açılır-kapanır menu */}
            <Drawer open={drawerOpen} onClose={toggleDrawerClose}>
                <Box sx={{
                    width: 250,
                    height: '100%',
                    flexGrow: 1
                }}>
                    <List>
                        {pages.map((page, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleNavigate(page.url)}>
                                    <ListItemIcon sx={{ mr: 0 }}>
                                        {page.icon}
                                    </ListItemIcon>
                                    <ListItemText>{page.title}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Outlet />  {/* menudeki içerikleri görüntülüyor */}
            </Box>
        </>
    )
}
export default ResponsiveAppBar;