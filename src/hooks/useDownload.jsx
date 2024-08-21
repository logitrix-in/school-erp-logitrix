import axios from "axios";

function download(name) {
  console.log(name);
  axios
    .get("https://downloads.sociolinq.com/", {
      params: {
        name: name,
      },
    })
    .then((res) => {
      console.log(res.data.message);
      window.open(res.data.url, "_blank", "noreferrer");
    })
    .catch((err) => console.log(err));
}

export default download;
