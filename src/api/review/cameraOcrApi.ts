import axios, { AxiosError } from 'axios';


export const cameraOcrApi = async (image : string) => {
    /* Definition of Constant Variable */
    const MY_OCR_API_URL = "https://f8kcjz3kqc.apigw.ntruss.com/custom/v1/34442/85b412719ee9a65a563b7a51d5cbce83847c2eb90dbfaf0a452f1d9bd7fe00fb/general";
    const MY_OCR_SECRET_KEY = "SkxVYkdQQXVkQ3hhYXdScXlLcGp1bEVxcEtjRFJ6T0g=";

    /* Definition of Headers, Required Variable */
    const config = {
        headers: {
            "Content-Type" : "application/json",
            "X-OCR-SECRET" : MY_OCR_SECRET_KEY
        }
    }
    // const timestamp = new Date().getTime();
    
    let sumText = ""

    try {
      const response = await axios.post(MY_OCR_API_URL,
        {
            "version": "v2",
            "requestId": "string",
            "timestamp": 0,
            "lang": "ko",
            "images": [
                { "format": "png",
                    "url": null,
                    "data": image,
                    "name": "test",
                    "templateIds": [ 0 ]
                }
            ],
            "enableTableDetection": false
        }, config);
        
        response.data.images[0].fields.forEach((element: any) => {
          sumText += ("" + element.inferText)
          if (element.lineBreak) {
            sumText += "\n"
          }
        });

        return sumText

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error('Error while recognizing: ' + axiosError.message);
      } else {
        throw new Error('Unknown error occurred while recognizing optimal character.');
      }
    }
  };