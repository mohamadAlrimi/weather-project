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
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from 'react-i18next';
moment.locale("ar"); 
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
},[]);
let canclAxios = null ;
function App() {
  // STATE 
  const [locale, setLocale]=useState("ar")
  const { t, i18n } = useTranslation();
  const[dateAndTime ,setdateAndTime]=useState("");
  const [temp , setTemp] = useState({
    number:null,
    description:"",
    min:null,
    max:null, 
    icon:null
  })

  // EVENTS HANDLERS 
  function handlelanguageClick(){
    if(locale==="en"){
      setLocale("ar")
      i18n.changeLanguage("ar");
      moment.locale("ar"); 
    }else {
      setLocale("en")
      i18n.changeLanguage("en");
      moment.locale("en"); 
    }
    setdateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
  }
  useEffect(()=>{
    i18n.changeLanguage(locale);
  },[])
  useEffect(()=>{
    
    setdateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
// Make a request for a user with a given ID
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=41.249390&lon=32.683201&appid=11121c0d0ae8106546a7a4dc9e36dde7',
  {
    cancelToken:new axios.CancelToken((c)=>{
      canclAxios = c ;
    })
  }
)
  .then(function (response) {
    // handle success
    const responsTemp = Math.round(response.data.main.temp - 272.15 );
    const min= Math.round(response.data.main.temp_min - 272.15 );
    const max =Math.round(response.data.main.temp_max - 272.15   );
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    setTemp({number:responsTemp , min :min ,max:max, description:description ,icon:` https://openweathermap.org/img/wn/${responseIcon}@2x.png`})
    console.log(max ,min, description)
    console.log(response.data)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
return() =>{
  canclAxios();
}
  },[])
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
                    {t("karabuk")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
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
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                   <img src={temp.icon}/>
                    </div>
                    {/* TEMP ==== */}
                    <Typography variant="h6" style={{ textAlign: "right" }}>
                      {t(temp.description)}
                    </Typography>
                    {/* MIn && MAX  */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>{t("min")}:    {temp.min}</h5>
                      <h5 style={{ margin: "0px 5px"}}>|</h5>
                      <h5>{t("max")} : {temp.max}</h5>
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
            <Button onClick={handlelanguageClick} style={{color:"white"}} variant="text">{locale==="en" ? "ARABIC" :"انجليزي"}</Button>
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
