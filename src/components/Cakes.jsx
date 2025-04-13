  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "../App.css";

  // Import Cake Images
  import Cake1 from "../assets/img/CAKE/chocolate mud cake.webp";
  import Cake2 from "../assets/img/CAKE/chocolate coconut cake.jpg";
  import Cake3 from "../assets/img/CAKE/Cinnamon tea cake.jpg";
  import Cake4 from "../assets/img/CAKE/lemon yoghurt cake.jpg";
  import Cake5 from "../assets/img/CAKE/Banana cake.jpg";
  import Cake6 from "../assets/img/CAKE/caramel mud cake.jpg";
  import Cake7 from "../assets/img/CAKE/gluten cake.jpg";
  import Cake8 from "../assets/img/CAKE/jennys coffee cake.jpg";
  import Cake9 from "../assets/img/CAKE/Lemon coconut cake.jpg";
  import Cake10 from "../assets/img/CAKE/Triple Chocolate.jpg";
  import Cake11 from "../assets/img/CAKE/walnut cke.jpg";
  import Cake12 from "../assets/img/CAKE/white cheesecake.jpg";
  import Cake13 from "../assets/img/CAKE/white chocolate.webp";
  import Cake14 from "../assets/img/CAKE/Pecan-Pie-Cake.jpg";
  import Cake15 from "../assets/img/CAKE/Mint-Chocolate-Chip-Cake.jpg";
  import Cake16 from "../assets/img/CAKE/Hazelnut-Cake.jpg";
  import Cake17 from "../assets/img/CAKE/Almond-Cake.jpg";
  import Cake18 from "../assets/img/CAKE/Blueberry-Cake.jpg";
  import Cake19 from "../assets/img/CAKE/Carrot-Cake-min.jpg";
  import Cake20 from "../assets/img/CAKE/Red-Velvet-CAke.jpg";

  const Cake = () => {
    const navigate = useNavigate();

    // Cake Data
    const cakes = [
      { id: 1, name: "Chocolate Mud Cake", image: Cake1, price: 539, detail: "Rich, dense, and moist chocolate cake with intense chocolate flavor." },
      { id: 2, name: "Chocolate Coconut Cake", image: Cake2, price: 480, detail: "Decadent chocolate cake with tropical coconut flavor." },
      { id: 3, name: "Cinnamon Tea Cake", image: Cake3, price: 399, detail: "Light and aromatic cake infused with warm cinnamon." },
      { id: 4, name: "Lemon Yoghurt Cake", image: Cake4, price: 699, detail: "Soft, moist cake with fresh lemon juice and yoghurt." },
      { id: 5, name: "Banana Cake", image: Cake5, price: 450, detail: "Moist cake made with ripe bananas for natural sweetness." },
      { id: 6, name: "Caramel Mud Cake", image: Cake6, price: 400, detail: "Rich, dense cake infused with caramel flavor." },
      { id: 7, name: "Gluten Cake", image: Cake7, price: 899, detail: "Contains gluten from wheat, barley, and rye." },
      { id: 8, name: "Jenny's Coffee Cake", image: Cake8, price: 460, detail: "Moist cake best served with coffee." },
      { id: 9, name: "Lemon Coconut Cake", image: Cake9, price: 549, detail: "Bright lemon cake with coconut sweetness." },
      { id: 10, name: "Triple Chocolate Cake", image: Cake10, price: 999, detail: "Intense chocolate flavor from three types of chocolate." },
      { id: 11, name: "Walnut Cake", image: Cake11, price: 899, detail: "Nutty cake with ground walnuts for crunch." },
      { id: 12, name: "White Cheesecake", image: Cake12, price: 799, detail: "Classic creamy cheesecake with white chocolate." },
      { id: 13, name: "White Chocolate Cake", image: Cake13, price: 599, detail: "Moist cake made with rich white chocolate." },
      { id: 14, name: "Pecan Pie Cake", image: Cake14, price: 769, detail: "Combination of pecan pie flavors with a moist cake." },
      { id: 15, name: "Mint Chocolate  Cake", image: Cake15, price: 699, detail: "Cool mint cake with chocolate chips." },
      { id: 16, name: "Hazelnut Cake", image: Cake16, price: 559, detail: "Rich cake with ground hazelnuts." },
      { id: 17, name: "Almond Cake", image: Cake17, price: 879, detail: "Moist cake made with ground almonds." },
      { id: 18, name: "Blueberry Cake", image: Cake18, price: 859, detail: "Sweet and tangy blueberry-infused cake." },
      { id: 19, name: "Carrot Cake", image: Cake19, price: 699, detail: "Moist carrot cake with cream cheese frosting." },
      { id: 20, name: "Red Velvet Cake", image: Cake20, price: 799, detail: "Classic red velvet with subtle cocoa flavor." },
    ];

    // State for sorted cakes and sort order
    const [sortedCakes, setSortedCakes] = useState(cakes);
    const [sortOrder, setSortOrder] = useState("");

    // Function to sort cakes by price
    const sortCakesByPrice = (order) => {
      const sorted = [...cakes].sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price));
      setSortedCakes(sorted);
      setSortOrder(order);
    };

    return (
      <div className="cake-containers">
        {/* Sorting Dropdown */}
        <div className="sort-container" style={{ padding: "20px" }}>
          <label htmlFor="sort" className="sort-label">Sort by Price:</label>
          <select
            id="sort"
            className="sort-dropdown"
            value={sortOrder}
            onChange={(e) => sortCakesByPrice(e.target.value)}
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Cake List */}
        <div className="cake-container">
          {sortedCakes.map((cake) => (
            <div key={cake.id} className="cake-card">
              <img src={cake.image} className="cake-img" alt={cake.name} />
              <div className="cake-body">
                <h6 className="cake-title">{cake.name}</h6>
                {/* <p className="cake-text">{cake.detail}</p> */}
                <p className="cake-price">Price: ₹{cake.price} Per KG</p>
                <button
                  className="cake-btn"
                  onClick={() => navigate("/order", { state: { cake } })}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Cake;