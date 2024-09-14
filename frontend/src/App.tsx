import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { Redirect, Route, Switch } from "wouter";
import ProtectRoute from "./components/ProtectRoute.tsx";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewTripPage from "./pages/NewTripPage";
import PackingListPage from "./pages/PackingListPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TripOverviewPage from "./pages/TripOverviewPage";

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return (
    <CssVarsProvider>
      <CssBaseline/>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreInstance}>
          <Switch>
            <Route path="/">
              <Redirect to="/login"/>
            </Route>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <ProtectRoute>
              <Route path="/home" component={HomePage}/>
              <Route path="/profile" component={ProfilePage}/>
              <Route path="/editprofile" component={EditProfilePage}/>
              <Route path="/newtrip" component={NewTripPage}/>
              <Route path="/tripoverview/:tripId" component={TripOverviewPage}/>
              <Route path="/packinglist/:tripId" component={PackingListPage}/>
            </ProtectRoute>
          </Switch>
        </FirestoreProvider>
      </AuthProvider>
    </CssVarsProvider>
  );
}

export default App;