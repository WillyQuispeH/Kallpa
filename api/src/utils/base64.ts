import axios from "axios";

const convertToBase64 = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    if (response.status === 200) {
      const fileData = Buffer.from(response.data, "binary");
      const base64Data = fileData.toString("base64");
      return base64Data;
    } else {
      throw new Error(
        `Error al obtener el archivo desde S3. Código de estado: ${response.status}`
      );
    }
  } catch (error) {
    throw error;
  }
};

export default convertToBase64;
