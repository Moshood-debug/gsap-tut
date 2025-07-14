/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    const heroSplitText = new SplitText(".title", {
      type: "words, chars",
    });

    const paraSplitText = new SplitText(".subtitle", {
      type: "lines,",
    });

    heroSplitText.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });

    gsap.from(heroSplitText.chars, {
      yPercent: 100,
      stagger: 0.06,
      ease: "expo.out",
      duration: 1.8,
    });

    gsap.from(paraSplitText.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "expo-out",
      duration: 1.2,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // * startValue center means the center of the element will be at 60% of the viewport height
    const startValue = isMobile ? "top 50%" : "center 60%";

    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">Martini</h1>

        <img
          className="left-leaf"
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
        />

        <img
          className="right-leaf"
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p className="">Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the spirit <br /> of summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails" className="">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
