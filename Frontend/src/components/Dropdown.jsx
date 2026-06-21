import * as React from "react";

import {
  Box,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const category = ["Adult Clothing", "Children's Clothing", "Baby Clothing"];

const clothes = [
  "Dresses",
  "Skirts",
  "Shirts & Blouses",
  "Pants",
  "Suits",
  "Shoes",
  "Accessories",
];

const room = ["Dining Room", "Living Room", "Bedroom", "Office"];

const furniture = [
  "Chairs",
  "Tables",
  "Sofas",
  "Beds & Mattresses",
  "Wardrobes",
  "Desks",
  "Bookcases & Shelves",
  "Carpets",
];

function getStyles(name, data, theme) {
  return {
    fontWeight:
      data.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Dropdown({ setCategoryComplete }) {
  const theme = useTheme();

  const [categoryName, setCategoryName] = React.useState([]);
  const [clothesName, setClothesName] = React.useState([]);
  const [roomName, setRoomName] = React.useState([]);
  const [furnitureName, setFurnitureName] = React.useState([]);

  // Update parent component when a valid donation category has been selected
  React.useEffect(() => {
    const clothesSelected = categoryName.length > 0 && clothesName.length > 0;

    const furnitureSelected = roomName.length > 0 && furnitureName.length > 0;

    setCategoryComplete(clothesSelected || furnitureSelected);
  }, [categoryName, clothesName, roomName, furnitureName, setCategoryComplete]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;

    setCategoryName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setClothesName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;

    setRoomName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange4 = (event) => {
    const {
      target: { value },
    } = event;

    setFurnitureName(typeof value === "string" ? value.split(",") : value);
  };

  // Display selected items as chips inside the dropdown
  const renderChips = (selected, placeholder) => {
    if (selected.length === 0) {
      return (
        <span
          style={{
            color: "#6c757d",
          }}
        >
          {placeholder}
        </span>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    );
  };

  return (
    <div className="text-center">
      <h4 className="mt-4 mb-3">Clothes</h4>

      <div className="d-flex flex-wrap justify-content-center">
        {/* Category */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            displayEmpty
            value={categoryName}
            onChange={handleChange1}
            input={<OutlinedInput />}
            renderValue={(selected) => renderChips(selected, "Select Category")}
            MenuProps={MenuProps}
          >
            {category.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, categoryName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clothes */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            displayEmpty
            value={clothesName}
            onChange={handleChange2}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              renderChips(selected, "Select Clothing Items")
            }
            MenuProps={MenuProps}
          >
            {clothes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, clothesName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <h4 className="mt-5 mb-3">Furniture</h4>

      <div className="d-flex flex-wrap justify-content-center">
        {/* Room */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            displayEmpty
            value={roomName}
            onChange={handleChange3}
            input={<OutlinedInput />}
            renderValue={(selected) => renderChips(selected, "Select Room")}
            MenuProps={MenuProps}
          >
            {room.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, roomName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Furniture */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            displayEmpty
            value={furnitureName}
            onChange={handleChange4}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              renderChips(selected, "Select Furniture Items")
            }
            MenuProps={MenuProps}
          >
            {furniture.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, furnitureName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
