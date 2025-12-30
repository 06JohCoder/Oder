import { Routes ,Route} from "react-router-dom";
import LoginPage from "./login";

const LayoutDefault =() =>{

    return(
        <>
        <Routes>

            <Route path="/login" element={<LoginPage/>} />
        </Routes>
        </>
    )

}

export default LayoutDefault;