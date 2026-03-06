import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import ImageModal from "./components/ImageModal";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  const [modalItem, setModalItem] = useState(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery onOpenModal={setModalItem} />
        <About />
      </main>
      <Footer />

      {modalItem && (
        <ImageModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  );
}
