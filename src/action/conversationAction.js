import { getChatFail, getChatRequest, getChatSuccess } from '../slice/conversationSlice';

export const getChatMessages = (socket, roomId, userId) => async (dispatch) => {
    try {
        dispatch(getChatRequest());
        
        // Emit a WebSocket message to request chat messages
        socket.send(JSON.stringify({
            type: 'get messages',
            room: roomId,
            userId: userId
        }));

        // Listen for WebSocket messages containing chat messages
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'messages') {
                dispatch(getChatSuccess(data.messages));
            } else if (data.type === 'error') {
                dispatch(getChatFail(data.message));
            }
        };
    } catch (error) {
        dispatch(getChatFail(error.message));
    }
};
