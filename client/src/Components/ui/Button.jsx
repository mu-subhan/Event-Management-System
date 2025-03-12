

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`mt-2 text-gray-700 ${className}`}>{children}</div>;
}


// Reusable Button Component
export const Button = ({ text, onClick, variant = "primary" }) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
};
