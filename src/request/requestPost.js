import axios from "axios";

export async function requestPost() {
   try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}`)
      return res
   } catch (error) {
      return console.log(error)
   }
}