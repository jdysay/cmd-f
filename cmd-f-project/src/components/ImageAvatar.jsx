import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function ImageAvatar({altText, imagePath}) {
  return (
      <Avatar alt={altText} src="/static/images/avatar/1.jpg" />
  );
}
