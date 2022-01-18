import React, {useState} from 'react';
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import useStyles from './style';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth } from '../Auth';
import { SubjectOutlined, AddCircleOutlineOutlined } from '@material-ui/icons';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import RedoIcon from '@material-ui/icons/Redo';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom'

const SideBar = ({ children }) => {
    const classes = useStyles()
    const { currentUser } = useAuth()
    const history = useHistory()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(true)


    const menuItems = [
        {
            text: 'Requests',
            icon: <SubjectOutlined style={{fill: "#3db588"}} />,
            path: '/request'
        },
        {
            text: 'Ongoing',
            icon: <AutorenewIcon style={{fill: "#3db588"}} />,
            path: '/on-going'
        },
        {
            text: 'Resolved',
            icon: <CheckCircleIcon style={{fill: "#3db588"}} />,
            path: '/resolved'
        },
    ]

    const Transfered = [
        {
            text: 'Transfered',
            icon: <RedoIcon style={{fill: "#3db588"}} />,
            path: '/transfered'
        },
        {
            text: 'Transfered Ongoing',
            icon: <CallMissedOutgoingIcon style={{fill: "#3db588"}} />,
            path: '/transfered-ongoing'
        },
        {
            text: 'Transfered Resolved',
            icon: <CheckCircleIcon style={{fill: "#3db588"}} />,
            path: '/transfered-resolved'
        }   
    ]
        
    
    const BottomSection = [
        {
            text: 'Verified',
            icon: <VerifiedUserOutlinedIcon style={{fill: "#3db588"}} />,
            path: '/verified-users'
        },
        {
            text: 'Verify Account',
            icon: <CancelPresentationIcon style={{fill: "#3db588"}} />,
            path: '/verify-account'
        },
        {
            text: 'Logout',
            icon: <ExitToAppOutlinedIcon style={{fill: "#3db588"}} />,
            path: '/'
        },


    ]

    
  const handleDrawerToggle = () => {
    setIsOpen(!isOpen)
}

    return (
        <div className={classes.root}>
            {currentUser ? 
            <> 
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classes.menuButton}
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
                style={{marginLeft: 12, position: 'fixed', top: 10, left: 10}}

            >
                <MenuIcon />
            </IconButton>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={isOpen}
                classes={{ paper: classes.drawerPaper }}
            >
                <div style={{ backgroundColor: '#3db588'}}>
                    <Typography variant='h5' className={classes.title}>
                        C . A . R . E <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classes.menuButton}
                onClick={handleDrawerToggle}
                style={{marginLeft: 12}}

            >
                <CloseIcon />
            </IconButton>
                    </Typography>
                </div>
                <List className={classes.drawerPadding}>
                    {
                        menuItems.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname == item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider style={{backgroundColor: 'black'}}/>
                <List className={classes.drawerPadding}>
                    {
                        Transfered.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname == item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider style={{backgroundColor: 'black'}}/>
                <List className={classes.drawerPadding}>
                    {
                        BottomSection.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname == item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer></> : null
            }
            <div className={classes.page}>
                {children}
            </div>

        </div >
    )
}

export default SideBar

// {currentUser ? <Drawer
//     className={classes.drawer}
//     variant='permanent'
//     anchor='left'
// >
//     <div>
//         <Typography variant='h5'>
//             {children}
//         </Typography>
//     </div>
// </Drawer> : null}