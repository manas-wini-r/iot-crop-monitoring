import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

function AlertNotification(){

const [alert,setAlert] = useState("");

useEffect(()=>{

const sensorRef = ref(database,"sensorData");

onValue(sensorRef,(snapshot)=>{

const data = snapshot.val();

if(data){

if(data.moisture < 300){

setAlert("⚠ Low Soil Moisture!");

}

else if(data.temperature > 35){

setAlert("⚠ High Temperature!");

}

else{

setAlert("");

}

}

})

},[])

return(

<div>

{alert && (

<div className="bg-red-500 text-white p-4 rounded mb-4">

{alert}

</div>

)}

</div>

)

}

export default AlertNotification;