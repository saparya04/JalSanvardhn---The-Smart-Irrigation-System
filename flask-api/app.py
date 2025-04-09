# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load models and encoder
# encoder = joblib.load("label_encoder.pkl")
# logistic_model = joblib.load("logistic_model.pkl")
# rf_model = joblib.load("water_prediction_model.pkl")

# # 🔹 1. Logistic Model: Irrigation Prediction
# @app.route("/predict", methods=["POST"])
# def predict_irrigation():
#     try:
#         data = request.get_json()
#         df = pd.DataFrame([data])

#         # Label encode cropType
#         df["cropType"] = encoder.transform(df["cropType"])

#         # Ensure all columns match model's expected input
#         df = df.reindex(columns=logistic_model.feature_names_in_, fill_value=0)

#         prediction = logistic_model.predict(df)
#         irrigation_required = bool(prediction[0])

#         return jsonify({"Irrigation Required": irrigation_required})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # 🔹 2. Random Forest Model: Water Flow Prediction
# # @app.route("/water-flow", methods=["POST"])
# # def predict_water_flow():
# #     try:
# #         data = request.get_json()
# #         df = pd.DataFrame([data])

# #         # Label encode cropType
# #         df["cropType"] = encoder.transform(df["cropType"])

# #         # Ensure correct columns
# #         df = df.reindex(columns=rf_model.feature_names_in_, fill_value="")

# #         prediction = rf_model.predict(df)
# #         return jsonify({
# #             "waterFlow": prediction[0],
# #             "temperatureRange": data["temperatureRange"],  # Optional, for display
# #             "humidity": data["humidity"]
# #         })

# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500
# @app.route("/water-flow", methods=["POST"])
# def predict_water_flow():
#     try:
#         data = request.get_json()

#         # Convert frontend keys to match training features
#         mapping = {
#             "soilType": "SOIL TYPE",
#             "region": "REGION",
#             "weatherCondition": "WEATHER CONDITION",
#             "cropType": "CROP TYPE",
#             "temperatureRange": "TEMPERATURE"
#         }

#         # Map and preprocess
#         formatted = {}
#         for key, new_key in mapping.items():
#             val = data.get(key, "")
#             if isinstance(val, str):
#                 val = val.strip().lower()
#             formatted[new_key] = val

#         # Extract temperature (e.g., "20-30" -> 25)
#         if "-" in str(formatted["TEMPERATURE"]):
#             parts = formatted["TEMPERATURE"].split("-")
#             formatted["TEMPERATURE"] = (int(parts[0]) + int(parts[1])) / 2
#         else:
#             formatted["TEMPERATURE"] = float(formatted["TEMPERATURE"])

#         # Create DataFrame and predict
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

from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import os
from dotenv import load_dotenv
import re

# Gemini
import google.generativeai as genai

app = Flask(__name__)
CORS(app)
load_dotenv()


encoder = joblib.load("label_encoder.pkl")
logistic_model = joblib.load("logistic_model.pkl")
rf_model = joblib.load("water_prediction_model.pkl")


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def clean_gemini_response(response):
   response = re.sub(r'\*\*(.*?)\*\*', r'\1', response)         # remove bold
   response = re.sub(r'^\*\s+', '- ', response, flags=re.MULTILINE)  # replace bullets
   return response  
   
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
        cleaned_response = clean_gemini_response(response.text)
        return cleaned_response

    except Exception as e:
        print("🔴 Gemini error:", e)  
        return "Explanation could not be generated due to an error."

@app.route("/predict", methods=["POST"])
def predict_irrigation():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])

       
        df["cropType"] = encoder.transform(df["cropType"])


        df = df.reindex(columns=logistic_model.feature_names_in_, fill_value=0)

        prediction = logistic_model.predict(df)
        irrigation_required = bool(prediction[0])

        # Gemini explanation
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

if __name__ == "__main__":
    app.run(debug=True, port=5002)
