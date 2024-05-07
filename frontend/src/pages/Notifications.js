import React, { useState, useEffect  } from 'react';
// import notifications from '../data/notifications';
import Container from '../components/layout/Container';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../components/layout/PageHeader';
import { BiSolidMessageMinus } from "react-icons/bi";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import NotificationItem from '../components/notifications/Notificationitem';
import { fetchNotifications, markAllNotificationsAsRead } from '../hooks/ruNotifications';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import toast, { Toaster } from 'react-hot-toast';


const Notifications = () => {
  const style = { fontSize: "3em", verticalAlign: "middle" };
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleCategoryChange = (category) => setSelectedCategory(category);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.replace('/login');
    } else {
      // Fetch projects when the component mounts
      const fetchData = async () => {
        try {
            const data = await fetchNotifications();
            setNotifications(data);
            setLoading(false);
            // console.log(data)
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Handle error, e.g., set an error state or display a message to the user
            setLoading(false);
        }
    };
      fetchData();
    }
  }, []);

  const handleMarkAsRead =  () => {
    markAllNotificationsAsRead();
    toast.success("You're up to date!!!");
  };

  // Function to filter notifications based on the selected category
  const filteredNotifications = selectedCategory === 'all' ? notifications : notifications.filter(notification => notification.category === selectedCategory);

  // Calculate count for each category
  const categoryCounts = {
    all: notifications.length,
    projects: notifications.filter(notification => notification.category === 'projects').length,
    tasks: notifications.filter(notification => notification.category === 'tasks').length,
    archived: notifications.filter(notification => notification.category === 'archived').length,
  };

  // Function to capitalize only the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to format count with leading zero if less than 10
  const formatCount = (count) => {
    return count < 10 ? `0${count}` : count;
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  return (
    <Container>
      {
        !loading ? (
          <>
            <header>
            <PageHeaderDiv>
              <PageTitleDiv>
                <PageTitle>Notifications</PageTitle>
              </PageTitleDiv>
              <PageTitleDiv>
              {notifications.length !== 0 && (<PageTitleSpan> <small style={{textDecoration:"underline", cursor: "pointer"}} onClick={handleMarkAsRead}>Mark all as read</small></PageTitleSpan>)}
              </PageTitleDiv>
            </PageHeaderDiv>
            </header>
    
            <main>
            {notifications.length !== 0 && (
              <div className='dashboard-cat'>
              {Object.keys(categoryCounts).map((category, index, array) => (
                <>
                {index === array.length - 1 ? <span style={{border: "1px solid gray", marginRight: "1em"}}></span> : null}
                  <span 
                    key={category} 
                    className={selectedCategory === category ? "active" : ""}
                    style={{marginRight: "1em", padding: "0 1em 1em 0", cursor: "pointer", textAlign:"left", borderBottom: selectedCategory === category ? '2px solid black' : 'none'  }}  
                    onClick={() => handleCategoryChange(category)}>{capitalizeFirstLetter(category)}{notifications.length === 0 ? (<small style={{marginLeft: ".4em", }}></small>) : (<small style={{background: "black", color: "white", padding:".2em .3em",marginLeft: ".4em", borderRadius:"3px"}}>{formatCount(categoryCounts[category])}</small>)}</span>
                </>
              ))}
              </div>
            )}
    
            <div style={{marginTop: "2em"}}>
              {notifications.length === 0 ? (
                <div className='project-item-body'>
                  <div className='no-notifs'>
                    <BiSolidMessageMinus style={style} />
                    <h4>You have no notifications</h4>
                  </div>
                </div>
              ) : (
                filteredNotifications.slice().reverse().map(notif => (
                  <div className='notification'>
                    <div className='notif'>
                      <AvatarGroup  style={{ verticalAlign:"top"}} sx={{ width: 40}}>
                        <Avatar alt="ella-adeka" src={notif.member_profile_pic} sx={{ width: 40, height: 40 }} />
                      </AvatarGroup>
                    </div>
                    <NotificationItem notification={notif} />
                    { notif.is_read === false && (<div className='notif-span'></div>)}
                  </div> 
                ))
              )}

            </div>
              <Toaster
                position="bottom-left"
                reverseOrder={false}
              />
            </main>
          </>
        ) : (
          <>
            <PageHeaderDiv>
              <PageTitleDiv>
                <PageTitle><Skeleton variant="rectangular" width={330} height={50} /></PageTitle>
              </PageTitleDiv>
              <PageTitleDiv>
                <PageTitleSpan><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={120} /></PageTitleSpan>
              </PageTitleDiv>
            </PageHeaderDiv>

            <div className='dashboard-cat'>
              <>
                <span>
                <Skeleton variant="rectangular" width={400} height={40} />
                </span>
              </>
            </div>

            <div className='notification' style={{marginTop:"1em"}}>
              <div className='notif'>
                <Skeleton circle width={40} height={40} />
              </div>
              <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={120} /></p>
                <p style={{ marginTop: "-1em"}}><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={60} /></p>
                <p><Skeleton variant="rectangular" width={1300} height={50} /></p>
                <button style={{background: "none"}}><Skeleton variant="rectangular" width={50} height={20} /></button>
              </div>  
             </div> 
            <div className='notification'>
              <div className='notif'>
                <Skeleton circle width={40} height={40} />
              </div>
              <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={120} /></p>
                <p style={{ marginTop: "-1em"}}><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={60} /></p>
                <p><Skeleton variant="rectangular" width={1300} height={50} /></p>
                <button style={{background: "none"}}><Skeleton variant="rectangular" width={50} height={20} /></button>
              </div>  
             </div> 
            <div className='notification'>
              <div className='notif'>
                <Skeleton circle width={40} height={40} />
              </div>
              <div className='notif' style={{ width: "80%", marginLeft: "1em"}}>
                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={120} /></p>
                <p style={{ marginTop: "-1em"}}><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={60} /></p>
                <p><Skeleton variant="rectangular" width={1300} height={50} /></p>
                <button style={{background: "none"}}><Skeleton variant="rectangular" width={50} height={20} /></button>
              </div>  
             </div> 
          </>
        )
      }
    </Container>
  );
}

export default Notifications;