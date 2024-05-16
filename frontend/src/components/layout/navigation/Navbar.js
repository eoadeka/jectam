import React, { useState, useEffect, Fragment } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsChevronCompactDown } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import userAvatarFemale from "../../../assets/images/avatars/jane_smith.jpg"
import userAvatarMale from "../../../assets/images/avatars/john_doe.jpg";
import { fetchNotifications } from "../../../hooks/ruNotifications";

const Navbar = () => {
	const style = { fontSize: "1.2em", display: "inline-block", verticalAlign:"middle", marginRight: "5px" };
	const [showTeams, setShowTeams] = useState(true);
	const [isAuth, setAuth] = useState(false);
	const [notifications, setNotifications] = useState([]);
  	const [unreadNotificationsExist, setUnreadNotificationsExist] = useState(false);
  	const onTeamsClick = () => setShowTeams(!showTeams);

	const handleLogout = (event) => {
        event.preventDefault();
		// fetch('http://localhost:8000/accounts/logout/', {
			
		fetch('https://jectam-backend.onrender.com/accounts/logout/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			localStorage.clear();
			window.location.replace('/');
		});
    }


	useEffect(() => {
		if (localStorage.getItem('access_token') !== null) {
			setAuth(true); 
			}

		// Fetch notifications when the component mounts
		const fetchData = async () => {
			try {
			  const data = await fetchNotifications();
			  setNotifications(data);
			  // Check if any notification is unread
			  const hasUnread = data.some(notification => !notification.is_read);
			  setUnreadNotificationsExist(hasUnread);
			} catch (error) {
			  console.error('Error fetching notifications:', error);
			}
		  };
		  fetchData();
	}, [isAuth]);

	const authLinks = () => {
		<Fragment>
			<NavLink to="/logout" activeStyle style={{position: "absolute",bottom:"2em"}}>
				<span><CiLogout style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Logout</small></span> {/*SignUp*/}
			</NavLink><br></br>
		</Fragment>
	}

	const guestLinks = () => {
		<Fragment>
			<NavLink to="/login" activeStyle style={{position: "absolute",bottom:"4em"}}>
				<span><CiLogin style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Login</small></span> {/*SignUp*/}
			</NavLink><br></br>
			<NavLink to="/sign-up" activeStyle style={{position: "absolute",bottom:"2em"}}>
				<span><CiLogin style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Register</small></span> {/*SignUp*/}
			</NavLink><br></br>
		</Fragment>
	}
	
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" style={{color: "black"}}>
						<small style={{verticalAlign: "middle", fontSize: "2em"}}>Jectam</small>
					</NavLink>
					{/* <span> */}
						{/* <TbSquareRoundedLetterJ style={style} size={"1.3em"} /><small style={{verticalAlign: "middle"}}>Jectam</small><br></br> */}
						{/* <small style={{verticalAlign: "middle", fontSize: "1.5em"}}>Jectam</small><br></br>
					</span> */}
					{/* <NavLink to="/" activeStyle>
						<CiHome style={style} />
					</NavLink> */}
					<br></br>
					<NavLink to="/dashboard">
						<span><LuLayoutDashboard style={style} /> <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Dashboard</small></span>
					</NavLink>
					<br></br>
					<NavLink to="/projects" activeStyle>
						<span><GrProjects style={style} />  <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Projects</small></span> {/*Projects*/}
					</NavLink><br></br>
					{/* <Button>Start new project button</Button> */}
					
					<NavLink to="/notifications" activeStyle>
						<span  className={unreadNotificationsExist ? "notification-badge" : null}><IoNotificationsSharp style={style} />  <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Notifications</small></span> {/* Notifications */}
					</NavLink><br></br>
					<NavLink to="/reports-and-analytics" activeStyle>
						<span><FaArrowTrendUp style={style} />  <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Reports</small></span> {/* Reports & Analytics */}
					</NavLink>

					<div style={{width: "100%" }}>
					<NavLink style={{display: "inline-block", width: "85%", color: "#605f5f" }}>
						<span ><RiTeamLine style={style} /> <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Teams</small></span> {/* Reports & Analytics */}
					</NavLink>
					<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} onClick={onTeamsClick} /></span>
					
					</div>
					{/* <div> */}
						{/* <div> */}
						{/* <RiTeamLine />
								<h4 style={{marginBottom: "3px", display:"inline-block", width: "90%"}}>Teams</h4>
							<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} onClick={onTeamsClick} /></span>
						</div> */}
					
						
					{/* </div> */}

					{/* <div>Search</div> */}
						{/* <small>Avatar,Name,Role</small><br></br> */}
							
						{ !showTeams && (
							<div style={{marginBottom:".3em"}}>
								<AvatarGroup sx={{width:"100%", marginBottom:".5em"}}>
									<Avatar alt="ella-adeka" src={userAvatarFemale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{opacity:"1", fontSize:"1.1em", marginBottom:"-30px"}}>Ella Adeka</span><br></br><span style={{fontSize:".9em"}}>Project Manager</span></small>
								</AvatarGroup>
								<AvatarGroup sx={{width:"100%", marginBottom:".5em"}}>
									<Avatar alt="ella-adeka" src={userAvatarMale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{opacity:"1", fontSize:"1.1em", marginBottom:"-30px"}}>John Doe</span><br></br><span style={{fontSize:".9em"}}>DevOps Engineer</span></small>
								</AvatarGroup>
								<AvatarGroup sx={{width:"100%"}}>
									<Avatar alt="ella-adeka" src={userAvatarFemale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{fontWeight:"bolder", fontSize:"1.1em", marginBottom:"-30px"}}>Jane Smith</span><br></br><span style={{fontWeight:"bolder", fontSize:".9em"}}>Frontend Engineer</span></small>
								</AvatarGroup>
							</div>
						)}
							{/* <small>Avatar,Name,Role</small><br></br>
							<small>SkyNet</small> */}

					{/* projects */}
					{/* <div>
						<div>
							<h4 style={{marginBottom: "3px", display:"inline-block", width: "90%"}}>Projects</h4>
							<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} onClick={onProjectsClick} /></span>
						</div>
						{ showProjects ? (
							<div style={{marginBottom:".3em"}}>
								<small>Quantum</small><br></br>
								<small>SkyNet</small>
							</div>
						) : null }
						<small style={{fontSize:".7em", textDecoration:"underline"}}>
							<a href={`projects`}>
								view more <MdArrowOutward style={style} />
							</a>
						</small>
					</div> */}

					{/* teams */}
					{/* <div>
						<div>
						<RiTeamLine />
								<h4 style={{marginBottom: "3px", display:"inline-block", width: "90%"}}>Teams</h4>
							<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} onClick={onTeamsClick} /></span>
						</div> */}
					
							{/* <small>Avatar,Name,Role</small><br></br> */}
							
						{/* { showTeams ? (
							<div style={{marginBottom:".3em"}}>
								<AvatarGroup sx={{width:"100%", marginBottom:".5em"}}>
									<Avatar alt="ella-adeka" src={userAvatarFemale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{opacity:"1", fontSize:"1.1em", marginBottom:"-30px"}}>Ella Adeka</span><br></br><span style={{fontSize:".9em"}}>Project Manager</span></small>
								</AvatarGroup>
								<AvatarGroup sx={{width:"100%", marginBottom:".5em"}}>
									<Avatar alt="ella-adeka" src={userAvatarMale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{opacity:"1", fontSize:"1.1em", marginBottom:"-30px"}}>John Doe</span><br></br><span style={{fontSize:".9em"}}>DevOps Engineer</span></small>
								</AvatarGroup>
								<AvatarGroup sx={{width:"100%"}}>
									<Avatar alt="ella-adeka" src={userAvatarFemale} sx={{ width: "20%", height: 25, float:"left", background: "black" }}  />
									<small style={{width:"80%", fontSize:"10px", marginLeft:"3px"}}><span style={{fontWeight:"bolder", fontSize:"1.1em", marginBottom:"-30px"}}>Jane Smith</span><br></br><span style={{fontWeight:"bolder", fontSize:".9em"}}>Frontend Engineer</span></small>
								</AvatarGroup>
							</div>
						) : null }
							<small style={{fontSize:".7em", textDecoration:"underline"}}>
								<a href={`projects`}>
									view more <MdArrowOutward style={style} />
								</a>
							</small> */}
							{/* <small>Avatar,Name,Role</small><br></br>
							<small>SkyNet</small> */}
					{/* </div> */}

					
					{/* { isAuth ? authLinks : guestLinks } */}
					{ isAuth && (
						<>
							<NavLink onClick={handleLogout} style={{position: "absolute",bottom:"1em"}}>
								<span><CiLogout style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Logout</small></span> {/*SignUp*/}
							</NavLink><br></br>
						</>
					)}

					{/* <NavLink to="/logout" activeStyle style={{position: "absolute",bottom:"2em", left:"1em"}}>
						<span><CiLogout style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Logout</small></span>
					</NavLink><br></br> */}
					
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
