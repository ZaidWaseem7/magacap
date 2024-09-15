import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IoCloseCircleSharp } from "react-icons/io5";
import cap1 from "./assets/cap5555.png";
import cap2 from "./assets/cap1.png";
import cap3 from "./assets/MAGA HAT FNAL.png";
import cap4 from "./assets/PngItem_1077178 (1) 1.png";
import cap5 from "./assets/cap.png";
import cap6 from "./assets/1 (3).png";

import cap7 from "./assets/WhatsApp Image 2024-09-01 at 20.11.14_dfc27534 2.png";
import cap8 from "./assets/WhatsApp Image 2024-09-01 at 20.11.18_f559c184.jpg";
import video from "./assets/americaa.mp4";
import Moveable from "moveable";
import html2canvas from "html2canvas";
import { FaXTwitter } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { FaTelegramPlane } from "react-icons/fa";

function App() {
  const [image, setImage] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Upload Image");
  const [activeTarget, setActiveTarget] = useState(null);
  const [selectedHat, setSelectedHat] = useState({
    cap1to6: null,
    cap7: false,
    cap8: false,
  });
  const moveableRef = useRef(null);
  const containerRef = useRef(null);
  const targetRefs = {
    cap: useRef(null),
    cap1: useRef(null),
    cap3: useRef(null),
    cap4: useRef(null),
    cap5: useRef(null),
    cap6: useRef(null),
    cap7: useRef(null),
    cap8: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeTarget &&
        targetRefs[activeTarget].current &&
        !targetRefs[activeTarget].current.contains(event.target)
      ) {
        setActiveTarget(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTarget]);

  useEffect(() => {
    if (containerRef.current && activeTarget) {
      if (moveableRef.current) {
        moveableRef.current.destroy();
        moveableRef.current = null;
      }

      moveableRef.current = new Moveable(containerRef.current, {
        target: targetRefs[activeTarget].current,
        draggable: true,
        resizable: true,
        scalable: true,
        rotatable: true,
        origin: true,
        keepRatio: true,
        edge: false,
      });

      moveableRef.current
        .on("drag", ({ target, left, top }) => {
          target.style.left = `${left}px`;
          target.style.top = `${top}px`;
        })
        .on("resize", ({ target, width, height }) => {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
        })
        .on("scale", ({ target, transform }) => {
          target.style.transform = transform;
        })
        .on("rotate", ({ target, transform }) => {
          target.style.transform = transform;
        });

      return () => {
        if (moveableRef.current) {
          moveableRef.current.destroy();
          moveableRef.current = null;
        }
      };
    }
  }, [activeTarget]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setButtonLabel("Save Image");
    }
  };

  const handleSaveImage = () => {
    if (containerRef.current) {
      const closeIcon = document.querySelector(".close-icon");
      if (closeIcon) closeIcon.style.display = "none";

      html2canvas(containerRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "combined_image.png";
        link.click();

        if (closeIcon) closeIcon.style.display = "block";
      });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setButtonLabel("Upload Image");
  };

  const handleActivateMoveable = (key) => {
    setActiveTarget(key);
  };

  const handleActivatecap = (key) => {
    if (["hat1", "hat2", "hat3", "hat4", "hat5", "hat6"].includes(key)) {
      setSelectedHat((prevState) => ({ ...prevState, cap1to6: key }));
    } else {
      setSelectedHat((prevState) => ({ ...prevState, [key]: !prevState[key] }));
    }
  };

  const handleCloseCap = (key) => {
    setSelectedHat((prevState) => ({ ...prevState, [key]: false }));
  };

  return (
    <div className="app-container">
      <video className="background-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="blue-overlay"></div>
      <div className={`card ${image ? "image-uploaded" : ""}`} id="page1">
        <div className="headings">
          <span className="magaa">$MAGA</span>
          <span className="magaa2">MAKE AMERICA GREAT AGAIN</span>
        </div>
        <span className="selecthat">Select</span>
        <div className="piccontainer">
          <div className="hatboxes1">
            <div className="hat1">
              <img
                src={cap1}
                alt="cap6"
                style={{ width: "90%", height: "130%" }}
                onClick={() => handleActivatecap("hat1")}
              />
            </div>
            <div className="hat1">
              <img
                src={cap2}
                alt="cap"
                style={{ width: "70%", height: "98%" }}
                onClick={() => handleActivatecap("hat2")}
              />
            </div>
            <div className="hat1">
              <img
                src={cap3}
                alt="cap1"
                style={{ width: "100%", height: "150%" }}
                onClick={() => handleActivatecap("hat3")}
              />
            </div>
          </div>
          <div className="hatboxes1">
            <div className="hat2">
              <img
                src={cap4}
                alt="cap3"
                style={{ width: "80%", height: "90%" }}
                onClick={() => handleActivatecap("hat4")}
              />
            </div>
            <div className="hat2">
              <img
                src={cap5}
                alt="cap4"
                style={{ width: "80%", height: "90%" }}
                onClick={() => handleActivatecap("hat5")}
              />
            </div>
            <div className="hat2">
              <img
                src={cap6}
                alt="cap5"
                style={{ width: "80%", height: "80%" }}
                onClick={() => handleActivatecap("hat6")}
              />
            </div>
          </div>
          <div className="hatboxe2">
            <div className="hat3">
              <img
                src={cap7}
                alt="cap7"
                style={{ width: "90%", height: "95%" }}
                onClick={() => handleActivatecap("cap7")}
              />
            </div>
            <div className="hat3">
              <img
                src={cap8}
                alt="cap8"
                style={{ width: "90%", height: "95%" }}
                onClick={() => handleActivatecap("cap8")}
              />
            </div>
          </div>

          <div
            className={`input ${
              !image ? "placeholder-border" : "image-uploaded"
            }`}
          >
            <div
              className="moveable-container"
              ref={containerRef}
              style={{ position: "relative" }}
            >
              {image && (
                <>
                  <div onClick={handleRemoveImage} className="close-icon">
                    <IoCloseCircleSharp size={40} className="close" />
                  </div>
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="imagecccc"
                  />
                </>
              )}
              {selectedHat.cap1to6 === "hat1" && (
                <div
                  ref={targetRefs.cap}
                  className={`child-container ${
                    activeTarget === "cap" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap")}
                  style={{
                    width: "auto",
                    height: "140px", // Adjust this for the cap height
                    position: "absolute",
                    left: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap1}
                    alt="cap1"
                    style={{ width: "100%", height: "auto" }} // Maintain aspect ratio
                    className="imageeee"
                  />
                </div>
              )}

              {selectedHat.cap1to6 === "hat2" && (
                <div
                  ref={targetRefs.cap1}
                  className={`child-container ${
                    activeTarget === "cap1" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap1")}
                  style={{
                    width: "180px",
                    height: "140px",
                    position: "absolute",
                    right: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap2}
                    alt="cap2"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                </div>
              )}
              {selectedHat.cap1to6 === "hat3" && (
                <div
                  ref={targetRefs.cap3}
                  className={`child-container ${
                    activeTarget === "cap3" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap3")}
                  style={{
                    width: "auto",
                    height: "140px", // Adjust this for the cap height
                    position: "absolute",
                    left: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap3}
                    alt="cap3"
                    style={{ width: "100%", height: "auto" }} // Maintain aspect ratio
                    className="imageeee"
                  />
                </div>
              )}

              {selectedHat.cap1to6 === "hat4" && (
                <div
                  ref={targetRefs.cap4}
                  className={`child-container ${
                    activeTarget === "cap4" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap4")}
                  style={{
                    width: "260px",
                    height: "160px",
                    position: "absolute",
                    right: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap4}
                    alt="cap4"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                </div>
              )}
              {selectedHat.cap1to6 === "hat5" && (
                <div
                  ref={targetRefs.cap5}
                  className={`child-container ${
                    activeTarget === "cap5" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap5")}
                  style={{
                    width: "200px",
                    height: "160px",
                    position: "absolute",
                    right: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap5}
                    alt="cap5"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                </div>
              )}
              {selectedHat.cap1to6 === "hat6" && (
                <div
                  ref={targetRefs.cap6}
                  className={`child-container ${
                    activeTarget === "cap6" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap6")}
                  style={{
                    width: "300px",
                    height: "170px",
                    position: "absolute",
                    right: 0,
                    bottom: 50,
                  }}
                >
                  <img
                    src={cap6}
                    alt="cap6"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                </div>
              )}
              {selectedHat.cap7 && (
                <div
                  ref={targetRefs.cap7}
                  className={`child-container ${
                    activeTarget === "cap7" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap7")}
                  style={{
                    width: "200px",
                    height: "120px",
                    position: "absolute",
                    left: 7,
                    bottom: -60,
                  }}
                >
                  <img
                    src={cap7}
                    alt="cap7"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                  <IoCloseCircleSharp
                    className="close-button"
                    size={20}
                    onClick={() => handleCloseCap("cap7")}
                  />
                </div>
              )}
              {selectedHat.cap8 && (
                <div
                  ref={targetRefs.cap8}
                  className={`child-container ${
                    activeTarget === "cap8" ? "active" : ""
                  }`}
                  onClick={() => handleActivateMoveable("cap8")}
                  style={{
                    width: "200px",
                    height: "120px",
                    position: "absolute",
                    right: 7,
                    bottom: -10,
                  }}
                >
                  <img
                    src={cap8}
                    alt="cap8"
                    style={{ width: "100%", height: "100%" }}
                    className="imageeee"
                  />
                  <IoCloseCircleSharp
                    className="close-button"
                    size={20}
                    onClick={() => handleCloseCap("cap8")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="btncrd">
          {buttonLabel === "Upload Image" ? (
            <label className="img">
              {buttonLabel}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            <button onClick={handleSaveImage} className="img">
              {buttonLabel}
            </button>
          )}
        </div>

        <div className="icons">
          <a href="https://t.me/MAGA_HAT" target="_blank">
            <FaTelegramPlane size={22} color="white" />
          </a>
          <a href="http://X.com/MagaHAT_ETH" target="_blank">
            <FaXTwitter size={22} color="white" />
          </a>
          <a href="https://maga-hat.vip/" target="_blank">
            <TfiWorld size={22} color="white" />
          </a>
        </div>
        <p className="copyright">PFP MAKER - POWERED BY $MAGA</p>
      </div>
    </div>
  );
}

export default App;
