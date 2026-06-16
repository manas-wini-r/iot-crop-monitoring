import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { database } from "../firebase";

function Profile() {

const auth = getAuth();
const user = auth.currentUser;

const [loading, setLoading] = useState(true);
const [profile, setProfile] = useState(null);

const [name, setName] = useState("");
const [location, setLocation] = useState("");
const [farmType, setFarmType] = useState("");

useEffect(() => {

if (!user) return;

const profileRef = ref(database, "users/" + user.uid);

get(profileRef).then((snapshot) => {

if (snapshot.exists()) {
setProfile(snapshot.val());
}

setLoading(false);

});

}, [user]);

const saveProfile = async () => {

const profileData = {
name,
location,
farmType,
email: user.email
};

await set(ref(database, "users/" + user.uid), profileData);

setProfile(profileData);

};

if (loading) {
return <div className="p-10 text-gray-500">Loading profile...</div>;
}

return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10 flex justify-center">

<div className="w-full max-w-3xl">

{/* Banner */}

<div className="bg-gradient-to-r from-green-500 to-green-600 h-44 rounded-2xl shadow-xl relative">

<div className="absolute -bottom-14 left-10 w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-green-600">
{profile ? profile.name.charAt(0) : "?"}
</div>

</div>

{/* Content */}

<div className="mt-20 bg-white rounded-2xl shadow-xl p-10">

{!profile ? (

<>
<h1 className="text-2xl font-semibold text-gray-800 mb-6">
Welcome 👋 Let's setup your farmer profile
</h1>

<div className="space-y-4">

<input
type="text"
placeholder="Farmer Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

<input
type="text"
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

<input
type="text"
placeholder="Farm Type (Organic / Smart / Mixed)"
value={farmType}
onChange={(e)=>setFarmType(e.target.value)}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
/>

<button
onClick={saveProfile}
className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
>
Save Profile
</button>

</div>

</>

) : (

<>
<h1 className="text-3xl font-bold text-gray-800 mb-2">
Welcome, {profile.name} !
</h1>

<p className="text-gray-500 mb-8">
Your smart farming profile
</p>

<div className="space-y-5 text-gray-700">

<div className="flex justify-between border-b pb-3">
<span className="text-gray-500">Name</span>
<span className="font-medium">{profile.name}</span>
</div>

<div className="flex justify-between border-b pb-3">
<span className="text-gray-500">Email</span>
<span className="font-medium">{profile.email}</span>
</div>

<div className="flex justify-between border-b pb-3">
<span className="text-gray-500">Location</span>
<span className="font-medium">{profile.location}</span>
</div>

<div className="flex justify-between border-b pb-3">
<span className="text-gray-500">Farm Type</span>
<span className="font-medium">{profile.farmType}</span>
</div>

</div>

</>

)}

</div>

</div>

</div>

);

}

export default Profile;