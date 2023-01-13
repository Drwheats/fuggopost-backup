import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function NavBar() {


    return (
        <nav className="nav">
        <Link to="/home" className="site-title">Fuggo's Post World</Link>
            <ul>
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/Login">Login</CustomLink>
            {/*<CustomLink to="/scores">HighScores</CustomLink>*/}

        </ul>
    </nav> )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>

        </li>
    )
}

