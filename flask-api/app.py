# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS
# import os
# from dotenv import load_dotenv
# import re

# # Gemini
# import google.generativeai as genai

# app = Flask(__name__)
# CORS(app)
# load_dotenv()


# encoder = joblib.load("label_encoder.pkl")
# logistic_model = joblib.load("logistic_model.pkl")
# rf_model = joblib.load("water_prediction_model.pkl")

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# def clean_gemini_response(response):
#    response = re.sub(r'\*\*(.*?)\*\*', r'\1', response)         # remove bold
#    response = re.sub(r'^\*\s+', '- ', response, flags=re.MULTILINE)  # replace bullets
#    return response  
   
# def get_gemini_explanation(data, irrigation_required):
#     try:
#         prompt = f"""
#         A farmer entered the following details:
#         - Crop Type: {data['cropType']}
#         - Crop Days: {data['cropDays']}
#         - Temperature: {data['temperature']}°C
#         - Humidity: {data['humidity']}%
#         - Soil Moisture: {data['soilMoisture']}%

#         The system predicted that irrigation is {'required' if irrigation_required else 'not required'}.

#         Please explain:
#         1. Why is irrigation {'needed' if irrigation_required else 'not needed'}?
#         2. What environmental factors contributed to this decision?
#         3. What personalized recommendation would you give the farmer?
#         """

#         model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
#         response = model.generate_content(prompt)
#         cleaned_response = clean_gemini_response(response.text)
#         return cleaned_response

#     except Exception as e:
#         print("🔴 Gemini error:", e)  
#         return "Explanation could not be generated due to an error."

# @app.route("/predict", methods=["POST"])
# def predict_irrigation():
#     try:
#         data = request.get_json()
#         df = pd.DataFrame([data])

       
#         df["cropType"] = encoder.transform(df["cropType"])


#         df = df.reindex(columns=logistic_model.feature_names_in_, fill_value=0)

#         prediction = logistic_model.predict(df)
#         irrigation_required = bool(prediction[0])

#         # Gemini explanation
#         explanation = get_gemini_explanation(data, irrigation_required)

#         return jsonify({
#             "Irrigation Required": irrigation_required,
#             "explanation": explanation
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/water-flow", methods=["POST"])
# def predict_water_flow():
#     try:
#         data = request.get_json()

#         mapping = {
#             "soilType": "SOIL TYPE",
#             "region": "REGION",
#             "weatherCondition": "WEATHER CONDITION",
#             "cropType": "CROP TYPE",
#             "temperatureRange": "TEMPERATURE"
#         }

#         formatted = {}
#         for key, new_key in mapping.items():
#             val = data.get(key, "")
#             if isinstance(val, str):
#                 val = val.strip().lower()
#             formatted[new_key] = val

#         if "-" in str(formatted["TEMPERATURE"]):
#             parts = formatted["TEMPERATURE"].split("-")
#             formatted["TEMPERATURE"] = (int(parts[0]) + int(parts[1])) / 2
#         else:
#             formatted["TEMPERATURE"] = float(formatted["TEMPERATURE"])

#         input_df = pd.DataFrame([formatted])
#         prediction = rf_model.predict(input_df)

#         return jsonify({
#             "waterFlow": prediction[0],
#             "temperatureRange": data.get("temperatureRange"),
#             "humidity": data.get("humidity")
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=5002)

# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS
# import os
# from dotenv import load_dotenv
# import re

# # Gemini
# import google.generativeai as genai

# app = Flask(__name__)
# CORS(app)
# load_dotenv()


# encoder = joblib.load("label_encoder.pkl")
# logistic_model = joblib.load("logistic_model.pkl")
# rf_model = joblib.load("water_prediction_model.pkl")


# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# def clean_gemini_response(response):
#    response = re.sub(r'\*\*(.*?)\*\*', r'\1', response)         # remove bold
#    response = re.sub(r'^\*\s+', '- ', response, flags=re.MULTILINE)  # replace bullets
#    return response  
   
# def get_gemini_explanation(data, irrigation_required):
#     try:
#         prompt = f"""
#         A farmer entered the following details:
#         - Crop Type: {data['cropType']}
#         - Crop Days: {data['cropDays']}
#         - Temperature: {data['temperature']}°C
#         - Humidity: {data['humidity']}%
#         - Soil Moisture: {data['soilMoisture']}%

#         The system predicted that irrigation is {'required' if irrigation_required else 'not required'}.

#         Please explain:
#         1. Why is irrigation {'needed' if irrigation_required else 'not needed'}?
#         2. What environmental factors contributed to this decision?
#         3. What personalized recommendation would you give the farmer?
#         """

#         model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
#         response = model.generate_content(prompt)
#         cleaned_response = clean_gemini_response(response.text)
#         return cleaned_response

#     except Exception as e:
#         print("🔴 Gemini error:", e)  
#         return "Explanation could not be generated due to an error."

# @app.route("/predict", methods=["POST"])
# def predict_irrigation():
#     try:
#         data = request.get_json()
#         df = pd.DataFrame([data])

       
#         df["cropType"] = encoder.transform(df["cropType"])


#         df = df.reindex(columns=logistic_model.feature_names_in_, fill_value=0)

#         prediction = logistic_model.predict(df)
#         irrigation_required = bool(prediction[0])

#         # Gemini explanation
#         explanation = get_gemini_explanation(data, irrigation_required)

#         return jsonify({
#             "Irrigation Required": irrigation_required,
#             "Explanation": explanation
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/water-flow", methods=["POST"])
# def predict_water_flow():
#     try:
#         data = request.get_json()

#         mapping = {
#             "soilType": "SOIL TYPE",
#             "region": "REGION",
#             "weatherCondition": "WEATHER CONDITION",
#             "cropType": "CROP TYPE",
#             "temperatureRange": "TEMPERATURE"
#         }

#         formatted = {}
#         for key, new_key in mapping.items():
#             val = data.get(key, "")
#             if isinstance(val, str):
#                 val = val.strip().lower()
#             formatted[new_key] = val

#         if "-" in str(formatted["TEMPERATURE"]):
#             parts = formatted["TEMPERATURE"].split("-")
#             formatted["TEMPERATURE"] = (int(parts[0]) + int(parts[1])) / 2
#         else:
#             formatted["TEMPERATURE"] = float(formatted["TEMPERATURE"])

#         input_df = pd.DataFrame([formatted])
#         prediction = rf_model.predict(input_df)

#         return jsonify({
#             "waterFlow": prediction[0],
#             "temperatureRange": data.get("temperatureRange"),
#             "humidity": data.get("humidity")
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=5002)
import os
import uuid
import re
import cv2
import joblib
import pickle
import numpy as np
import pandas as pd
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from dotenv import load_dotenv
import google.generativeai as genai
from werkzeug.utils import secure_filename

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)  # Changed 'app' to 'application'
CORS(app, origins=[
    "https://jal-sanvardhn-the-smart-irrigation-system.vercel.app",
    "https://jalsanvardhn-backend.onrender.com"
])

# Load models
encoder = joblib.load("label_encoder.pkl")
logistic_model = joblib.load("logistic_model.pkl")
rf_model = joblib.load("water_prediction_model.pkl")
cnn_model = load_model("plant_disease_model.h5")

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def clean_gemini_response(response):
    response = re.sub(r'\*\*(.*?)\*\*', r'\1', response)         # remove bold
    response = re.sub(r'^\*\s+', '- ', response, flags=re.MULTILINE)  # replace bullets
    lines = response.strip().split("\n")
    cleaned = [line.lstrip("•-1234567890. ").strip() for line in lines if line.strip()]
    return "\n".join(cleaned)

def get_gemini_explanation(data, irrigation_required):
    try:
        prompt = f"""
        A farmer entered the following details:
        - Crop Type: {data['cropType']}
        - Crop Days: {data['cropDays']}
        - Temperature: {data['temperature']}°C
        - Humidity: {data['humidity']}%
        - Soil Moisture: {data['soilMoisture']}%

        The system predicted that irrigation is {'required' if irrigation_required else 'not required'}.

        Please explain:
        1. Why is irrigation {'needed' if irrigation_required else 'not needed'}?
        2. What environmental factors contributed to this decision?
        3. What personalized recommendation would you give the farmer?
        """

        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        return clean_gemini_response(response.text)

    except Exception as e:
        print("🔴 Gemini error:", e)
        return "Explanation could not be generated due to an error."

def preprocess_image(file_path):
    img = load_img(file_path, target_size=(128, 128))
    img_array = img_to_array(img) / 255.0
    img_array = tf.expand_dims(img_array, axis=0)
    return img_array

@app.route("/predict", methods=["POST"])
def predict_irrigation():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        df["cropType"] = encoder.transform(df["cropType"])
        df = df.reindex(columns=logistic_model.feature_names_in_, fill_value=0)

        prediction = logistic_model.predict(df)
        irrigation_required = bool(prediction[0])

        explanation = get_gemini_explanation(data, irrigation_required)

        return jsonify({
            "Irrigation Required": irrigation_required,
            "Explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/water-flow", methods=["POST"])
def predict_water_flow():
    try:
        data = request.get_json()

        mapping = {
            "soilType": "SOIL TYPE",
            "region": "REGION",
            "weatherCondition": "WEATHER CONDITION",
            "cropType": "CROP TYPE",
            "temperatureRange": "TEMPERATURE"
        }

        formatted = {}
        for key, new_key in mapping.items():
            val = data.get(key, "")
            if isinstance(val, str):
                val = val.strip().lower()
            formatted[new_key] = val

        if "-" in str(formatted["TEMPERATURE"]):
            parts = formatted["TEMPERATURE"].split("-")
            formatted["TEMPERATURE"] = (int(parts[0]) + int(parts[1])) / 2
        else:
            formatted["TEMPERATURE"] = float(formatted["TEMPERATURE"])

        input_df = pd.DataFrame([formatted])
        prediction = rf_model.predict(input_df)

        return jsonify({
            "waterFlow": prediction[0],
            "temperatureRange": data.get("temperatureRange"),
            "humidity": data.get("humidity")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predict-disease", methods=["POST"])
def predict_disease():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image = request.files["image"]
        filename = secure_filename(image.filename)
        temp_path = f"temp_{uuid.uuid4().hex}_{filename}"
        image.save(temp_path)

        img_tensor = preprocess_image(temp_path)
        predictions = cnn_model.predict(img_tensor)[0]

        predicted_class_index = predictions.argmax()
        confidence = float(predictions[predicted_class_index])

        try:
            class_names = list(np.load("class_names.npy"))
        except:
            class_names = [
                "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
                "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
                "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
                "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
                "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
                "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
                "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
                "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
                "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
                "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
                "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
                "Tomato___Target_Spot", "Tomato___healthy"
            ]

        disease = class_names[predicted_class_index] if class_names else f"Class {predicted_class_index}"

        prompt = f"""
        A plant has been diagnosed with **{disease}** with a confidence of **{confidence*100:.2f}%**.

        1. Based on this disease, should irrigation be applied?
        2. What kind of care or treatment should be given to the plant?
        3. Suggest steps to prevent recurrence of the disease.
        """

        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        suggestions = clean_gemini_response(response.text)

        os.remove(temp_path)

        return jsonify({
            "disease": disease,
            "confidence": confidence,
            "suggestions": suggestions
        })

    except Exception as e:
        print("🔴 Error in /predict-disease:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "JalSanvardhn Flask API is live 🚀"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5002)))

