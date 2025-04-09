// import express from "express";
// import Crop from "../models/Crop.js";
// import axios from "axios";

// const router = express.Router();

// // Fetch Weather Data
// const getWeatherData = async (latitude, longitude) => {
//     try {
//         const response = await axios.get(`${process.env.OPEN_METEO_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m`);
//         const temperature = response.data.current_weather?.temperature;
//         let humidity = response.data.current_weather?.relative_humidity;

//         if (humidity === undefined && response.data.hourly?.relative_humidity_2m?.length) {
//             humidity = response.data.hourly.relative_humidity_2m[0];
//         }

//         return { temperature: Math.round(temperature), humidity: Math.round(humidity) };
//     } catch (error) {
//         console.error("Error fetching weather:", error.message);
//         return null;
//     }
// };

// // Fetch Soil Moisture
// const getSoilMoisture = async (latitude, longitude) => {
//     try {
//         const response = await axios.get(`${process.env.WEATHERBIT_API}?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`);
//         const moisture = response.data.data?.[0]?.soilm_10_40cm;
//         return Math.round(moisture);
//     } catch (error) {
//         console.error("Error fetching soil moisture:", error.message);
//         return null;
//     }
// };

// router.post("/save", async (req, res) => {
//     try {
//         const { cropType, cropDays, area, userId } = req.body;

//         const locationRes = await axios.get(`https://nominatim.openstreetmap.org/search?q=${area}&format=json`);
//         const { lat, lon } = locationRes.data[0];

//         const weather = await getWeatherData(lat, lon);
//         const soilMoisture = await getSoilMoisture(lat, lon);

//         const flaskResponse = await axios.post("http://127.0.0.1:5002/predict", {
//             cropType,
//             cropDays,
//             temperature: weather.temperature,
//             humidity: weather.humidity,
//             soilMoisture
//         });

//         const irrigationRequired = flaskResponse.data["Irrigation Required"];

//         const crop = new Crop({
//             userId, cropType, cropDays, latitude: lat, longitude: lon,
//             temperature: weather.temperature, humidity: weather.humidity,
//             soilMoisture, irrigationRequired
//         });
//         await crop.save();

//         res.json({
//             message: "Crop data saved",
//             temperature: weather.temperature,
//             humidity: weather.humidity,
//             soilMoisture,
//             irrigationRequired,
//             cropType
//         });

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// export default router;

// import express from "express";
// import Crop from "../models/Crop.js";
// import axios from "axios";

// const router = express.Router();

// // Fetch Weather Data
// const getWeatherData = async (latitude, longitude) => {
//     try {
//         const response = await axios.get(`${process.env.OPEN_METEO_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m`);
//         const temperature = response.data.current_weather?.temperature;
//         let humidity = response.data.current_weather?.relative_humidity;

//         if (humidity === undefined && response.data.hourly?.relative_humidity_2m?.length) {
//             humidity = response.data.hourly.relative_humidity_2m[0];
//         }

//         return { temperature: Math.round(temperature), humidity: Math.round(humidity) };
//     } catch (error) {
//         console.error("Error fetching weather:", error.message);
//         return null;
//     }
// };

// // Fetch Soil Moisture
// const getSoilMoisture = async (latitude, longitude) => {
//     try {
//         const response = await axios.get(`${process.env.WEATHERBIT_API}?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`);
//         const moisture = response.data.data?.[0]?.soilm_10_40cm;
//         return Math.round(moisture);
//     } catch (error) {
//         console.error("Error fetching soil moisture:", error.message);
//         return null;
//     }
// };

// router.post("/save", async (req, res) => {
//     try {
//         const { cropType, cropDays, area, userId } = req.body;

//         const locationRes = await axios.get(`https://nominatim.openstreetmap.org/search?q=${area}&format=json`);
//         const { lat, lon } = locationRes.data[0];

//         const weather = await getWeatherData(lat, lon);
//         const soilMoisture = await getSoilMoisture(lat, lon);

//         const flaskResponse = await axios.post("http://127.0.0.1:5002/predict", {
//             cropType,
//             cropDays,
//             temperature: weather.temperature,
//             humidity: weather.humidity,
//             soilMoisture
//         });

//         const { ["Irrigation Required"]: irrigationRequired, explanation} = flaskResponse.data;


//         const crop = new Crop({
//             userId, cropType, cropDays, latitude: lat, longitude: lon,
//             temperature: weather.temperature, humidity: weather.humidity,
//             soilMoisture, irrigationRequired
//         });
//         await crop.save();

//         res.json({
//             message: "Crop data saved",
//             temperature: weather.temperature,
//             humidity: weather.humidity,
//             soilMoisture,
//             irrigationRequired,
//             cropType,
//             explanation,
            
           
        
//         });

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// export default router;

import express from "express";
import Crop from "../models/Crop.js";
import axios from "axios";

const router = express.Router();

// Fetch Weather Data
const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${process.env.OPEN_METEO_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m`);
        const temperature = response.data.current_weather?.temperature;
        let humidity = response.data.current_weather?.relative_humidity;

        if (humidity === undefined && response.data.hourly?.relative_humidity_2m?.length) {
            humidity = response.data.hourly.relative_humidity_2m[0];
        }

        return { temperature: Math.round(temperature), humidity: Math.round(humidity) };
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        return null;
    }
};

// Fetch Soil Moisture
const getSoilMoisture = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${process.env.WEATHERBIT_API}?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`);
        const moisture = response.data.data?.[0]?.soilm_10_40cm;
        return Math.round(moisture);
    } catch (error) {
        console.error("Error fetching soil moisture:", error.message);
        return null;
    }
};

router.post("/save", async (req, res) => {
    try {
        const { cropType, cropDays, area, userId } = req.body;

        const locationRes = await axios.get(`https://nominatim.openstreetmap.org/search?q=${area}&format=json`);
        const { lat, lon } = locationRes.data[0];

        const weather = await getWeatherData(lat, lon);
        const soilMoisture = await getSoilMoisture(lat, lon);

        const flaskResponse = await axios.post("http://127.0.0.1:5002/predict", {
            cropType,
            cropDays,
            temperature: weather.temperature,
            humidity: weather.humidity,
            soilMoisture
        });

        const { ["Irrigation Required"]: irrigationRequired, Explanation, BestTime } = flaskResponse.data;


        const crop = new Crop({
            userId, cropType, cropDays, latitude: lat, longitude: lon,
            temperature: weather.temperature, humidity: weather.humidity,
            soilMoisture, irrigationRequired
        });
        await crop.save();

        res.json({
            message: "Crop data saved",
            temperature: weather.temperature,
            humidity: weather.humidity,
            soilMoisture,
            irrigationRequired,
            cropType,
            explanation: Explanation,
            
           
        
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;