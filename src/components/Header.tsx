import {Link, useNavigate} from "react-router-dom"

function Header() {
    const navigate = useNavigate()
    const onAboutClick =() => {
        navigate("/about")
    }
    return (
        <header>
            <h1>Header</h1>
        </header>
    )
}

export default Header;