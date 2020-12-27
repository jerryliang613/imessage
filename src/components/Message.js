import { forwardRef } from 'react';
import { Avatar } from "@material-ui/core"
import { useSelector } from 'react-redux';
import { selectUser } from './../features/userSlice';

const Message = forwardRef(({ data }, ref) => {
    const { message, timestamp, photo, email } = data;
    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`message ${email === user.email ? 'message_sender' : ''}`}>
            <Avatar className='message_photo' src={photo} />
            <p>{message}</p>
            <small>{timestamp && timestamp.toDate().toLocaleTimeString()}</small>
        </div>
    );
})

export default Message;