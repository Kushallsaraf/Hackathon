from flask import Flask, render_template, request, redirect, url_for, jsonify
from pyzbar.pyzbar import decode
from PIL import Image
import os
import base64
from io import BytesIO
import requests
import json
app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/')
def home():
    return render_template('home.html')



def get_data(barcode):
    try:
        response = requests.post("http://localhost:3000/development/drug", json={"barcode": str(barcode)})
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}
@app.route('/scanner', methods=['GET', 'POST'])
def scanner():
    barcode_data = None
    newData = None
    if request.method == 'POST':
        # Handle file upload
        if 'file' not in request.files:
            return redirect(request.url)

        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)

        if file:
            # Save the uploaded file
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            # Decode the barcode from the uploaded image
            barcode_data = decode_barcode(file_path)

            # If barcode data is found, fetch and sort medication data
            if barcode_data and not isinstance(barcode_data, str):
                
                newData = get_data((str(barcode_data[0]['data'])))
                newData = {
                    'name': json.loads(newData['message'])['generic']["genericName"],
                    'data': barcode_data[0]['data'],
                    "link": "https://shop.rexall.ca/store/rexall/s?k="+json.loads(newData['message'])['generic']["genericName"],
                }
                print(newData)
                

               
                

    return render_template('scanner.html', barcode_data=newData)



@app.route('/capture', methods=['POST'])
def capture():
    try:
        # Get the image data from the request
        data = request.json
        image_data = data['image'].split(',')[1]  # Remove the data URL prefix
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))

        # Decode the barcode from the image
        barcodes = decode(image)

        # Check if any barcodes were found
        if not barcodes:
            return jsonify({'error': 'No barcode found in the image.'})

        # Extract the barcode data and fetch medication details
        barcode_data = []
        for barcode in barcodes:
            barcode_info = {
                'data': barcode.data.decode("utf-8"),
                'type': barcode.type,
                
            }
            barcode_data.append(barcode_info)

        return jsonify(barcode_data)
    except Exception as e:
        return jsonify({'error': str(e)})


def decode_barcode(image_path):
    # Open the image using Pillow
    image = Image.open(image_path)

    # Convert the image to grayscale (required by pyzbar)
    image = image.convert('L')

    # Use pyzbar to decode the barcode
    barcodes = decode(image)

    # Check if any barcodes were found
    if not barcodes:
        return "No barcode found in the image."

    # Extract the barcode data
    barcode_data = []
    for barcode in barcodes:
        barcode_data.append({
            'data': barcode.data.decode("utf-8"),
            'type': barcode.type
        })
    return barcode_data



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5001)