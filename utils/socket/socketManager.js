let io;

module.exports = {
    init: (server) => {
        const socketIo = require("socket.io");
        io = socketIo(server, {
            cors: {
                origin: `${process.env.FRONTEND_URL}`, // Permitir solicitações do front-end
                methods: ["GET", "POST"], // Métodos permitidos
                credentials: true, // Permitir cookies, se necessário
            },
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io não inicializado!");
        }
        return io;
    },
};
