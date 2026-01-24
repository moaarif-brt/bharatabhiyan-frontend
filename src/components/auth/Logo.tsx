import logoImage from "@/assets/logo.jpeg";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <img 
        src={logoImage} 
        alt="BharatAbhiyan Logo" 
        className="h-32 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
