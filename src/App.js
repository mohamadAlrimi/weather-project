import logo from "./logo.svg";
import "./App.css";
import Test from "./component/Test";
import { createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
// react 
import { useEffect ,useState } from "react";
// Material UI Container
import Container from "@mui/material/Container";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Button from '@mui/material/Button';

// External Librais
import axios from "axios"; 
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
},[]);
function App() {
  const [temp , setTemp] = useState(null)
  useEffect(()=>{
// Make a request for a user with a given ID
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=41.249390&lon=32.683201&appid=11121c0d0ae8106546a7a4dc9e36dde7')
  .then(function (response) {
    // handle success
    const responsTemp = Math.round(response.data.main.temp - 272.15 )
    setTemp(responsTemp)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  })
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONYAINER  */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:"column"
            }}
          >
            {/* CARD  */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                color: "white",
                padding: "10px",
                background: "rgb(28 52 91 / 36% )",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0 ,0, 0 ,0.05)",
              }}
            >
              {/* CONTENT  */}
              <div>
                {/* CITY && TIME  */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography variant="h2" style={{ marginRight: "20px" }}>
                    كرابوك
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    2025/24/2 الخميس
                  </Typography>
                </div>
                {/* ===CITY && TIME  ====*/}
                <hr />
                {/* Container of degree + cloud icon  */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGRE && DESCRIPTION  */}
                  <div>
                    {/* TEMP  */}
                    <div>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp}
                      </Typography>
                      {/* todo temp imge  */}
                    </div>
                    {/* TEMP ==== */}
                    <Typography variant="h6" style={{ textAlign: "right" }}>
                      broken cloulds
                    </Typography>
                    {/* MIn && MAX  */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى : 34</h5>
                      <h5 style={{ margin: "0px 5px"}}>|</h5>
                      <h5>الكبرى : 34</h5>
                    </div>
                  </div>
                  {/* ===DEGRE && DESCRIPTION ==== */}
                  <AcUnitIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* =====Container of degree + cloud icon=======  */}
              </div>
              {/* ===CONTENT===  */}
            </div>
            {/* ====CARD====  */}
            {/* TRANSLATION CONTATNER  */}
            <div dir="rtl" style={{display:"flex",justifyContent:"end" , width:"100%" ,marginTop:"20px"}}>
            <Button style={{color:"white"}} variant="text">انجليزي</Button>
            </div>
            {/*===== TRANSLATION CONTATNER ======= */}
          </div>
          {/* ==CONTENT CONYAINER === */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
