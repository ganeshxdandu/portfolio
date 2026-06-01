import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";

const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Projects />
        </>
    );
};
export default App;
