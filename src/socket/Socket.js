import io from 'socket.io-client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ENDPOINT = "http://localhost:8001";

const useSocketSetup = () => {
    const { user } = useSelector((state) => state.authState);

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => {
            console.log("Connected to server");
        });

        // Cleanup function to disconnect socket when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [user]);

    // No need to return the socket from here
};

export default useSocketSetup;
