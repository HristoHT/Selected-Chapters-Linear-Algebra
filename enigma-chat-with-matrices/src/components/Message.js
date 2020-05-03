import React, { useState, useEffect } from 'react';

import cryptWord from '../utils/Enigma';

const Message = ({ plainText, my, settings }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        setText(cryptWord(plainText, settings));
    }, [settings])

    return (
        <div className="row">
            <div className={my ? 'message my' : 'message'}>
                {text}
            </div>
        </div>
    )
}

export default Message;