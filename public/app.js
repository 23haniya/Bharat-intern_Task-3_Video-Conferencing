// app.js
const localVideo = document.getElementById('local-video');
const remoteVideosContainer = document.getElementById('remote-videos');
const chatMessagesContainer = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const startRecordBtn = document.getElementById('start-record');
const stopRecordBtn = document.getElementById('stop-record');
let mediaRecorder;
let recordedChunks = [];

// Function to handle new remote connections
function handleRemoteConnection(peerConnection, remoteId) {
  const remoteVideo = document.createElement('video');
  remoteVideo.id = `remote-video-${remoteId}`;
  remoteVideo.autoplay = true;
  remoteVideosContainer.appendChild(remoteVideo);

  peerConnection.ontrack = (event) => {
    const stream = event.streams[0];
    remoteVideo.srcObject = stream;
  };
}

// Function to start local video stream
async function startLocalVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = stream;
    return stream;
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

// Function to send chat messages
function sendMessage(message) {
  // Implement the logic to send the message to the server or other participants
  // and display it in the chat container
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatMessagesContainer.appendChild(messageElement);
}

// Event listeners for chat input and record buttons
chatInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const message = chatInput.value.trim();
    if (message !== '') {
      sendMessage(message);
      chatInput.value = '';
    }
  }
});

startRecordBtn.addEventListener('click', () => {
  startRecording();
});

stopRecordBtn.addEventListener('click', () => {
  stopRecording();
});

// Function to start video recording
function startRecording() {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(localVideo.srcObject);
  mediaRecorder.addEventListener('dataavailable', handleRecordedData);
  mediaRecorder.start();
}

// Function to handle recorded video data
function handleRecordedData(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

// Function to stop video recording
function stopRecording() {
  mediaRecorder.stop();
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  // Implement the logic to save or upload the recorded video
}

// Call the startLocalVideo function to initiate local video stream
startLocalVideo();

