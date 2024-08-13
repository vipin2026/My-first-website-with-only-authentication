import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import SentOtp from "./pages/Otp/sent/SentOtp";
import VerifyOtp from "./pages/Otp/verify/VerifyOtp";
import SentOtp1 from "./pages/Otp/sent/SentOtp1";
import Verifyotp1 from "./pages/Otp/verify/VerifyOtp1";
import Profile from "./pages/Profile_Home_Page/Profile";
import Test from "./pages/LoginPage2/Test";
import File from "./pages/FileUpload/File";
import GetFile from "./pages/GetFile/GetFile";
import ForgotPassword from "./pages/ForgotPass/forgotPass";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login },
  { path: "/sentotp", component: SentOtp },
  { path: "/verifyotp", component: VerifyOtp },
  { path: "/sentotp1", component: SentOtp1 },
  { path: "/forgotpassword", component: ForgotPassword },
  { path: "/verifyotp1", component: Verifyotp1 },
  { path: "/profile", component: Profile },
  { path: "/test", component: Test },
  { path: "/file", component: File },
  { path: "getfile", component: GetFile },
];
export default routes;
