import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { auth, provider, signInWithPopup, signOut } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
  ];

  const categories = ["Fantasy", "Mystery", "Sci-Fi", "Romance", "Horror", "Adventure"];

  const handleCategoryClick = (category) => {
    navigate(`/stories/${category.toLowerCase()}`);
    setIsDropdownOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center transition-all-150 hover:opacity-90"
          >
            <img 
              src="/images/narratica-logo.png" 
              alt="Narratica Logo" 
              className="h-10 w-auto mr-2 object-contain"
            />
            <span className="text-xl font-bold text-primary">Narratica</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all-150 ${
                  isActiveLink(link.path)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-sm font-medium transition-all-150 text-foreground/80 hover:text-primary"
              >
                Stories ▼
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {user ? (
              <Button 
                variant="default" 
                className="rounded-full px-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="rounded-full px-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-md p-2 transition-all-150 hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
