function get_qualtrics_variable() {
  const URL = window.location.href.toString();
  // console.log("URL FULL: " + URL);
  const URL_trim = URL.substring(URL.indexOf("?") + 1);
  // console.log("URL : " + URL_trim);
  return URL_trim;
}

export function send_dinosaur(formData) {
  const qualtrics_code = get_qualtrics_variable();

  // var formData = new FormData();
  formData.append("qualtrics_code", qualtrics_code);

  // Send the FormData object
  post_sheet(formData);
  post_sheet_backup(formData);
  // console.log("qualtrics_code: " + qualtrics_code);
}

const SHEET_URL = "YOUR_SHEET_URL_HERE"; // Replace with your Google Sheets URL

function post_sheet(formData) {
  // console.log(serialize_form_data(formData));
  const serializedData = serialize_form_data(formData);

  fetch(SHEET_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: serializedData,
    },
  )
    .then((response) => response.json()) // or .text() or .blob() etc. depending on response type
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function post_sheet_backup(formData) {
  // console.log(serialize_form_data(formData));
  const serializedData = serialize_form_data(formData);

  fetch(SHEET_URL,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: serializedData,
    },
  )
    .then((response) => response.json()) // or .text() or .blob() etc. depending on response type
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function form_data_length(formData) {
  let count = 0;
  for (var pair of formData.entries()) {
    count = count + 1;
  }
  return count;
}

function serialize_form_data(formData) {
  var serialized_string = "";
  var length = form_data_length(formData);
  let count = 0;
  for (var pair of formData.entries()) {
    var key = pair[0];
    var input_value = pair[1];
    input_value = input_value.replace("&", " AND ");
    input_value = input_value.replace("=", " EQUAL ");
    key = key.replace("&", " AND ");
    key = key.replace("=", " EQUAL ");

    //Appending to final string
    serialized_string = serialized_string + key + "=" + input_value;
    //Add add
    if (count < length - 1) {
      serialized_string = serialized_string + "&";
    }
    count = count + 1;
  }
  return serialized_string;
}
