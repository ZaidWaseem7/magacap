import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IoCloseCircleSharp } from "react-icons/io5";
import cap from "./assets/cap.png";
import cap1 from "./assets/cap1.png";
import cap3 from "./assets/WhatsApp Image 2024-09-01 at 20.11.14_dfc27534 2.png";
import cap4 from "./assets/WhatsApp Image 2024-09-01 at 20.11.18_f559c184.jpg";
import Moveable from "moveable";
import html2canvas from "html2canvas";
import { FaXTwitter } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { FaTelegramPlane } from "react-icons/fa";

function App() {
  const [image, setImage] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Upload Image");
  const [activeTarget, setActiveTarget] = useState(null);
  const [selectedHat, setSelectedHat] = useState(null);
  const moveableRef = useRef(null);
  const containerRef = useRef(null);
  const targetRefs = {
    cap: useRef(null),
    cap1: useRef(null),
    cap3: useRef(null),
    cap4: useRef(null),
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
    setSelectedHat(key);
  };

  return (
    <div className={`card ${image ? "image-uploaded" : ""}`} id="page1">
      <div className="headings">
        <span className="magaa">$MAGA</span>
        <span className="magaa2">MAKE AMERICA GREAT AGAIN</span>
      </div>
      {/* <img src={trump} alt="" style={{width:"10%", height:"10%"}} /> */}
      <span className="selecthat">Select hat</span>
      <div className="hatboxes">
        <div className="hat1">
          <img
            src={cap}
            alt="cap"
            style={{ width: "70%", height: "98%" }}
            onClick={() => handleActivatecap("hat1")}
          />
        </div>
        <div className="hat2">
          <img
            src={cap1}
            alt="cap1"
            style={{ width: "70%", height: "98%" }}
            onClick={() => handleActivatecap("hat2")}
          />
        </div>
      </div>
      <div className="hatboxes">
        <div className="hat3">
          <img
            src={cap3}
            alt="cap3"
            style={{ width: "90%", height: "95%" }}
            onClick={() => handleActivatecap("hat3")}
          />
        </div>
        <div className="hat4">
          <img
            src={cap4}
            alt="cap4"
            style={{ width: "90%", height: "95%" }}
            onClick={() => handleActivatecap("hat4")}
          />
        </div>
      </div>
      <div
        className={`input ${!image ? "placeholder-border" : "image-uploaded"}`}
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
              <img src={image} alt="Uploaded Preview" className="imagecccc" />
            </>
          )}
          {selectedHat === "hat1" && (
            <div
              ref={targetRefs.cap}
              className={`child-container ${
                activeTarget === "cap" ? "active" : ""
              }`}
              onClick={() => handleActivateMoveable("cap")}
              style={{
                width: "120px",
                height: "120px",
                position: "absolute",
                left: 0,
                bottom: 50,
              }}
            >
              <img
                src={cap}
                alt="cap"
                style={{ width: "100%", height: "100%" }}
                className="imageeee"
              />
            </div>
          )}
          {selectedHat === "hat2" && (
            <div
              ref={targetRefs.cap1}
              className={`child-container ${
                activeTarget === "cap1" ? "active" : ""
              }`}
              onClick={() => handleActivateMoveable("cap1")}
              style={{
                width: "120px",
                height: "120px",
                position: "absolute",
                right: 0,
                bottom: 50,
              }}
            >
              <img
                src={cap1}
                alt="cap1"
                style={{ width: "100%", height: "100%" }}
                className="imageeee"
              />
            </div>
          )}
          {selectedHat === "hat3" && (
            <div
              ref={targetRefs.cap3}
              className={`child-container ${
                activeTarget === "cap3" ? "active" : ""
              }`}
              onClick={() => handleActivateMoveable("cap3")}
              style={{
                width: "220px",
                height: "120px",
                position: "absolute",
                left: 0,
                bottom: 50,
              }}
            >
              <img
                src={cap3}
                alt="cap3"
                style={{ width: "100%", height: "100%" }}
                className="imageeee"
              />
            </div>
          )}
          {selectedHat === "hat4" && (
            <div
              ref={targetRefs.cap4}
              className={`child-container ${
                activeTarget === "cap4" ? "active" : ""
              }`}
              onClick={() => handleActivateMoveable("cap4")}
              style={{
                width: "220px",
                height: "120px",
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
  );
}

export default App;
