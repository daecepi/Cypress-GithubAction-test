

var sliderConfigurations = {
  'reviews-horizontal': {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    nextArrow: '.arrow-left',
    prevArrow: '.arrow-right',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  'reviews-vertical': {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    nextArrow: '.arrow-left',
    prevArrow: '.arrow-right',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
};
