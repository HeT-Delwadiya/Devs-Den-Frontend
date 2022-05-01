import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./core/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import DevProfile from "./user/DevProfile";
import EditDevProfile from "./user/EditDevProfile"
import CompanyProfile from "./user/CompanyProfile";
import EditComProfile from "./user/EditComProfile";
import CreatePost from "./post/CreatePost";
import Feed from "./core/Feed";
import Compiler from "./core/Compiler";
import FindDevelopers from "./core/FindDevelopers";
import FindCompanies from "./core/FindCompanies";
import SavedCode from "./core/SavedCode";
import Docs from "./core/Docs";
import Communication from "./communication/Communication";
import CreateGroup from "./communication/CreateGroup";
import JoinGroup from "./communication/JoinGroup";
import GroupInfo from "./communication/components/GroupInfo";
import ContactUs from "./core/ContactUs";
import AboutUs from "./core/AboutUs";
import VerifyUser from "./user/VerifyUser";
import VerifyCompany from "./user/VerifyCompany";

function Routes() {
       return (
              <BrowserRouter>
                     <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/register" exact component={Register} />
                     <Route path="/login" exact component={Login} />
                     <Route path="/contact" exact component={ContactUs} />
                     <Route path="/about" exact component={AboutUs} />
                     <Route path="/user/verify/:userId/:token" exact component={VerifyUser} />
                     <Route path="/company/verify/:companyId/:token" exact component={VerifyCompany} />
                     <PrivateRoutes path="/compiler" exact component={Compiler} />
                     <PrivateRoutes path="/compiler/code/:codeId" exact component={SavedCode} />
                     <PrivateRoutes path="/docs" exact component={Docs} />
                     <PrivateRoutes path="/conversations/all" exact component={Communication} />
                     <PrivateRoutes path="/conversations/group/create" exact component={CreateGroup} />
                     <PrivateRoutes path="/conversations/group/:groupId/info" exact component={GroupInfo} />
                     <PrivateRoutes path="/group/:groupId/join/:joinId" exact component={JoinGroup} />
                     <PrivateRoutes path="/user/:userId/profile" exact component={DevProfile} />
                     <PrivateRoutes path="/user/:userId/profile/edit" exact component={EditDevProfile} />
                     <PrivateRoutes path="/company/:companyId/profile" exact component={CompanyProfile} />
                     <PrivateRoutes path="/company/:companyId/profile/edit" exact component={EditComProfile} />
                     <PrivateRoutes path="/user/:userId/post/create" exact component={CreatePost} />
                     <PrivateRoutes path="/user/feed" exact component={Feed} />
                     <PrivateRoutes path="/find/developers" exact component={FindDevelopers} />
                     <PrivateRoutes path="/find/companies" exact component={FindCompanies} />
                     </Switch>
              </BrowserRouter>
       )
}

export default Routes;