import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";

// Categories array
const categories = [
  { id: "mern stack development", label: "Mern Stack Development" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "social-media", label: "Social Media Marketing" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "mobile", label: "Mobile Development" },
  { id: "web", label: "Web Development" },
  { id: "data", label: "Data Analysis" },
  { id: "docker", label: "Docker" },
  { id: "Dart", label: "Dart" },
  { id: "react", label: "React 19" },
  { id: "next", label: "Next" },
  { id: "python", label: "python" },
  { id: "html", label: "Html" },
  { id: "seo", label: "SEO" },
  { id: "flutter", label: "Flutter" },
  { id: "js", label: "Js" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];
      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="font-semibold text-lg md:text-xl">Filter</h1>

        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-[150px] border border-gray-300 px-3 py-1 rounded">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4 w-full" />

      <div>
        <h2 className="font-semibold mb-2">Category</h2>
        <CategoryList handleCategoryChange={handleCategoryChange} />
      </div>
    </div>
  );
};

export default Filter;

const CategoryList = ({ handleCategoryChange }) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Label key={category.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={category.id}
            name="category"
            value={category.id}
            className="h-4 w-4 accent-purple-600"
            onChange={() => handleCategoryChange(category.id)}
          />
          <span>{category.label}</span>
        </Label>
      ))}
    </div>
  );
};
