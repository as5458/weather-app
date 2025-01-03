const weatherform=document.querySelector(".weatherform")
const cityinput=document.querySelector(".cityname")
const card=document.querySelector(".card")
const apikey="2fbed35de0e29e9e4061a31c4904514b";
weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityinput.value.trim();
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            if (weatherdata) {
                displayweatherinfo(weatherdata);
            }
        } catch (error) {
            displayerror("could not fetch weather data");
        }
    } else {
        displayerror("Please enter a city!");
    }
});

async function getweatherdata(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
const response=await fetch(apiurl);
if(!response.ok){
    throw new Error("could not fetch weather data")
}
return await response.json();
    
}
function displayweatherinfo(data) {
    const {name: city,main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex"
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiddisplay=document.createElement("p");
    const deskdisplay=document.createElement("p");
    const weatheremoji=document.createElement("p");
    citydisplay.textContent=city;
    tempdisplay.textContent=`${temp.toFixed(0)}°C`;
    humiddisplay.textContent=`Humidity:${humidity}%`;
    deskdisplay.textContent=`${description}`;
    weatheremoji.textContent=getweatheremoji(`${id}`)
    card.appendChild(citydisplay)
    card.appendChild(tempdisplay)
    card.appendChild(humiddisplay)
    card.appendChild(deskdisplay)
    card.appendChild(weatheremoji)
    citydisplay.classList.add("citydisplay")
    tempdisplay.classList.add("temp")
    humiddisplay.classList.add("humidity")
    deskdisplay.classList.add("deskdisplay")
    weatheremoji.classList.add("weatheremoji")




    
}
function getweatheremoji(weatherId) {
    switch(true)
    {
        case(weatherId >=200 && weatherId<300):
        return "⛈️"
        break
        
        case(weatherId >=300 && weatherId<600):
        return "🌧️"
        break
        case(weatherId >=600 && weatherId<700):
        return "❄️"
        break
        
        case(weatherId >=700 && weatherId<800):
        return "🌫️"
        break
        case(weatherId ===800 ):
        return "☀️"
        break
        case(weatherId >=800 && weatherId<810):
        return "☁️"
        break
       
        default:
            return "❓"
        }
    
}
function displayerror(message){
const errordisplay=document.createElement("p");
errordisplay.textContent=message;
errordisplay.classList.add(".error")
card.textContent="";
card.style.display="flex";
card.appendChild(errordisplay)
console.log("hello")
}