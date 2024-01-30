import {useState} from "react";
import "./SideMenu.css";

function SideMenu() {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className={`menu-icon open ${isActive ? "" : "active"}`} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-layout-sidebar-right-expand" width="24" height="24"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                    <path d="M15 4v16"/>
                    <path d="M10 10l-2 2l2 2"/>
                </svg>
            </div>


            <div className={`sideMenu ${isActive ? "active" : ""}`}>
                <div className={`menu-icon close ${isActive ? "active" : ""}`} onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="icon icon-tabler icon-tabler-layout-sidebar-right-collapse" width="24" height="24"
                         viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
                         stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                        <path d="M15 4v16"/>
                        <path d="M9 10l2 2l-2 2"/>
                    </svg>
                </div>
                <div className="menu-content">
                    <h2>Apps</h2>
                    <ul>
                        <li>
                            <a href="https://chiloanerk.github.io/stopwatch/">- Stopwatch -</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideMenu;