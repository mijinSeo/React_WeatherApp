import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState} from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

//앱이 실행되면 현재 위치 기반의 날씨가 보인다.
//날씨 정보에는 도시,섭씨,화씨,날씨상태
//5개의 버튼이 있다 (1개는 현재위치,4개는 다른도시)
//도시버튼을 클릭하면 도시별 날씨보임
//현재위치 버튼을 누르면 다시 현재 위치기반으로 돌아옴.
//데이터을 들고오는동안 로딩 스피너가 돈다

function App() {

  const [weather, setWeather] =useState(null);
  const [city, setCity]=useState("");
  const cities =['new york','Paris','Hong Kong','Tokyo'];
  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e958ba6bf8ffaf7e73a36716d5e18197&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  };

  const getWeatherByCity=async()=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e958ba6bf8ffaf7e73a36716d5e18197&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city]);



  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
      </div>
    
    </div>
  );
}

export default App;
