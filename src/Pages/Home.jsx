import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import ProductCard from "../Component/ProductCard";
import Cart from "../Component/Cart";
import "./Home.css";
import CartIcon from "../Component/CartIcon";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Home = ({ setToken, token }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://dummyjson.com/products";

        if (searchTerm) {
          url += `/search?q=${searchTerm}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let filteredProducts = response.data.products;

        if (filterPrice) {
          const maxPrice = parseFloat(filterPrice);
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= maxPrice
          );
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, [token, searchTerm, filterPrice]);

  const addToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      // If the item is already in the cart, you can handle this case as needed.
      alert("Item is already in the cart");
      // Optionally, you can show a message to the user or perform some other action.
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...selectedProduct, quantity: 1 }]);
      alert("Item added to cart!");
    }
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const toggleCartDialog = () => {
    setIsCartDialogOpen(!isCartDialogOpen);
  };

  const handleLogout = () => {
    // Clear the token from the state
    navigate("/");
    setToken("");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-item">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="navbar-item search-filter">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="number"
            placeholder="Filter by max price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
        </div>
        <div className="navbar-item cart-info" onClick={toggleCartDialog}>
          <CartIcon />
          <p>
            Cart: {cart.length} items | Total: $
            {calculateTotalAmount().toFixed(2)}
          </p>
        </div>
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          paddingLeft: "5%",
        }}
      >
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      {/* Cart Dialog */}
      <Modal
        isOpen={isCartDialogOpen}
        onRequestClose={toggleCartDialog}
        contentLabel="Cart"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Your Cart</h2>
          <button
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={toggleCartDialog}
          >
            Close
          </button>
        </div>
        <Cart
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
        />
      </Modal>
    </div>
  );
};

export default Home;
