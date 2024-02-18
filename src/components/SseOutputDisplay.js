import React from "react";
import PropTypes from "prop-types";
import MarkDown from "markdown-to-jsx";
import '../styles/SseOutputDisplay.css';

const SseOutputDisplay = ({ content }) => {
    return (
        <div className="output-display">
            <MarkDown>
                {content}
            </MarkDown>
        </div>
    );
};

SseOutputDisplay.propTypes = {
    content: PropTypes.string.isRequired
}

export default SseOutputDisplay