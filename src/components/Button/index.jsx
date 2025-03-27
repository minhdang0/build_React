import React from 'react'
import PropTypes from 'prop-types';
import styles from "./Button.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = ({
    children,
    type = "button",
    to = "",
    href = "",
    icon,
    size = "",
    className = '',
    primary = false,
    secondary = false,
    round = false,
    disabled = false,
    loading = false,
    onclick,
}) => {
    let Component = type;
    const passProps = {};

    if (to) {
        Component = Link;
        passProps.to = to;
    }

    if (href) {
        Component = a;
        passProps.href = href;
    }

    const handleClick = () => {
        if (disabled) return;
        onclick();
    }
    return (
        <Component
            {...passProps}
            className={clsx(styles.wrapper, className, {
                [styles.primary]: primary,
                [styles.secondary]: secondary,
                [styles.round]: round,
                [styles.disabled]: disabled,
                [styles[size]]: ["small", "medium", "large"].includes(size)
            })}
            onClick={handleClick}>
            {loading ? (<FontAwesomeIcon icon={faSpinner} spin />) : (
                <>
                    {icon && <FontAwesomeIcon icon={icon} />}
                    <span>{children}</span>
                </>
            )}

        </Component>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["div", "button"]),
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    icon: PropTypes.object,
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    round: PropTypes.bool
};
export default Button
