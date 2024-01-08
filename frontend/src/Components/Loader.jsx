import React from "react";

const Loader = () => {
  return (
    <div className="loading">
      <div className="loader"></div>
      <style>{`
        @keyframes loadingRotate {
          to {
            transform: rotateZ(-360deg);
          }
        }

        .loading {
          width: 100vw;
          height: 100vh;
          background-color: white;
          display: grid;
          place-items: center;
          max-width: 100%;
        }

        .loader {
          width: 10vmax;
          height: 10vmax;
          border-bottom: 5px solid rgba(0, 0, 0, 0.719);
          border-radius: 50%;
          animation: loadingRotate 800ms linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
