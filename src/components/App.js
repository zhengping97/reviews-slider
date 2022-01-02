import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  // set limit of index
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people])

  //autoplay
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 4000);
    return () => clearInterval(slider);
  }, [index])

  //surprise me button
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(randomNumber);
  };

  return <section className="section">
    <div className='title'>
      <h2>
        <span>/</span>reviews
      </h2>
    </div>
    <div className="section-center">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        // change position and opacity
        let position = "nextSlide";
        if (personIndex === index) {
          position = 'activeSlide';
        }
        if (personIndex === index - 1
          || (index === 0 && personIndex === people.length - 1)) {
          position = 'lastSlide';
        }
        return (
          <article className={position} key={id}>
            <div className='img-container'>
              <img src={image} alt={name} className='person-img' />
              <span className='quote-icon'>
                <FaQuoteRight />
              </span>
            </div>
            <h4>{name}</h4>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <button className='random-btn' onClick={randomPerson}>
              surprise me
            </button>
          </article>
        );
      })}
      <button className='prev' onClick={() => setIndex(index - 1)}><FiChevronLeft /></button>
      <button className='next' onClick={() => setIndex(index + 1)}><FiChevronRight /></button>
    </div>
  </section >
}

export default App;
