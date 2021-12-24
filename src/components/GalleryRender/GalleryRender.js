import { useState, useEffect } from 'react';
import { searchPhotos } from '../../API/photo-api';
import { ImageGallery } from '../ImageGallery';
import { Button } from '../Button';
import { LoaderSpinner } from '../Loader';
import { Error } from '../Error';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const GalleryRender = ({ search, onModalOpen }) => {
  const [searchArr, setSearchArr] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (search !== '') {
      setStatus(Status.PENDING);
      setSearchArr([]);
      setPage(1);
    }
  }, [search]);

  useEffect(() => {
    if (search === '') {
      return;
    }
    if (page > 0) {
      searchPhotos(search, page)
        .then(arr => {
          setSearchArr([...searchArr, ...arr]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [page]);
  useEffect(() => {
    if (page > 1) {
      smoothScroll();
    }
  }, [searchArr]);

  function onLoadMore() {
    setPage(page + 1);
  }
  function smoothScroll() {
    console.log('smooth scroll');
    const element = document.getElementById(
      searchArr[searchArr.length - 10].id,
    );
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  function openModal(event) {
    onModalOpen(event);
  }

  if (status === 'pending') {
    return <LoaderSpinner />;
  }
  if (status === 'rejected') {
    return <Error message={error.message} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery searchValueArr={searchArr} openModal={openModal} />
        <Button onLoadMore={onLoadMore} />
      </>
    );
  }

  return null;
};

GalleryRender.propTypes = {
  search: PropTypes.string,
  onModalOpen: PropTypes.func,
};

export { GalleryRender };
