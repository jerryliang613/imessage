import Message from "./Message";

const Chat = () => {
    return (
        <div className="chat">
            {/* <div className="chat_header">
                <h4><span className='channel_name'>Hello</span></h4>
                <strong>Details</strong>
            </div> */}
            <div className="chat_messages">
                <Message />
            </div>
            <div className="chat_input">

            </div>
        </div>
    );
}

export default Chat;