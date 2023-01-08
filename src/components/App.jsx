import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhotos } from 'services/fetchPhotos';
import { Wrapper, ErrorMsg } from './Loader/Loader.styled';

export class App extends Component {
  state = {
    searchPicture: '',
    pictures: [],
    page: 1,
    search: '',
    nextSearch: '',
    isLoading: false,
    // isModalOpen: false,
    // modalImg: null,
    error: null,
  };


  updatePictures = async newSearch => {
    const { page, pictures, search } = this.state;

    try {
      const photos = await fetchPhotos(newSearch, page);
      const oldPictures = pictures;
      if (photos.length !== 0) {
        const newPictures = [...oldPictures, ...photos];
        if (search !== newSearch) {
          this.setState({ pictures: photos, page: 1 });
        }
        if (search === newSearch) {
          this.setState({ pictures: newPictures, page: page + 1 });
        }
      } else {
        alert('Sorry, no image matching');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  resetArray = (searchPicture) => {
    this.setState({
      search: searchPicture,
      isLoading: true,
      pictures: [],
      page: 1,
    });
  };

  changeSearchValue = ({ searchPicture }) => {
    this.resetArray(searchPicture);
    this.updatePictures(searchPicture);
  };

  loadMorePictures = () => {
    const { nextSearch } = this.state;
    this.updatePictures(nextSearch);
  };

  async componentDidUpdate() {
    const { search, nextSearch } = this.state;
    if (nextSearch !== search) {
      this.updatePictures(search);
      this.setState({ nextSearch: search });
    }
  };
  modal = {
    show: false,
    img: null,
   }
  openModalWindow = e => {
    const largeImg = e.target.dataset.source;
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({
     img: largeImg,
     show : true,
    });
  };

  closeModalWindow = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    this.setState({ show: false });
  };
  render() {
    const { error, pictures, isLoading, show, img } = this.state;
    if (show) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          this.setState({ show: false });
        }
      });
    }
    return (
      <Wrapper>
        <Searchbar newSearch={this.changeSearchValue} />
        {error && (
          <ErrorMsg>Whoops, something went wrong: {error.message}</ErrorMsg>
        )}
       
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            openModalWindow={this.openModalWindow}
          />
        )}
         {isLoading && <Loader />}
        {pictures.length > 0 &&
          <Button text="Load more" func={this.loadMorePictures} />
        }

        {show && (
          <Modal modalImgLarge={img} closeImg={this.closeModalWindow} />
        )}
      </Wrapper>
    );
  }
}