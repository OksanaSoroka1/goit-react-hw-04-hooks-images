import PropTypes from 'prop-types';
import css from './imageGallery.module.css';

const ImageGalleryItem = ({ src, alt, openModal, dataSrc, id }) => {
  return (
    <li onClick={openModal} className={css.ImageGalleryItem}>
      <img
        className={css['ImageGalleryItem-image']}
        src={src}
        alt={alt}
        data-src={dataSrc}
        id={id}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  openModal: PropTypes.func,
  dataSrc: PropTypes.string,
};

export { ImageGalleryItem };
