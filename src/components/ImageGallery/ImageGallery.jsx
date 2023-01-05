import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, openModalWindow }) => {
  return (
    <>
      {pictures.length > 0 ? (
        <GalleryList onClick={openModalWindow}>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </GalleryList>
      ) : (
        ''
      )}
    </>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
