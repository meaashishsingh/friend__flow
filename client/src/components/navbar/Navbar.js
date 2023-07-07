// import React, { useRef, useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
// import { useNavigate } from "react-router";
// import Avatar from "../avatar/Avatar";
// import "./Navbar.scss";
// import {useDispatch, useSelector} from 'react-redux';
// import { setLoading } from "../../redux/slices/appConfigSlice";
// import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
// import { axiosClient } from "../../utils/axiosClient";


// function Navbar() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const myProfile = useSelector(state => state.appConfigReducer.myProfile);

//     async function handleLogoutClicked() {
//         try {
// 			await axiosClient.post('/auth/logout');
// 			removeItem(KEY_ACCESS_TOKEN);
// 			navigate('/login')
// 		} catch (e) {
			
// 		}
//     }

//     return (
//         <div className="Navbar">
//             <div className="container">
//                 <h2 className="banner hover-link" onClick={() => navigate("/")}>
//                     Friend flow
//                 </h2>
//                 <div className="right-side">
//                     <div
//                         className="profile hover-link"
//                         onClick={() => navigate(`/profile/${myProfile?._id}`)}
//                     >
//                         <Avatar src={myProfile?.avatar?.url}/>
//                     </div>
//                     <div className="logout hover-link" onClick={handleLogoutClicked}>
//                         <AiOutlineLogout />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;



import React, { useRef, useState } from "react";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";


function Navbar({user}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  function handleLogoutClicked() {
    axiosClient
      .post("/auth/logout")
      .then(() => {
        removeItem(KEY_ACCESS_TOKEN);
        navigate("/login");
      })
      .catch((error) => {
        // Handle error
      });
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    navigate(`/profile/${user._id}`);
  }

  return (
    <div className="Navbar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Friend flow
        </h2>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <AiOutlineSearch />
          </button>
        </form>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
