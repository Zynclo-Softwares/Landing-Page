import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    setTimeout(() => {
      const el = document.getElementById("support");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  return null;
}