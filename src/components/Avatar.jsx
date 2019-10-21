import React from 'react';

//mui
import Avatar from '@material-ui/core/Avatar';

//utils
import { stringToHslColour, getAvatarLetters } from '../utils/helpers';

export default function({ name, className }) {
    return (
        <Avatar className={className} style={{ backgroundColor: stringToHslColour(name, 30, 50) }}>
            {getAvatarLetters(name)}
        </Avatar>
    );
}
