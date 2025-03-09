import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

export default function IconChip({ activeFilters, onFilterChange }) {
  // Example filter labels and values (adjust these as needed)
  const filters = [
    { label: "Women-Owned", value: "women" },
    { label: "BIPOC-Owned", value: "bipoc" },
    { label: "LGBTQ-Owned", value: "lgbtq" },
    { label: "Sustainable", value: "sustainable" },
    { label: "Clothing", value: "clothing" },
    { label: "Eco-Friendly", value: "ecofriendly" },
  ];

  return (
    <Stack direction="row" spacing={1}>
      {filters.map((filter) => (
        <Chip
          key={filter.value}
          label={filter.label}
          onClick={() => onFilterChange(filter.value)} // Handle filter toggle
          clickable
          variant={activeFilters.has(filter.value) ? "outlined" : "filled"} // Conditionally apply variant
        />
      ))}
    </Stack>
  );
}
