import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OpenAI from 'openai'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from 'react-bootstrap';
// Import css
import './LandingPage.css';
import jsonData from '../src/data.json'; // Import the JSON data

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// const openai = new OpenAI({
//   // apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true // This is a security risk
//   apiKey: "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", dangerouslyAllowBrowser: true // This is a security risk
// });

const baseUrl = 'http://localhost:8000/'

async function getInfo(topic){
  const res = await fetch(baseUrl + topic,{
    method: "GET"
  })
  console.log(res)
  const data = await res.json()
  console.log(data)
  return data
}

export default function LandingPage() {
  // const checkStatusAndPrintMessages = async (threadId, runId) => {
  //     let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  //     if(runStatus.status === "completed"){
  //         let messages = await openai.beta.threads.messages.list(threadId);
  //         let string = messages.data[0].content[0].text.value
  //         const jsonMatch = string.match(/```json\n([\s\S]*?)\n```/);
  //         const jsonString = jsonMatch ? jsonMatch[1] : null;
  //         console.log(jsonString)

  //         // let i = 0
  //         // messages.data.forEach((msg) => {
  //         //     const role = msg.role;
  //         //     const content = msg.content[0].text.value; 
  //         //     console.log(i)
  //         //     console.log(
  //         //         `${role.charAt(0).toUpperCase() + role.slice(1)}: ${content}`
  //         //     );
  //         //     i = i+1
  //         // });
  //         navigate('/roadmap',  { state: JSON.parse(jsonString) }); // Navigate to the response page
  //     } else {
  //         console.log("Run is not completed yet.");
  //     }  
  // };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     topic: data.get('topic'),
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const topic = data.get('topic');  
    console.log(topic);
    try {

      // const apiResponse = await openai.chat.completions.create({
      //   model: "gpt-4-1106-preview",
      //   messages: [
      //     {
      //       "role": "system",
      //       "content": 'You are a learning curriculum designer who creates a JSON with a multi-step plan on the best way to learn a provided topic. The JSON should include objects of lesson plans with content, explicit steps, exercises, search terms, and explicitly named resources and tools. Be sure to elaborate very much on the steps and always provide resources and tools. There should be a good number of lessons in the lesson plan and a good number of steps in each lesson.\n\nThis is how the json should look, but there should be more lessons, steps, descriptions, resources, tools, and exercises than is this example\n\nThis is how the json should look, but there should be more lessons, steps, descriptions, resources, tools, and exercises than is this example\n\n{\n  "topic": "Pixel Art",\n  "lessonPlans": [\n    {\n      "title": "title here",\n      "content": "Lesson description",\n      "steps": [\n        {\n          "stepNumber": 1,\n          "description": "step description",\n          "resources": [\n            "resources here"\n          ],\n          "tools":[\n            "various tools here"\n          ]\n        }\n      ],\n      "exercises": [\n        {\n          "description": "description of exercise",\n          "searchTerms": [\n            "various search terms here"\n          ]\n        }\n      ],\n    }\n  ]\n}'
      //     },
      //     {
      //       "role": "user",
      //       "content": topic
      //     }
      //   ]
      // });
    
      // console.log("response: ", apiResponse)
      // console.log("response: ", apiResponse.choices[0].message.content)

    //   const assistant = await openai.beta.assistants.create({
    //   name: "Learning Assistant",
    //   instructions:
    //   'You are a learning curriculum designer who creates a JSON with a multi-step plan on the best way to learn a provided topic. The JSON should include objects of lesson plans with content, explicit steps, exercises, search terms, and explicitly named resources and tools. There should be multiple names and URLS for the resources and multiple for places to buy or read more about the required tools if there are any. Be sure to elaborate very much on the steps and always provide multiple resources and tools for each lesson and step when applicable, but be sure not to repeat resources and tools unless they are necessary to the particular step. Make sure the resources and tools are specifically related to the step of the learning plan aswell. There should be a good number of lessons in the lesson plan and a good number of steps in each lesson.\n\nThis is how the json should look, but there should be more lessons, steps, descriptions, resources, tools, and exercises than in this example\n\n{\n  \"topic\": \"Linear Algebra\",\n  \"lessonPlans\": [\n    {\n      \"title\": \"Introduction to Vectors\",\n      \"content\": \"This lesson introduces the concept of vectors in linear algebra.\",\n      \"steps\": [\n        {\n          \"stepNumber\": 1,\n          \"description\": \"Learn what a vector is and how to represent it.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 1\": \"https://www.maths.ed.ac.uk/~jmf/Teaching/MT3/LinearAlgebra.pdf\",\n            \"Khan Academy - Vectors and Spaces\": \"https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces\"\n          },\n          \"tools\": {\n            \"Graph paper\": \"https://incompetech.com/graphpaper/\",\n            \"Online vector calculator\": \"https://www.symbolab.com/solver/vector-calculator\"\n          }\n        },\n        {\n          \"stepNumber\": 2,\n          \"description\": \"Understand vector addition and scalar multiplication.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 2\": \"https://web.stanford.edu/~ashishg/msande111/notes/chapter2.pdf\",\n            \"MIT OpenCourseWare - Linear Algebra: Vectors\": \"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/\"\n          },\n          \"tools\": {\n            \"Graphing software\": \"https://www.desmos.com/calculator\",\n            \"Online vector calculator\": \"https://www.symbolab.com/solver/vector-calculator\"\n          }\n        },\n        {\n          \"stepNumber\": 3,\n          \"description\": \"Learn about vector dot product and cross product.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 3\": \"http://www.math.iit.edu/~fass/Notes532_Ch3Print.pdf\",\n            \"3Blue1Brown - Essence of Linear Algebra: Dot Products and Duality\": \"https://www.3blue1brown.com/lessons/dot-products\"\n          },\n          \"tools\": {\n            \"Graphing software\": \"https://www.desmos.com/calculator\",\n            \"Online vector calculator\": \"https://www.symbolab.com/solver/vector-calculator\"\n          }\n        }\n      ],\n      \"exercises\": [\n        {\n          \"description\": \"Practice adding and subtracting vectors.\",\n          \"searchTerms\": [\n            \"vector addition practice\",\n            \"vector subtraction exercises\"\n          ]\n        },\n        {\n          \"description\": \"Calculate dot products of vectors.\",\n          \"searchTerms\": [\n            \"dot product exercises\",\n            \"vector dot product practice\"\n          ]\n        },\n        {\n          \"description\": \"Find the cross product of vectors.\",\n          \"searchTerms\": [\n            \"cross product practice\",\n            \"vector cross product exercises\"\n          ]\n        }\n      ]\n    },\n    {\n      \"title\": \"Matrices and Systems of Equations\",\n      \"content\": \"This lesson covers matrices and their applications in solving systems of linear equations.\",\n      \"steps\": [\n        {\n          \"stepNumber\": 1,\n          \"description\": \"Learn about matrix notation and basic operations.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 4\": \"https://openstax.org/books/college-algebra-2e/pages/4-introduction-to-linear-functions\",\n            \"Khan Academy - Matrices\": \"https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices\"\n          },\n          \"tools\": {\n            \"Graphing calculator\": \"https://www.desmos.com/calculator\",\n            \"Online matrix calculator\": \"https://matrixcalc.org/\"\n          }\n        },\n        {\n          \"stepNumber\": 2,\n          \"description\": \"Understand matrix multiplication and inverses.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 5\": \"https://www.gradesaver.com/textbooks/math/algebra/linear-algebra-and-its-applications-5th-edition/chapter-5-eigenvalues-and-eigenvectors-5-1-exercises-page-273/1\",\n            \"MIT OpenCourseWare - Linear Algebra: Matrices\": \"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/\"\n          },\n          \"tools\": {\n            \"Graphing calculator\": \"https://www.desmos.com/calculator\",\n            \"Online matrix calculator\": \"https://matrixcalc.org/\"\n          }\n        },\n        {\n          \"stepNumber\": 3,\n          \"description\": \"Learn about systems of linear equations and Gaussian elimination.\",\n          \"resources\": {\n            \"Linear Algebra textbook - Chapter 6\": \"https://www.scribd.com/document/173385876/Linear-Algebra-Chapter-6-Vector-Spaces-Associated-With-Matrices\",\n            \"3Blue1Brown - Essence of Linear Algebra: Gaussian Elimination\": \"https://www.3blue1brown.com/topics/linear-algebra\"\n          },\n          \"tools\": {\n            \"Graphing calculator\": \"https://www.desmos.com/calculator\",\n            \"Online matrix calculator\": \"https://matrixcalc.org/\"\n          }\n        }\n      ],\n      \"exercises\": [\n        {\n          \"description\": \"Solve systems of linear equations using matrix methods.\",\n          \"searchTerms\": [\n            \"matrix method practice\",\n            \"system of equations exercises\"\n          ]\n        },\n        {\n          \"description\": \"Perform matrix operations - addition, subtraction, multiplication.\",\n          \"searchTerms\": [\n            \"matrix operations practice\",\n            \"matrix arithmetic exercises\"\n          ]\n        },\n        {\n          \"description\": \"Find matrix inverses and solve equations using inverse matrices.\",\n          \"searchTerms\": [\n            \"matrix inverse practice\",\n            \"inverse matrices exercises\"\n          ]\n        }\n      ]\n    }\n  ]\n}\n',
    //   tools: [{ type: "retrieval" }],
    //   model: "gpt-4-1106-preview",
    //   });
    //   console.log(assistant)
    
    //   const thread = await openai.beta.threads.create();
    //   console.log(thread)
    
    //   const message = await openai.beta.threads.messages.create(thread.id, {
    //       role: "user",
    //       content: topic,
    //   });
    //   console.log(message)
    
    //   const run = await openai.beta.threads.runs.create(thread.id, {
    //       assistant_id: assistant.id,
    //       instructions: "",    
    //   });
    //   console.log(run)

    //   setTimeout(() => {
    //     checkStatusAndPrintMessages(thread.id, run.id)
    //   }, 120000 );
      let jsonString = await getInfo(topic);
      navigate('/roadmap',  { state: JSON.parse(jsonString.message) }); // Navigate to the response page

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <Container maxWidth={false} marginLeft={0} className>
      {/* Removed the nested Box components */}
      <Box justifyItems={"left"} color={'lightblue'}>
        <Typography component="h5" variant="h5" marginBottom={5} marginTop={5}>
            EduAI
        </Typography>
      </Box>
      {loading ? (
        <>
        <Box marginTop={40}>
        <CircularProgress size={200} />
        </Box>
        </>
      ) : (
        <Box marginTop={30} marginLeft={0} sx={{ textAlign: 'left', width: '75%', BackgroundColor: 'white'}}>
          <Typography component="h6" variant="h6" marginBottom={2} marginTop={2}>
            Cooking
          </Typography>
          <Typography component="h5" variant="h5" marginBottom={2} marginTop={2}>
            Teach me about AI
          </Typography>
          <Typography component="h4" variant="h4" marginBottom={2} marginTop={2}>
            How to play the guitar
          </Typography>
          <Typography component="h3" variant="h3" marginBottom={2} marginTop={2}>
            Becoming a good soccer player
          </Typography>
          <Typography component="h2" variant="h2" marginBottom={5} marginTop={2}>
            Enter a topic to learn about it ...
          </Typography>
          <form onSubmit={handleSubmit}noValidate>
            <TextField 
              id="standard-basic" 
              name="topic"
              required
              fullWidth // Use fullWidth for responsive width
              autoFocus
              size='large'
              color='success'
              sx={{ mb: 2 }} // Add bottom margin
              inputProps={{style: {fontSize: 40, color: "white"}}} // font size of input text
            />
            {/* <Button
              type="submit"
              fullWidth // Use fullWidth for responsive width
              variant="contained"
              sx={{ mb: 2, outline: 'none' }}
            >
              Submit
            </Button> */}
          </form>
        </Box>
      )}
    </Container>
  );
}