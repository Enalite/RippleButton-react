/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";

const rippleStyles = css`
  height: var(--less, 50px);
  width: var(--high, 150px);
  color: #fff;
  border: none;
  position: relative;
  --top: 50%;
  --right: 50%;
  --high: 20vh;
  --less: 43px;
  --time: 0.2s;
  --btn-color: #ffffff;
  --btn-clicked-color: #5959592e;
  z-index: 5;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  border-radius: 15px;
  color: #000000;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: var(--btn-color);
    z-index: -3;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: var(--btn-color);
    z-index: -2;
    transition: background-color var(--time) ease;
  }

  &:active::after {
    background: var(--btn-clicked-color);
    transition-delay: 0.4s;
  }

  .ripple {
    position: absolute;
    background-color: var(--btn-clicked-color);
    border-radius: 50%;
    width: calc(var(--less) / 5);
    height: calc(var(--less) / 5);
    opacity: 0;
    transition: width var(--time) ease-in, height var(--time) ease-in, opacity var(--time);
    z-index: -1;
    transform: translate(50%, -50%);
  }

  .ripple--expand {
    width: calc(var(--high, 150px) * 2.1);
    height: calc(var(--high, 150px) * 2.1);
    opacity: 1;
  }

  .ripple--off {
    animation: ripple-off 0.2s forwards;
  }

  @keyframes ripple-off {
    100% {
      opacity: 0;
    }
  }
`;

const RippleButton = ({ children, onClick, className, ...props }) => {
  const buttonRef = useRef(null);

  const handlePointerDown = (event) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    ripple.style.top = `${offsetY}px`;
    ripple.style.right = `${rect.width - offsetX}px`;
    
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.classList.add("ripple--expand");
    }, 0)

    setTimeout(() => {
      ripple.classList.add("ripple--off");
      setTimeout(() => {
        button.removeChild(ripple);
      }, 200);
    }, 400);
  };

  const handleClick = (event) => {
    if (onClick) onClick(event);
  };

  return (
    <button
      ref={buttonRef}
      css={rippleStyles}
      className={`ripple ${className || ""}`}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {children}
    </button>
  );
};

export default RippleButton;
