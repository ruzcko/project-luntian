import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router-dom";
import { auth, db, googleProvider } from "../utils/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import logo from "../assets/logo.png";
import Loading from "../components/Loading";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bg from "../assets/Home/header_photo.jpg";
import dlsu from "../assets/Home/dlsu.png";
import Member from "../components/Member";
import {
  elmer_dadios,
  msc_amir_bracino,
  msc_christian_hail_mendigoria,
  msc_heinrick_aquino,
  msc_jonnel_alejandrino,
  msc_justin_deguia,
  msc_lue_xiong,
  msc_oliver_john_alajas,
  msc_rogelio_ruzcko_tobias,
  msc_sandy_lauguico,
  msc_vincent_jan_almero,
  phd_jon_calinao,
  phd_jo_ann_magsumbol,
  phd_maria_gemel_palconit_1,
  phd_marife_rosales,
  phd_michael_pareja,
  phd_ronnioe_concepcion_ii,
} from "../components/member-images";

type ProviderTypes = "GOOGLE" | "FACEBOOK" | "GITHUB";

const Home: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return !user ? <HomeNav /> : <Redirect to="/home" />;
};

const Container: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full mx-auto max-w-7xl ${className}`}>{children}</div>
  );
};

function HomeNav() {
  const history = useHistory();
  const [yOff, setYOff] = useState(0);

  const handleNewUser = async (user: firebase.auth.UserCredential) => {
    if (user.additionalUserInfo && user.user) {
      if (user.additionalUserInfo.isNewUser) {
        await db.collection("users").doc(user.user.uid).set({
          isAdmin: false,
          firstName: "",
          lastName: "",
          email: user.user.email,
          privilege: "USER",
          signupCompleted: false,
        });
        history.push("/home/profile");
      }

      history.push("/");
    } else alert("Something went wrong.");
  };

  const handleProviderLogin = (prov: ProviderTypes) => {
    if (prov === "GOOGLE") {
      auth
        .signInWithPopup(googleProvider)
        .then(handleNewUser)
        .catch((error) => alert(error.message));
    }
  };

  const handleScroll = () => {
    setYOff(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav
        className={`z-20 fixed top-0 w-full transition-colors duration-300 ${
          yOff > 0 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3 text-xl">
              <div className="bg-white rounded-full">
                <img src={logo} alt="logo" className="h-10" />
              </div>
              <h1
                className={`font-bold text-sm md:text-lg transition-colors duration-300 tracking-widest uppercase ${
                  yOff > 0 ? "text-gray-700" : "text-white"
                }`}
              >
                Luntian
              </h1>
            </div>

            <button
              onClick={() => handleProviderLogin("GOOGLE")}
              className="flex items-center px-4 py-2 space-x-2 text-sm text-white transition-colors duration-300 bg-green-500 rounded-full hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faGoogle} />
              <p>Login/Signup</p>
            </button>
          </div>
        </Container>
      </nav>

      <div className="relative z-10 w-full pt-14 h-[600px]">
        <div className="absolute inset-0 z-[-2]">
          <img
            src={bg}
            alt="background_image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute z-[-1] inset-0 bg-black opacity-40" />

        <div className="z-10 flex flex-col justify-center w-full h-full text-white">
          <Container className="px-4">
            <h1 className="text-4xl tracking-wide text-center md:text-5xl xl:text-6xl font-extralight xl:text-left">
              Welcome to Project Luntian
            </h1>

            <div className="pt-10">
              <p className="text-base font-light text-center md:text-xl xl:text-left">
                Urban Agriculture
              </p>
              <p className="text-base font-light text-center md:text-xl xl:text-left">
                Hydroponics
              </p>
              <p className="text-base font-light text-center md:text-xl xl:text-left">
                Aquaculture{" "}
              </p>
              <p className="text-base font-light text-center md:text-xl xl:text-left">
                Farm-to-table
              </p>
            </div>
          </Container>
        </div>
      </div>

      <div className="bg-gray-100">
        <Container className="flex flex-col items-center px-4 py-20 space-y-4">
          <h2 className="text-3xl text-gray-700 md:text-4xl">
            About the Project
          </h2>

          <img src={logo} alt="logo_2" className="h-20" />

          <p className="py-4 text-base text-center text-gray-500 md:text-lg">
            LUNTIAN is a Research and Development project from De La Salle
            University that provides sustainable food production through closed
            environment aquaponic system, agriculture intensification through
            vertical farming using computational intelligence, and life cycle
            assessment for the farm-to-table{" "}
          </p>

          <img src={dlsu} alt="dlsu_logo" className="h-20" />
        </Container>
      </div>

      <div className="bg-white">
        <Container className="flex flex-col items-center px-4 py-20 space-y-4">
          <h2 className="text-3xl text-gray-700 md:text-4xl">About the Team</h2>

          <Member
            name="Dr. Elmer Dadios"
            image={elmer_dadios}
            description="Project Head and Adviser"
          />

          <p className="pt-10 pb-4 text-2xl text-gray-800">PhD Candidates</p>

          <div className="grid grid-cols-2 gap-4 md:gap-8 xl:gap-x-16 md:grid-cols-3">
            <Member
              name="Engr. Ronnie Concepcion II"
              image={phd_ronnioe_concepcion_ii}
            />
            <Member
              name="Engr. Maria Gemel Palconit"
              image={phd_maria_gemel_palconit_1}
            />
            <Member name="Engr. Marife Rosales" image={phd_marife_rosales} />
            <Member
              name="Engr. Jo-Ann Magsumbol"
              image={phd_jo_ann_magsumbol}
            />
            <Member
              className="md:col-start-2"
              name="Engr. Jon Calinao"
              image={phd_jon_calinao}
            />
            <Member name="Engr. Michael Pareja" image={phd_michael_pareja} />
          </div>

          <p className="pt-10 pb-4 text-2xl text-gray-800">MS Candidates</p>

          <div className="grid grid-cols-2 gap-4 md:gap-8 xl:gap-x-16 md:grid-cols-3 xl:grid-cols-4">
            <Member
              name="Engr. Rogelio Ruzcko Tobias"
              image={msc_rogelio_ruzcko_tobias}
            />
            <Member name="Engr. Sandy Lauguico" image={msc_sandy_lauguico} />
            <Member
              name="Engr. Jonnel Alejandrino"
              image={msc_jonnel_alejandrino}
            />
            <Member name="Engr. Justin De Guia" image={msc_justin_deguia} />
            <Member name="Engr. Lue Xiong" image={msc_lue_xiong} />
            <Member
              name="Engr. Vincent Almero"
              image={msc_vincent_jan_almero}
            />
            <Member name="Engr. Amir Bracino" image={msc_amir_bracino} />
            <Member name="Engr. Heinrick Aquino" image={msc_heinrick_aquino} />
            <Member
              className="xl:col-start-2"
              name="Engr. Christian Hail Mendigoria"
              image={msc_christian_hail_mendigoria}
            />
            <Member
              className="md:col-start-2 xl:col-start-auto"
              name="Engr. Oliver John Alajas"
              image={msc_oliver_john_alajas}
            />
          </div>
        </Container>
      </div>

      <div className="bg-green-700">
        <Container className="flex flex-col items-center px-4 py-10 text-white">
          <h4 className="text-lg">Contact Us</h4>

          <p className="mt-4 font-light">luntian.project.dev@gmail.com</p>
          <a
            className="font-light underline"
            href="https://www.facebook.com/dlsuluntian"
            target="_blank"
            rel="noreferrer"
          >
            dlsuluntian
          </a>

          <p className="mt-6 text-xs font-light">
            © 2021 Luntian. All rights reserved.
          </p>
        </Container>
      </div>
    </div>
  );
}

export default Home;
