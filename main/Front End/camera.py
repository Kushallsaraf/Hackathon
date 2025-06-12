import cv2

class VideoCamera(object):
    def __init__(self):
        # Open the webcam
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        # Release the webcam when the object is destroyed
        self.video.release()

    def get_frame(self):
        # Capture a frame from the webcam
        ret, frame = self.video.read()

        # If the frame was captured successfully, encode it as JPEG
        if ret:
            ret, jpeg = cv2.imencode('.jpg', frame)
            if ret:
                return jpeg.tobytes()
        return None