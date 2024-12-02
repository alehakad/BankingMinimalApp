import { Server } from "socket.io";

// create socket io server
const socketMap = new Map();

const initSocket = () => {
    const io = new Server(server);
    console.log("Initialize SocketIO");
    // Socket.IO event handlers
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        // get user id from query
        const userId = socket.handshake.query.userId;

        if (userId) {
            socketMap.set(userId, socket);

            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.id}`);
                socketMap.delete(userId);
            });
        }
        else {
            console.log('User ID not provided, disconnecting socket');
            socket.disconnect(true);
        }
    });
}

const getUserSocket = (userId) => {
    return socketMap.get(userId);
}

const updateReceiver = async (receiverId, transaction) => {
    const recipientSocket = getUserSocket(receiverId);
    if (recipientSocket) {
        console.log(`Emit sending money to ${receiverId}`);
        recipientSocket.emit("new-transaction", transaction);
    }
    else {
        console.log(`User ${receiverId} is not online`);
    }
}

export { initSocket, updateReceiver };