import type { APIGatewayProxyHandler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";

const API_KEY = process.env.OWM_API_KEY as string;

export const weather: APIGatewayProxyHandler = async (event) => {
  try {
    const city = event.queryStringParameters?.city;

    if (!city) {
      return formatJSONResponse(
        { message: "City query parameter is required: ?city=Colombo" }
      );
    }

    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return formatJSONResponse({
      city,
      weather: weatherRes.data.weather[0].description,
      temperature:weatherRes.data.main.temp
    });
  } catch (error: any) {
    return formatJSONResponse(
      {
        message: "Error fetching weather",
        error:  error.message,
      }
    );
  }
};

export const main = middyfy(weather);
