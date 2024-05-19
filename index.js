const express = require("express");
const cors = require("cors");
const { MONGODB_URL, PORT } = require("./config/serverConfig");
const { connectDB } = require("./db/connect");
const authenticationRoute = require("./routes/authenticationRoute");
const uploadImageRoute = require("./routes/uploadImageRoute");
const getImageRoute = require("./routes/getImageRoute");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authenticationRoute);
app.use("/api/image", uploadImageRoute);
app.use("/api/image", getImageRoute);

const serverStart = async () => {
  try {
    await connectDB(MONGODB_URL);
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, () => {
      console.log(`server is listening at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
serverStart();

// const axios = require("axios");
// const FormData = require("form-data");
// const fs = require("fs");
// const JWT =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MzkyYjE5OS0yMDA4LTQyYTYtYTQ2My1kNDk0ZWEzNmRhNmQiLCJlbWFpbCI6InNhaGlsa2hhbjA4MjAxMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmY2YmI0MjdlYWU4OWY1NDQzNjciLCJzY29wZWRLZXlTZWNyZXQiOiJlNDRlZGQ0YzkwNmQzMjNkZmFlZTAyMTc4NDllOTM5ZmYwOTM4MmI2OWU5YTNlMDcyNzk4MThmZTE0NDIyMmQ4IiwiaWF0IjoxNzE0ODU4NzQzfQ.jSrRj7AfEl1wxMDLC8y_QXEiO5x4oKOpgGAREEzsnro";

// const pinFileToIPFS = async () => {
//   const formData = new FormData();
//   const src = "path/to/file.png";

//   const file = fs.createReadStream(src);
//   formData.append("file", file);

//   const pinataMetadata = JSON.stringify({
//     name: "File name",
//   });
//   formData.append("pinataMetadata", pinataMetadata);

//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//   });
//   formData.append("pinataOptions", pinataOptions);

//   try {
//     const res = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         maxBodyLength: "Infinity",
//         headers: {
//           "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
//           Authorization: `Bearer ${JWT}`,
//         },
//       }
//     );
//     console.log("sahildata", res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// pinFileToIPFS();
