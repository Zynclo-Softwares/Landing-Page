import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("scrollTo", "support");
    navigate("/", { replace: true });
  }, []);

  return null;
}