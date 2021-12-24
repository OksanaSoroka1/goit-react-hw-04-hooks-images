import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './imageGallery.module.css';

const ImageGallery = ({ searchValueArr, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {searchValueArr.map(item => (
        <ImageGalleryItem
          openModal={event => openModal(event)}
          key={item.id}
          src={item.webformatURL}
          alt={item.tags}
          dataSrc={item.largeImageURL}
          id={item.id}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  searchValueArr: PropTypes.array,
  openModal: PropTypes.func,
};
export { ImageGallery };
