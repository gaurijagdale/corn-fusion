# CornFusion: Corn Disease Prediction Using Multimodality

CornFusion is an AI/ML project designed to predict corn leaf diseases using a multimodal approach. The system allows users to upload an image of a corn leaf and provide symptoms associated with the disease. Based on this input, the model predicts the disease with high accuracy by combining insights from both image and text data.

## Features
- **Image-Based Disease Prediction:** Users can upload an image of a corn leaf, and the model analyzes it to detect the disease.
- **Symptom-Based Disease Prediction:** Users can input textual symptoms related to the disease for prediction.
- **Multimodal Prediction:** Combines insights from both the image and text models using late fusion for enhanced accuracy.
- **User-Friendly Frontend:** Developed using modern frontend technologies for a seamless user experience.

## Project Architecture
1. **Frontend:**
   - Built using [Vite](https://vitejs.dev/), TypeScript, [Magic UI](https://magic.design/), and [ShadCN](https://shadcn.dev/).
   - Provides an intuitive interface for users to upload images and enter symptoms.

2. **Backend:**
   - Powered by Flask, serving as the API for handling user inputs and model predictions.
   - Processes form data containing both image and textual symptoms.

3. **Multimodal Model:**
   - **Image Model:** Trained using a dataset of corn leaf images to identify diseases based on visual characteristics.
   - **Text Model:** Utilizes symptoms provided by the user, vectorized using techniques like TF-IDF, and classified using a Logistic Regression model.
   - **Fusion:** The predictions from the image and text models are combined using late fusion to provide the final disease prediction.

## Technologies Used
- **Frontend:**
  - Vite
  - TypeScript
  - Magic UI
  - ShadCN
  - Tailwind CSS
- **Backend:**
  - Flask
- **Machine Learning Models:**
  - Image classification: Convolutional Neural Networks (CNNs)
  - Text classification: TF-IDF Vectorizer with Logistic Regression
  - Late Fusion for combining multimodal predictions

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/gaurijagdale/corn-fusion.git
   cd cornfusion
2. Install frontend dependencies and start the development server:
    ```bash
    cd frontend
    npm install
    npm run dev
3. Set up the backend:
   - Navigate to the backend directory.
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\\Scripts\\activate
    - Install dependencies:
      ```bash
      pip install -r requirements.txt
    - Start the Flask server:
      ```bash
      flask run
4. Access the application:
   - Frontend runs on http://localhost:3000
   - Backend API runs on http://localhost:5000

## Dataset

This project uses the following datasets:

- **Image Dataset**: Corn leaf images used to detect diseases based on visual characteristics.
- **Text Dataset**: Symptoms related to corn diseases, which are vectorized and classified using TF-IDF and Logistic Regression.

## Kaggle Links

- [My Kaggle Profile](https://www.kaggle.com/gaurijagdale11)  
- [Corn Leaf Disease Dataset](https://www.kaggle.com/datasets/gaurijagdale11/corn-leaf-disease)  
- [TF-IDF Vectorizer Model](https://www.kaggle.com/models/gaurijagdale11/tfidf_vectorizer)  
- [Corn Disease Image Model](https://www.kaggle.com/models/gaurijagdale11/corn-disease-model)  
- [CornFusion Code Notebook](https://www.kaggle.com/code/gaurijagdale11/cornfusion-main)  

