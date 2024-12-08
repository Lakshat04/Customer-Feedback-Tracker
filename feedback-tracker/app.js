const [currentIndex, setCurrentIndex] = useState(0);

const scrollLeft = () => {
  setCurrentIndex((prevIndex) => (prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1));
};

const scrollRight = () => {
  setCurrentIndex((prevIndex) => (prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1));
};

useEffect(() => {
  const carousel = document.querySelector('.carousel-inner');
  const offset = currentIndex * 270; // The width of each card (including margin)
  carousel.style.transform = `translateX(-${offset}px)`;
}, [currentIndex]);
