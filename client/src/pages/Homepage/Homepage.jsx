import "./Homepage.css";


import Navbar from "../../components/Navbar/Navbar";
import HomepageJumbotron from "../../components/HomepageJumbotron/HomepageJumbotron";
import Footer from "../../components/Footer/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <HomepageJumbotron />
      <Footer />
    </>
  );
}
