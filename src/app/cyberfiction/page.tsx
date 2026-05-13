"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "./cyberfiction.css";

const FRAME_COUNT = 300;

export default function CyberfictionPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    const canvas = canvasRef.current;
    if (!main || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    function scaleImage(img: HTMLImageElement) {
      const c = ctx!;
      const cvs = c.canvas;
      const hRatio = cvs.width / img.width;
      const vRatio = cvs.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (cvs.width - img.width * ratio) / 2;
      const cy = (cvs.height - img.height * ratio) / 2;
      c.clearRect(0, 0, cvs.width, cvs.height);
      c.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    }

    function renderFrame(index: number) {
      const i = Math.min(Math.max(Math.floor(index), 0), FRAME_COUNT - 1);
      if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
        scaleImage(images[i]);
      }
    }

    const imageSeq = { frame: 1 };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `/frames/male${num}.png`;
      img.onload = () => {
        loaded++;
        if (loaded === 1) {
          renderFrame(imageSeq.frame);
        }
      };
      images.push(img);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    async function initGSAP() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      lenis.on("scroll", () => ScrollTrigger.update());

      ScrollTrigger.scrollerProxy(main, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "fixed",
      });

      gsap.to(imageSeq, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          scrub: 0.15,
          trigger: "#cf-page>canvas",
          start: "top top",
          end: "600% top",
          scroller: main,
        },
        onUpdate: () => renderFrame(imageSeq.frame),
      });

      ScrollTrigger.create({
        trigger: "#cf-page>canvas",
        pin: true,
        scroller: main,
        start: "top top",
        end: "600% top",
      });

      gsap.to("#cf-page1", {
        scrollTrigger: {
          trigger: "#cf-page1",
          start: "top top",
          end: "bottom top",
          pin: true,
          scroller: main,
        },
      });

      gsap.to("#cf-page2", {
        scrollTrigger: {
          trigger: "#cf-page2",
          start: "top top",
          end: "bottom top",
          pin: true,
          scroller: main,
        },
      });

      gsap.to("#cf-page3", {
        scrollTrigger: {
          trigger: "#cf-page3",
          start: "top top",
          end: "bottom top",
          pin: true,
          scroller: main,
        },
      });

      // Reveal animations for page sections
      const revealConfigs = [
        {
          trigger: "#cf-page1 #cf-right-text",
          targets: "#cf-page1 #cf-right-text h3, #cf-page1 #cf-right-text h1",
        },
        {
          trigger: "#cf-page1 #cf-left-text",
          targets: "#cf-page1 #cf-left-text h1, #cf-page1 #cf-left-text h3",
        },
        {
          trigger: "#cf-page2 #cf-text1",
          targets: "#cf-page2 #cf-text1 h3, #cf-page2 #cf-text1 h1",
        },
        {
          trigger: "#cf-page2 #cf-text2",
          targets: "#cf-page2 #cf-text2 p",
        },
        {
          trigger: "#cf-page3 #cf-text3",
          targets: "#cf-page3 #cf-text3 h3, #cf-page3 #cf-text3 h1",
        },
        {
          trigger: "#cf-page > h3",
          targets: "#cf-page > h3, #cf-page > h4",
        },
      ];

      revealConfigs.forEach(({ trigger, targets }) => {
        const els = document.querySelectorAll(targets);
        if (els.length === 0) return;

        gsap.from(els, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: trigger,
            scroller: main,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    }

    initGSAP();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(imageSeq.frame);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} id="cf-main">
      <div id="cf-nav">
        <h3>
          <b>CYBER</b>FICTION*
        </h3>
        <button>APRIL,2023</button>
      </div>
      <div id="cf-page">
        <div id="cf-loop">
          <h1>
            <b>CYBER</b>FICTION IS THE <b>
              <i>REAL</i>
            </b> <span>STORY</span> IN THE <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
          <h1>
            <b>CYBER</b>FICTION IS THE <b>
              <i>REAL</i>
            </b> <span>STORY</span> IN THE <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
          <h1>
            <b>CYBER</b>FICTION IS THE <b>
              <i>REAL</i>
            </b> <span>STORY</span> IN THE <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
        </div>
        <h3>
          CYBERFICTION AIMS TO BE A DECENTRALIZED COMMUNITY THAT CAN <br />
          CREATE NEW VALUES AND PROFITS THROUGH PLAY IN THE VIRTUAL <br />
          WORLD.
        </h3>
        <h4>...SCROLL TO READ</h4>
        <canvas ref={canvasRef} />
      </div>
      <div id="cf-page1">
        <div id="cf-right-text">
          <h3>CYBERFICTION / KEY WORD</h3>
          <h1>
            HAVE FUN
            <br />
            LET&apos;S PLAY
            <br />
            JUST BE TOGETHER
          </h1>
        </div>
        <div id="cf-left-text">
          <h1>
            MAKE A STORY
            <br />
            TAKE A CHANCE
            <br />
            BUILD AND OWNED
          </h1>
          <h3>..AND MAINTAIN GOOD HUMANITY</h3>
        </div>
      </div>
      <div id="cf-page2">
        <div id="cf-text1">
          <h3>CYBERFICTION / HAVE FUN</h3>
          <h1>
            LET&apos;S
            <br />
            HAVE FUN
            <br />
            TOGETHER
          </h1>
        </div>
        <div id="cf-text2">
          <p>
            LET&apos;S HAVE A BLAST! LET&apos;S JUST THROW AWAY AGE, GENDER, REGION, <br />
            STATUS, ETC., DON&apos;T COMPETE, DON&apos;T FIGHT, COOPERATE AND SHARE <br />
            WITH EACH OTHER AND ENJOY IT TOGETHER! SO THAT YOU CAN STAND <br />
            THERE IN THE NOT-TOO-DISTANT FUTURE AND DREAM OF ANOTHER NEW <br />
            FUTURE
          </p>
        </div>
      </div>
      <div id="cf-page3">
        <div id="cf-text3">
          <h3>CYBERFICTION / PLAYGROUND</h3>
          <h1>
            CYBERFIELD
            <br />
            IS OUR
            <br />
            PLAYGROUND
          </h1>
        </div>
      </div>
    </div>
  );
}
