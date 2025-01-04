from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from werkzeug.utils import secure_filename
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import pickle
import cv2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up the upload folder and allowed file types
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the trained model and vectorizer
MODEL_PATH = './model/corn_disease_model.h5'
VECTORIZER_PATH = './model/tfidf_vectorizer.pkl'
model = load_model(MODEL_PATH)

with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

# Define image size for the model
IMAGE_SIZE = 256

# Function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    symptoms = request.form.get('symptoms', '')  # Use get() to make it optional

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)

        # Preprocess the image
        img = cv2.imread(filepath)
        img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
        img = img / 255.0
        img = np.expand_dims(img, axis=0)

        # Preprocess the symptoms only if they are provided
        if symptoms:
            symptoms_vector = vectorizer.transform([symptoms]).toarray()
        else:
            # If no symptoms, use a zero vector of appropriate shape
            symptoms_vector = np.zeros((1, len(vectorizer.vocabulary_)))

        # Make the prediction
        predictions = model.predict([img, symptoms_vector])
        predicted_class = np.argmax(predictions[0])
        confidence = round(100 * np.max(predictions[0]), 2)

        # Map predicted class index to disease name
        class_names = ['Corn Leaf Blight','Common Rust', 'Gray Leaf Spot', 'Healthy']
        predicted_disease = class_names[predicted_class]

        return jsonify({
            'predicted_class': predicted_disease,
            'confidence': confidence
        })

    return jsonify({'error': 'Invalid image type or no image provided'}), 400

# Run the app
if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True, port=5000)
