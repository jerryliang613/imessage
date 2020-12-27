import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from "./SidebarChat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from './../features/userSlice';
import { useEffect, useState } from "react";
import db, { auth } from '../firebase';


const Sidebar = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot =>
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        )
    }, [])

    const handleLogout = () => {
        dispatch(logout());
        auth.signOut();
    }

    const addChat = () => {
        const chatName = prompt('Please enter a chat name')
        if (chatName) {
            db.collection('chats').add({
                chatName: chatName,
                chatTime: new Date().toLocaleTimeString(),
            })

        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar
                    onClick={handleLogout}
                    src={user.photo} className='sidebar_avatar' />
                <div className="sidebar_input">
                    <SearchIcon />
                    <input type="text" placeholder='search' />
                </div>
                <IconButton
                    onClick={addChat}
                    variant='outlined' className='sidebar_inputbutton' >
                    <RateReviewOutlinedIcon

                    />
                </IconButton>
            </div>
            <div className="sidebar_chat">
                {
                    chats.map(({ id, data: { chatName } }) =>
                        <SidebarChat
                            key={id}
                            id={id}
                            chatName={chatName}
                        />
                    )
                }

            </div>
        </div>
    );
}

export default Sidebar;