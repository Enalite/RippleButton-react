/** @jsxImportSource @emotion/react */
import React from "react";
import RippleButton from "./components/Ripple";
import { css } from "@emotion/react";

const App = () => {
    const pageStyle = css`
        background: #9dbfff;
        color: #ffffff;
    `;

    return (
        <div className="flex flex-center height-100 width-100 flex-column flex-gap-md" css={pageStyle}>
            <h2>Ripple button example</h2>
            <RippleButton>
                Click me
            </RippleButton>
        </div>
    )
}

export default App;