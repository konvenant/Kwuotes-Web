"use client"

import React, { useState } from 'react';
import { Avatar, Button, List, ListItem, ListItemIcon, ListItemText, Modal, Switch, Typography, Box, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import HelpIcon from '@mui/icons-material/Help';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UpdateIcon from '@mui/icons-material/Update';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import { FaPencilAlt, FaPhone } from 'react-icons/fa';
import { MdLogout, MdPhoneAndroid } from 'react-icons/md';
import { useAuth } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import {changePassword} from '../lib/actions'


const ProfilePage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [language, setLanguage] = useState('en');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const router = useRouter();

  const handleEditProfile = () => setOpenEditModal(true);
  const handleSettings = () => setOpenSettingsModal(true);
  const handleMyCategories = () => router.push('/category');
  const handleHelp = () => {
    alert("Help is on the way")
  }

  const handleLogout = () => {
    logout();
    router.push("/login")
  }
  const handleDownloadApp = () => {
    router.push("https://drive.google.com/file/d/1onRJ93ZnVyjN7Zjsii7NUcJ-smRcojZQ/view?usp=drive_link")
  }
  const handleUpdateUsername = async() => {

    if(newPassword === "") {
      return alert("passwords fields cannot be empty")
    }
    if (newPassword === confirmPassword) {
      const response = await changePassword(user?.username,newPassword);
      alert(response.message);
      setOpenEditModal(false);
    } else{
      alert("passwords don't match, try again")
    }
    
  }
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <Box className={styles.profileHeader}>
        <Avatar src="/kavatar.jpg" className={styles.avatar} />
        <Typography variant="h5">{user?.username}</Typography>
      </Box>
      <List>
        <ListItem button onClick={handleEditProfile}>
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary="Change Password" secondary="Change your password" />
        </ListItem>
        <ListItem button onClick={handleSettings}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" secondary="Manage your preferences" />
        </ListItem>
        <ListItem button onClick={handleMyCategories}>
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="My Categories" secondary="View your categories" />
        </ListItem>
        <ListItem button onClick={handleHelp}>
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="Help" secondary="Get assistance" />
        </ListItem>
        <ListItem button onClick={handleDownloadApp}>
              <ListItemIcon><MdPhoneAndroid /></ListItemIcon>
              <ListItemText primary="Download App"  secondary="Download Kwuotes App for your Android Phone"/>
              </ListItem>

              <ListItem button onClick={handleLogout}>
          <ListItemIcon><MdLogout /></ListItemIcon>
          <ListItemText primary="Logout" secondary="Sign in another account" />
        </ListItem>
      </List>
      {/* Edit Profile Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box className={styles.modal}>
          <Typography variant="h6">Change Password</Typography>
           <List>
            <ListItem>
                <Input onChange={(e) => setNewPassword(e.target.value)} type='password' placeholder={"New Password"} />
            </ListItem>
            <ListItem>
            <Input onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder={"Confirm Password"} />
            </ListItem>
           </List>
           <Button onClick={handleUpdateUsername}>Update</Button>
          <Button onClick={() => setOpenEditModal(false)}>Close</Button>
        </Box>
      </Modal>
      {/* Settings Modal */}
      <Modal open={openSettingsModal} onClose={() => setOpenSettingsModal(false)}>
        <Box className={styles.modal}>
          <Typography variant="h6">Settings</Typography>
          <List>
            <ListItem>
              <ListItemIcon><DarkModeIcon /></ListItemIcon>
              <ListItemText primary="Dark Theme" />
              <Switch checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)} />
            </ListItem>
            <ListItem>
              <ListItemIcon><LanguageIcon /></ListItemIcon>
              <ListItemText primary="Language" />
              <ListItemText primary={language} />
              {/* Add language selection logic */}
            </ListItem>
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
              <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
            </ListItem>
            <ListItem>
              <ListItemIcon><UpdateIcon /></ListItemIcon>
              <ListItemText primary="Receive Updates" />
              <Switch checked={receiveUpdates} onChange={() => setReceiveUpdates(!receiveUpdates)} />
            </ListItem>
          </List>
          <Button onClick={() => setOpenSettingsModal(false)}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;
