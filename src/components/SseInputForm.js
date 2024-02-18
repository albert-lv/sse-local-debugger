import React from "react";
import PropTypes from "prop-types";
import "../styles/SseInputForm.css";

const SseInputForm = ({ apiUrl, isRequesting, setApiUrl, setIsRequesting, closeConnection }) => {
    const handleUrlChange = (event) => {
        setApiUrl(event.target.value);
    };
    const handleRequestToggle = (event) => {
        event.preventDefault();
        if (isRequesting) {
            closeConnection();
        } else {
            setIsRequesting(true);
        }
    };
    return (
        <form className="input-form">
            <input
                type="text"
                className="input-field"
                value={apiUrl}
                onChange={handleUrlChange}
                placeholder="请输入API Path"
                disabled={isRequesting}
            />
            <button className={`request-toggle-btn ${isRequesting ? "requesting" : "not-requesting"}`} onClick={handleRequestToggle}>
                {isRequesting ? "停止请求" : "开始请求"}
            </button>
        </form>
    );
};

SseInputForm.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    setApiUrl: PropTypes.func.isRequired,
    setIsRequesting: PropTypes.func.isRequired,
    closeConnection: PropTypes.func.isRequired
};

export default SseInputForm