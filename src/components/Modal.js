import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const modalElement = document.getElementById("modal-root");

const Modal = ({ children, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <Overlay>
        <Wrapper
          className="modal"
          variants={variants}
          initial={"close"}
          animate={isOpen ? "open" : "close"}
        >
          {children}
        </Wrapper>
      </Overlay>
    ) : null,
    modalElement
  );
};

const variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  close: { opacity: 0, x: "-100%", delay: 0.3, transition: { duration: 0.3 } },
};

const Wrapper = styled(motion.div)`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  max-height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export default forwardRef(Modal);
