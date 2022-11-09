import { useEffect, useState } from "react";
import Questionnaire from "./Questionnaire/Questionnaire";

// const url = "http://localhost:3001/questionnaire";
function App() {
  const [jsonString, setJsonString] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [loading, setLoading] = useState(true);

  const onCompleteComponent = (data) => {
    const questions = jsonData.questions.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else {
        return null;
      }
    });
    // axios
    //   .patch(url, { data: JSON.stringify({ questions }) })
    //   .then((res) => console.log("res", res));

    localStorage.setItem("questionnaire", JSON.stringify({ questions }));
    alert("Form Submitted successfully.");
  };

  useEffect(() => {
    let questionnaire = localStorage.getItem("questionnaire");

    if (!questionnaire) {
      localStorage.setItem("questionnaire", stringJson);
      questionnaire = stringJson;
    }
    setJsonString(questionnaire);
    setJsonData(JSON.parse(questionnaire));
    setLoading(false);

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     setJsonString(response.data);
    //     setJsonData(JSON.parse(response.data));
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div className="App">
      {loading ? (
        "Loading"
      ) : (
        <Questionnaire
          title="Non-Participation in Assessment, Screening and Vaccination"
          json={JSON.parse(jsonString)}
          updateJson={setJsonData}
          jsonData={jsonData}
          onCompleteComponent={onCompleteComponent}
        />
      )}
    </div>
  );
}

export default App;

// const json1 = {
//   questions: [
//     {
//       id: "q-01",
//       type: "text",
//       title:
//         "I have read and understood the policy directive regarding assessment, screening and vaccination and the infectious diseases covered by the policy directive.",
//     },
//     {
//       id: "q-02",
//       type: "checkbox",
//       title:
//         "I decline to participate in: (tick box for specific disease(s) as applicable)",
//       isRequired: true,
//       values: [
//         "Assessment and/or vaccination for diphtheria / tetanus / pertussis (dTpa)",
//       ],
//       choices: [
//         "Assessment and/or vaccination for diphtheria / tetanus / pertussis (dTpa)",
//         "Assessment and/or vaccination for hepatitis B",
//         "Assessment and/or vaccination for measles/ mumps/ rubella (MMR)",
//         "Assessment and/or vaccination for varicella (chicken pox)",
//         "Assessment and/or screening for tuberculosis",
//       ],
//     },
//     {
//       id: "q-03",
//       type: "text",
//       title:
//         "I am aware of the potential risks to myself and/or others that my non-participation in assessment, screening and/or vaccination may pose.",
//     },
//     {
//       id: "q-04",
//       type: "text",
//       title:
//         "I am aware that that non-participation will require my employer to manage me as unprotected or unscreened, as described in Section 3.7 Reassignment of Unprotected/Unscreened Staff.",
//     },
//     {
//       id: "q-05",
//       type: "singleBooleanCheckbox",
//       title:
//         "I have discussed with the staff member the potential risks his/her non-participation may pose and the management of unprotected/unscreened staff in accordance with this policy directive",
//     },
//   ],
// };

const stringJson =
  '{"questions":[{"id":"q-01","type":"text","title":"I have read and understood the policy directive regarding assessment, screening and vaccination and the infectious diseases covered by the policy directive."},{"id":"q-02","type":"checkbox","title":"I decline to participate in: (tick box for specific disease(s) as applicable)","isRequired":true,"message":"Please provide at least one selection","choices":["Assessment and/or vaccination for diphtheria / tetanus / pertussis (dTpa)","Assessment and/or vaccination for hepatitis B","Assessment and/or vaccination for measles/ mumps/ rubella (MMR)","Assessment and/or vaccination for varicella (chicken pox)","Assessment and/or screening for tuberculosis"]},{"id":"q-03","type":"text","title":"I am aware of the potential risks to myself and/or others that my non-participation in assessment, screening and/or vaccination may pose."},{"id":"q-04","type":"text","title":"I am aware that that non-participation will require my employer to manage me as unprotected or unscreened, as described in Section 3.7 Reassignment of Unprotected/Unscreened Staff."},{"id":"q-05","type":"singleBooleanCheckbox","title":"I have discussed with the staff member the potential risks his/her non-participation may pose and the management of unprotected/unscreened staff in accordance with this policy directive.","message":"Please acknowledge the declaration.","isRequired":true}]}';

// const s = {
//   id: "q-01",
//   type: "text",
//   title:
//     "I have read and understood the policy directive regarding assessment, screening and vaccination and the infectious diseases covered by the policy directive.",
// };
