import { useState, useEffect } from 'react';
import './App.css';
import { Searchbar } from './components/Searchbar';
import { GalleryRender } from './components/GalleryRender';
import { Modal } from './components/Modal';

const App = () => {
  const [search, setsearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalImgData, setModalImgData] = useState({ src: '', alt: '' });

  useEffect(() => {
    if (openModal === false) {
      setModalImgData({ src: '', alt: '' });
    }
  }, [openModal]);

  function onSearchSubmit(data) {
    setsearch(data);
  }

  function toggleModal() {
    setOpenModal(!openModal);
  }

  function onModalOpen(event) {
    if (event.target.nodeName === 'IMG') {
      toggleModal();
      setModalImgData({ src: event.target.dataset.src, alt: event.target.alt });
    }
  }

  return (
    <div className="App">
      <Searchbar onSubmit={onSearchSubmit} />

      <GalleryRender onModalOpen={onModalOpen} search={search} />

      {openModal === true && (
        <Modal
          onClose={toggleModal}
          src={modalImgData.src}
          alt={modalImgData.alt}
        />
      )}
    </div>
  );
};

export default App;
