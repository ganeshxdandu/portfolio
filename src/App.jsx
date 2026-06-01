import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
};
export default App;
