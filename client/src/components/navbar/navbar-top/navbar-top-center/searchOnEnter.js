import { useNavigate } from "react-router";

export const SearchOnEnter = (searchField, handleClick) => {
  const navigate = useNavigate();
  const close = (enter) => {
    if (enter.key === "Enter" && searchField.length > 0) {
      window.removeEventListener("keydown", close, true);
      handleClick();
    }
  };
  window.addEventListener("keydown", close, true);
};
