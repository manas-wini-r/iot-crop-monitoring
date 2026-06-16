import { NavLink } from "react-router-dom";

function Sidebar() {

const linkStyle =
"block px-4 py-2 rounded-lg transition duration-200";

const activeStyle =
"bg-white text-green-700 font-semibold shadow";

return (

<div className="w-64 bg-green-700 text-white min-h-screen p-6">

<h2 className="text-2xl font-bold mb-10">Smart Farm 🌱</h2>

<ul className="space-y-3">

<li>
<NavLink
to="/"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Dashboard
</NavLink>
</li>

<li>
<NavLink
to="/crop"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Crop Recommendation
</NavLink>
</li>

<li>
<NavLink
to="/sensors"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Sensors Deployed
</NavLink>
</li>

<li>
<NavLink
to="/analytics"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Analytics
</NavLink>
</li>

<li>
<NavLink
to="/farmmap"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Farm Map
</NavLink>
</li>

<li>
<NavLink
to="/soil"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Soil Health
</NavLink>
</li>

<li>
<NavLink
to="/history"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
History
</NavLink>
</li>

<li>
<NavLink
to="/alerts"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Alerts
</NavLink>
</li>

<li>
<NavLink
to="/settings"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Settings
</NavLink>
</li>

<li>
<NavLink
to="/profile"
className={({isActive}) =>
`${linkStyle} ${isActive ? activeStyle : "hover:bg-green-600"}`
}
>
Profile
</NavLink>
</li>

</ul>

</div>

)

}

export default Sidebar;