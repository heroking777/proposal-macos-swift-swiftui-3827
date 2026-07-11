import { WebSocket } from 'ws';

const ws = new WebSocket('ws://your-websocket-server-url');

ws.on('open', function open() {
  console.log('connected');
  const message = {
    type: "chat",
    content: "【緊急】macOSアプリ（Swift/SwiftUI）のクラッシュ修正"
  };
  ws.send(JSON.stringify(message));
});

ws.on('message', function incoming(data) {
  console.log(data);
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('error', function error(err) {
  console.error('WebSocket encountered an error: ', err.message, 'Closing socket');
  ws.close();
});