import { Routes ,Route} from "react-router-dom";
import LoginPage from "./login";
import ForgotPasswordSupport from "./ForgotPasswordSupport";
const LayoutDefault =() =>{

    return(
        <>
        <Routes>

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/forgot-support" element={<ForgotPasswordSupport />} />
        </Routes>
        </>
    )

}

export default LayoutDefault;