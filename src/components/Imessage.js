import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { MicOutlined } from "@material-ui/icons";
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatName, selectChatId } from "../features/chatSlice";
import db from '../firebase';
import firebase from 'firebase';
import { selectUser } from './../features/userSlice';
import FlipMove from 'react-flip-move';


const Imessage = () => {
    const [input, setInput] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (chatId) {
            db.collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot =>
                    setMessages(
                        snapshot.docs.map(doc => ({
                            data: doc.data()
                        }))
                    )
                );

        }

    }, [chatId])

    const handleChange = e => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (chatId) {
            if (input.trim()) {

                db.collection('chats')
                    .doc(chatId)
                    .collection('messages')
                    .add({
                        message: input,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: user.uid,
                        photo: user.photo,
                        email: user.email,
                        displayName: user.displayName,
                    });

                setInput('');
            }
            else {
                alert('Please say something')
            }
        } else {
            alert('Please create a channel first');
        }
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <h4><span className='chat_name'>To: {chatName}</span></h4>
            </div>
            <div className="chat_messages">
                <FlipMove>
                    {
                        messages.map(({ data }) => <Message
                            key={data.timestamp}
                            data={data}
                        />)
                    }
                </FlipMove>
            </div>
            <div className="chat_input">
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='iMessage'
                        value={input}
                        onChange={handleChange} />
                    <input type='submit' value='Send Message' />
                </form>
                <IconButton>
                    <MicOutlined />
                </IconButton>
            </div>
        </div>
    );
}

export default Imessage;