import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Card({card}) {
  return <Card variant="outlined">{card}</Card>;
}