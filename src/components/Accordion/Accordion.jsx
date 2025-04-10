import React, { Children, useEffect, useRef, useState } from "react";
import { AccordionItem } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Accordion.module.scss";

const Accordion = ({
  defaultIndex = 0,
  children,
  onChange,
  collapseOthers,
}) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [highlightIndex, setHighlightIndex] = useState(defaultIndex);
  const accordions = Children.toArray(children);
  const [collapses, setCollapses] = useState(
    Array(accordions.length)
      .fill(false)
      .map((_, index) => index === defaultIndex)
  );
  const preIndex = useRef(defaultIndex);
  const wrapperRef = useRef(null);

  useEffect(() => {
    accordions.forEach((accordion) => {
      if (accordion.type !== AccordionItem) throw Error("Only <AccordionItem>");
    });
  }, []);

  useEffect(() => {
    if (preIndex.current !== currentIndex && typeof onChange === "function") {
      onChange(currentIndex);
    }

    preIndex.current = currentIndex;
  }, [currentIndex, onChange]);

  const handleKeyDown = (e) => {
    const max = accordions.length;
    if (["ArrowDown", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % max);
    } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + max) % max);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCurrentIndex(highlightIndex);
      setCollapses((prev) => {
        const newState = [...prev];
        const isOpen = prev[highlightIndex];

        if (collapseOthers)
          return prev.map((_, i) => (i === highlightIndex ? !isOpen : false));
        else {
          newState[highlightIndex] = !isOpen;
          return newState;
        }
      });
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.focus();
    }
  }, []);

  return (
    <div
      className={styles.wrapper}
      tabIndex={0}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.accordion__list}>
        {accordions.map((accordion, index) => {
          const display = collapses[index];
          const isHighlighted = index === highlightIndex;

          return (
            <React.Fragment key={index}>
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setHighlightIndex(index);
                  setCollapses((prev) => {
                    const newCollapse = [...prev];
                    const isOpen = prev[index];

                    if (collapseOthers)
                      return prev.map((_, i) =>
                        i === index ? !isOpen : false
                      );
                    else {
                      newState[index] = !isOpen;
                      return newCollapse;
                    }
                  });
                }}
                className={isHighlighted ? styles.highlighted : ""}
              >
                {accordion.props.header}
                {display ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </button>
              {collapses[index] && accordion}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
