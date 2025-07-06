import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const query = searchValue.toLowerCase();

  const pageParam = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 8;

  const filteredProducts = query
    ? products.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage !== pageParam) {
      setSearchParams({ search: query, page: currentPage.toString() });
    }
  }, [query, currentPage, pageParam, setSearchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ search: searchValue, page: newPage });
  };

  return (
    <div style={{ padding: "20px" }}>
      {currentProducts.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>No product found.</p>
      ) : (
        <>
          {/* Responsive Grid Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} page={currentPage} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                marginRight: "10px",
                background: currentPage === 1 ? "#ccc" : "#2874f0",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ◀ Previous
            </button>

            <span style={{ fontWeight: "bold", margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                background: currentPage === totalPages ? "#ccc" : "#2874f0",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
