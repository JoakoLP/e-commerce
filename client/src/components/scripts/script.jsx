import axios from "axios";

const Script = () => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";

  const formElement = document.getElementById("element");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let elementDescription = document.getElementById("elementDescription").value;
    let elementPrice = document.getElementById("elementPrice").value;
    let element = { elementDescription, elementPrice };
    // let elementJson = JSON.stringify(element);
    // console.log(elementJson);
    // axios.post("http://localhost:8080/", {
    //   body: elementJson,
    // });
    let elementJson = JSON.stringify(element);
    console.log(elementJson);
    try {
      axios
        .post(`${SERVER_URL}/api/`, {
          // .post("http://localhost:8080/api/", {
          body: elementJson,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    //   fetch("http://localhost:8080/", {
    //     method: "Post",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //     },
    //     body: elementJson,
    //   });
  });
};

export default Script;
