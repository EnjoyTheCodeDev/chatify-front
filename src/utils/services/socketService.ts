class ChatSocket {
  private socket: WebSocket | null = null;

  connect(chatId: string, token: string, onMessage: (msg: string) => void) {
    if (this.socket?.readyState === WebSocket.OPEN) {
     console.log("WebSocket already connected");
      return;
    }

    this.socket = new WebSocket(
      `ws://localhost:8000/ws/chats/${chatId}?token=${token}`,
    );

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      onMessage(event.data);
    };

    this.socket.onclose = () => {};

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  send(data: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}

export const chatSocket = new ChatSocket();
