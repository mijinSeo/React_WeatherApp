import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState} from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

//앱이 실행되면 현재 위치 기반의 날씨가 보인다.
//날씨 정보에는 도시,섭씨,화씨,날씨상태
//5개의 버튼이 있다 (1개는 현재위치,4개는 다른도시)
//도시버튼을 클릭하면 도시별 날씨보임
//현재위치 버튼을 누르면 다시 현재 위치기반으로 돌아옴.
//데이터을 들고오는동안 로딩 스피너가 돈다

const cities =['New york','Paris','Hong Kong','Tokyo'];


function App() {
  const [weather, setWeather] =useState(null);
  const [city, setCity]=useState(null);
  const [loading, setLoading] =useState(true);
  const [apiError, setAPIError] =useState("");

  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude}= position.coords;
      getWeatherByCurrentLocation(latitude,longitude);
    });
  };

  const getWeatherByCurrentLocation=async(lat,lon)=>{
    try {
      let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e958ba6bf8ffaf7e73a36716d5e18197&units=metric`
      const res =await fetch(url);
      const data =await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
   
  };

  const getWeatherByCity=async()=>{
    try {
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e958ba6bf8ffaf7e73a36716d5e18197&units=metric`
      const res =await fetch(url);
      const data =await res.json();
      setWeather(data);
      setLoading(false);

    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange =(city) =>{
    if (city === "current"){
      setCity(null);
    }else{
      setCity(city);
    }
  };

  useEffect(()=>{
    if(city==null){
      setLoading(true);
      getCurrentLocation();
    }else{
      setLoading(true);
      getWeatherByCity();
    }
  },[city]);

  

  return (
    <div>
      {loading? (
        <div className='container'>
      <ClipLoader color="#f88c6b" loading={loading} size={50}/></div>
        ): !apiError?( 
      <div className='container'>
        <WeatherBox weather={weather}/>
        <WeatherButton className='button'cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
      </div>
    ):(
      apiError
    )}

    </div>
  );
}

export default App;
