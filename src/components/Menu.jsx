import React, { useRef, useState } from "react";
import { allCocktails } from "../../contants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlider = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalSlider) % totalSlider;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalSlider) % totalSlider // how was indexOffset got? answer: it is used to get the next or previous cocktail based on the current index where is it coming from? answer: it is passed as an argument to the function getCocktailAt, which is called in nextCocktail and prevCocktail functions
    ];
  };

  const currentCocktail = getCocktailAt(0);

  const nextCocktail = () => {
    return getCocktailAt(1);
  };

  const prevCocktail = () => {
    return getCocktailAt(-1);
  };

  useGSAP(() => {
    // const content = contentRef.current;

    const menuLeafTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    menuLeafTimeline.to("#m-left-leaf", { y: -400 }, 0);

    menuLeafTimeline.to("#m-right-leaf", { y: 300 }, 0);

    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      ".details h2, .details p, .details div",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
      }
    );
  }, [currentIndex]);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="menu">
      <img
        src="/images/slider-left-leaf.png"
        id="m-left-leaf"
        alt="left leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        id="m-right-leaf"
        alt="right leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail().name}</span>

            <img
              src="/images/right-arrow.png"
              alt="right arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail().name}</span>

            <img
              src="/images/left-arrow.png"
              alt="left arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p className="">Recipe for</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
            <div className="w-fit">
              <span className="cursor-pointer text-yellow ">Order Now</span>
              <div className="h-[2px] bg-yellow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
