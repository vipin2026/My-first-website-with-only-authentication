import Home from './pages/Home/Home'
import About from './pages/About/About';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import SentOtp from './pages/Otp/sent/SentOtp';
import VerifyOtp from './pages/Otp/verify/VerifyOtp';



const routes = [
{path:"/", component: Home},
{path:'/about', component:About},
{path:'/signup', component:SignUp},
{path:'/login', component:Login},
{path:'/sentotp', component:SentOtp},
{path:'/verifyotp', component:VerifyOtp}
];
export default routes