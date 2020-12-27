import { Avatar } from "@material-ui/core"
import { useDispatch } from "react-redux";
import db from '../firebase';
import { setChat } from '../features/chatSlice';
import { useEffect, useState } from 'react';

const SidebarChat = ({ id, chatName }) => {

    const dispatch = useDispatch();

    const [chatInfo, setChatInfo] = useState([]);
    useEffect(() => {
        db.collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot =>
                setChatInfo(
                    snapshot.docs.map(doc => doc.data()
                    )
                ))

    }, [id])

    const handleChanelChange = () => {
        dispatch(setChat({
            chatId: id,
            chatName
        }))
    }

    return (
        <div className='sidebarchat' onClick={handleChanelChange}>
            <Avatar />
            <div className="sidebarchat_info" >
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{chatInfo[0]?.timestamp?.toDate().toLocaleTimeString()}</small>
            </div>
        </div>
    );
}

export default SidebarChat;