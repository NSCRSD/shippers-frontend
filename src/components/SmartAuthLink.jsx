import { useNavigate } from "react-router-dom";

const SmartAuthLink = ({ to, children, className }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to, { replace: true });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmartAuthLink;
