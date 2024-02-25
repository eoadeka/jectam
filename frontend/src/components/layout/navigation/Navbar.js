// Filename - "./components/Navbar.js

import React, { useState } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { TbSquareRoundedLetterJ } from "react-icons/tb";
// import { LiaTachometerAltSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
// import { CiLogin, CiHome } from "react-icons/ci";
// import { IoIosNotifications } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsChevronCompactDown } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import userAvatarFemale from "../../../assets/images/avatars/jane_smith.jpg"
import userAvatarMale from "../../../assets/images/avatars/john_doe.jpg"

const Navbar = () => {
	const style = { fontSize: "1.2em", display: "inline-block", verticalAlign:"middle", marginRight: "5px" };
	const [showFavorites, setShowFavorites] = useState(true)
	const [showProjects, setShowProjects] = useState(true)
  	const onFavoritesClick = () => setShowFavorites(!showFavorites)
  	const onProjectsClick = () => setShowProjects(!showProjects)
	
	return (
		<>
			<Nav>
				<NavMenu>
					<span>
						<TbSquareRoundedLetterJ style={style} size={"1.3em"} /><small style={{verticalAlign: "middle"}}>Jectam</small><br></br>
					</span>
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
						<span><IoNotificationsSharp style={style} />  <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Notifications</small></span> {/* Notifications */}
					</NavLink><br></br>
					<NavLink to="/reports-and-analytics" activeStyle>
						<span><FaArrowTrendUp style={style} />  <small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Reports</small></span> {/* Reports & Analytics */}
					</NavLink>
					{/* <div>Search</div> */}
					<div>
						<div>
							<h4 style={{marginBottom: "3px", display:"inline-block", width: "90%"}}>Favorites</h4>
							<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} onClick={onFavoritesClick} /></span>
						</div>
						{ showFavorites && (
							<div style={{marginBottom:".3em"}}>
								<small>AutoTasker</small><br></br>
								<small>Synthify</small><br></br>
								<small>Luminate Upgrade</small>
							</div>
						)  }
							
						<small style={{fontSize:".7em", textDecoration:"underline"}}>
							<a href={"favorites"}>
								view more <MdArrowOutward style={style} />
							</a>
						</small>
					</div>
					<div>
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
					</div>
					<div>
						<div>
							<h4 style={{marginBottom: "3px", display:"inline-block", width: "90%"}}>Teams</h4>
							<span style={{display: "inline-block", width: "10%" }}><BsChevronCompactDown style={style} /></span>
						</div>
						<div>
							{/* <small>Avatar,Name,Role</small><br></br> */}
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
							{/* <small>Avatar,Name,Role</small><br></br>
							<small>SkyNet</small> */}
						</div>
					</div>

					<NavLink to="/sign-up" activeStyle style={{position: "absolute",bottom:"2em"}}>
						<span><CiLogin style={style} /><small style={{display:"inline-block", width: "50%", verticalAlign: "middle",fontSize: ".9em"}}>Logout</small></span> {/*SignUp*/}
					</NavLink><br></br>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
