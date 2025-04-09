# import pandas as pd
# import numpy as np
# from sklearn.metrics import mean_squared_error
# from sklearn.linear_model import LinearRegression
# from sklearn.model_selection import train_test_split, GroupShuffleSplit
# import joblib

# # Load the dataset
# data = pd.read_csv("C:/Users/Saparya/OneDrive/Desktop/Jalsavardhn/flask-api/lineardata.csv")

# # Define features and target column
# features = ["SoilType", "Region", "Temperature", "WeatherCondition"]  # <-- Replace with actual feature names
# x = data[features]
# y = data["WATER REQUIREMENT"]  # <-- Replace with actual target column name

# # Split into training and testing sets
# spliter = GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
# train_index, test_index = next(spliter.split(x, y, data["CROP TYPE"]))

# train_x, test_x = x.iloc[train_index], x.iloc[test_index]
# train_y, test_y = y.iloc[train_index], y.iloc[test_index]

# # Apply log transformation to train_y
# train_y = data["WATER REQUIREMENT"]

# # Convert categorical features to one-hot encoding
# x_train = pd.get_dummies(train_x)
# x_test = pd.get_dummies(test_x)

# # Align columns to handle missing categories
# x_train, x_test = x_train.align(x_test, join='left', axis=1, fill_value=0)
# joblib.dump(x_train.columns,"model_features.pkl")
# # Initialize and train the model
# model = LinearRegression()
# model.fit(x_train, train_y)

# # Make predictions and apply inverse log transformation
# predictions = model.predict(x_test)
# predictions = np.expm1(predictions)  # Convert back to original scale

# # Evaluate performance using RMSE
# rmse = np.sqrt(mean_squared_error(test_y, predictions))

# print("Predictions:", predictions)
# print("Root Mean Squared Error (RMSE):", rmse)

# joblib.dump(model, "linear.pkl")

# import pickle
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegressionCV
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# # Load dataset
# df = pd.read_csv("C:/Users/Aishwarya.Sreejith/smart-irrigation_jal/JalSanvardhn-The-Smart-Irrigation-system-/flask-api/updated_dataset (1).csv")

# # Define features and target — Removed 'SoilMoisture'
# features = ["CropType", "temperature", "CropDays", "Humidity"]
# X = df[features].copy()
# y = df["Irrigation"]

# # Encode crop types
# encoder = LabelEncoder()
# encoder.fit(df["CropType"])
# X["CropType"] = encoder.transform(df["CropType"])

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# # Train Logistic Regression model
# logistic_model = LogisticRegressionCV(
#     cv=5, random_state=42, class_weight="balanced", solver="liblinear"
# )
# logistic_model.fit(X_train, y_train)

# # Evaluate
# y_pred = logistic_model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# print(f"Model Accuracy: {accuracy:.2f}")
# print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
# print("\nClassification Report:\n", classification_report(y_test, y_pred))

# # Manually save feature names (for use in Flask)
# logistic_model.feature_names_ = X.columns.tolist()

# # Save model and encoder
# with open("logistic_model.pkl", "wb") as f:
#     pickle.dump(logistic_model, f)
# with open("label_encoder.pkl", "wb") as f:
#     pickle.dump(encoder, f)

# print("Logistic model and encoder saved successfully.")

import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegressionCV
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("C:/Users/Aishwarya.Sreejith/smart-irrigation_jal/JalSanvardhn-The-Smart-Irrigation-system-/flask-api/updated_dataset (1).csv")

# Define features and target (excluding 'SoilMoisture')
features = ["CropType", "temperature", "CropDays", "Humidity","SoilMoisture"]
X = df[features].copy()
y = df["Irrigation"]

# Encode crop types
encoder = LabelEncoder()
encoder.fit(df["CropType"])
X["CropType"] = encoder.transform(df["CropType"])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train logistic regression model
logistic_model = LogisticRegressionCV(
    cv=5, random_state=42, class_weight="balanced", solver="liblinear"
)
logistic_model.fit(X_train, y_train)

# Evaluation
y_pred = logistic_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Manually set feature names for Flask API
logistic_model.feature_names_in_ = X.columns.tolist()

# Save model and encoder
with open("logistic_model.pkl", "wb") as f:
    pickle.dump(logistic_model, f)
with open("label_encoder.pkl", "wb") as f:
    pickle.dump(encoder, f)

print("✅ logistic_model.pkl and label_encoder.pkl saved successfully.")

# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.metrics import average_precision_score, accuracy_score
# from sklearn.multiclass import OneVsRestClassifier
# from sklearn.linear_model import LogisticRegressionCV
# from sklearn.model_selection import GroupShuffleSplit
# from xgboost import XGBClassifier
# from sklearn.preprocessing import LabelEncoder

# # ----------- 🔹 Load Dataset -----------
# df = pd.read_csv("C:/Users/Aishwarya.Sreejith/smart-irrigation_jal/JalSanvardhn-The-Smart-Irrigation-system-/flask-api/updated_dataset (1).csv")

# # ----------- 🔹 Feature and Label Setup -----------
# features = ["CropType", "temperature", "CropDays", "Humidity", "SoilMoisture"]
# X = df[features].copy()
# y = df["Irrigation"]
# groups = df["CropType"]

# # Encode CropType
# encoder = LabelEncoder()
# X["CropType"] = encoder.fit_transform(X["CropType"])

# # ----------- 🔹 Train/Test Split -----------
# splitter = GroupShuffleSplit(test_size=0.4, n_splits=1, random_state=42)
# train_index, test_index = next(splitter.split(X, y, groups))

# X_train, X_test = X.iloc[train_index], X.iloc[test_index]
# y_train, y_test = y.iloc[train_index], y.iloc[test_index]

# # ----------- 🔹 XGBoost for Feature Importance -----------
# xgb = XGBClassifier(
#     objective="binary:logistic",
#     eval_metric="auc",
#     scale_pos_weight=len(y_train[y_train == 0]) / len(y_train[y_train == 1]),
#     enable_categorical=True
# )
# xgb.fit(X_train, y_train)

# # Feature importance selection
# importances = xgb.feature_importances_
# important_features = np.argsort(importances)[::-1][:len(features)]
# selected_feature_names = X_train.columns[important_features]
# print("🔍 Selected Features:", selected_feature_names.tolist())

# # ----------- 🔹 Train Logistic Regression -----------
# X_train_selected = X_train[selected_feature_names]
# X_test_selected = X_test[selected_feature_names]

# logistic_model = LogisticRegressionCV(
#     solver='liblinear', cv=10, random_state=42, class_weight='balanced', penalty='l2'
# )
# model = OneVsRestClassifier(logistic_model)
# model.fit(X_train_selected, y_train)

# # ----------- 🔹 Evaluate -----------
# predictions = model.predict(X_test_selected)
# score = accuracy_score(y_test, predictions)
# pr_acc = average_precision_score(y_test, predictions)
# print(f"✅ Accuracy Score: {score:.4f}")
# print(f"✅ Average Precision: {pr_acc:.4f}")

# # ----------- 💾 Save Model, Encoder & Feature Names -----------
# joblib.dump(model, "irrigation_model.pkl")
# joblib.dump(encoder, "label_encoder.pkl")
# joblib.dump(selected_feature_names.tolist(), "selected_features.pkl")



# print("✅ Model, encoder, and feature names saved successfully.")
