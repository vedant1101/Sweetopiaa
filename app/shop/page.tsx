'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';

// Define product category types
type Category = 'all' | 'Cakes' | 'Cookies' | 'Cupcakes' | 'Special Items';
type SizeOption = 'fullSize' | 'smallSize';

// Product interface to match API response
interface ApiProduct {
  id: number;
  product_name: string;
  small_price: number | null;
  large_price: number;
  product_description: string;
  category: string;
  serving_info?: string;
  best_seller?: boolean;
}

// Internal Product interface for consistency with existing code
interface Product {
  id: number;
  name: string;
  description: string;
  price: {
    fullSize: number;
    smallSize?: number;
  };
  category: Category;
  servingInfo?: string;
  bestSeller?: boolean;
}

const ShopPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [productSizes, setProductSizes] = useState<{[key: number]: SizeOption | null}>({});
  const [addedToCartProducts, setAddedToCartProducts] = useState<{[key: number]: boolean}>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const goBack = () => {
    router.back();
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        
        // Transform API products to match our internal Product interface
        const transformedProducts: Product[] = data.products.map((apiProduct: ApiProduct) => ({
          id: apiProduct.id,
          name: apiProduct.product_name,
          description: apiProduct.product_description,
          price: {
            fullSize: apiProduct.large_price,
            smallSize: apiProduct.small_price || undefined
          },
          category: apiProduct.category as Category,
          servingInfo: apiProduct.serving_info,
          bestSeller: apiProduct.best_seller
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Handle size selection for a specific product
  const handleSizeSelection = (productId: number, size: SizeOption) => {
    setProductSizes(prev => {
      // If the same size is selected again, deselect it
      if (prev[productId] === size) {
        const newSizes = {...prev};
        delete newSizes[productId];
        return newSizes;
      }
      // Otherwise, select the new size
      return {
        ...prev,
        [productId]: size
      };
    });
  };

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    // Check if size is selected
    const selectedSize = productSizes[product.id];
    
    // If no size is selected and multiple sizes are available, show alert
    if (!selectedSize && product.price.smallSize) {
      alert('Please select a size before adding to cart');
      return;
    }
    
    // If only full size exists or no smallSize option, use fullSize
    const sizeToUse = selectedSize || 'fullSize';
    const price = product.price[sizeToUse];
    
    // Convert product to match CartItem interface
    const cartProduct = {
      id: `${product.id}-${sizeToUse}`,
      name: `${product.name} (${sizeToUse === 'fullSize' ? 'Full Size' : 'Small Size'})`,
      price: `₹${price?.toLocaleString('en-IN')}`,
      image: `/images/${product.category.toLowerCase()}-${product.id}.jpg`,
      quantity: 1,
      category: product.category
    };

    // Add to cart
    addToCart(cartProduct);

    // Show added to cart state
    setAddedToCartProducts(prev => ({
      ...prev,
      [product.id]: true
    }));

    // Reset added to cart state after 1.5 seconds
    setTimeout(() => {
      setAddedToCartProducts(prev => {
        const newState = {...prev};
        delete newState[product.id];
        return newState;
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif text-theme1-primary">
          Sweetopiaa Shop
        </h1>
        <button
          onClick={goBack}
          className="px-3 py-1 font-sans text-xs rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme1-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
            <p className="mt-2">Please try refreshing the page.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Category Sidebar */}
            <div className="md:w-1/4 lg:w-1/5">
              <div className="bg-theme1-sidebar p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-serif mb-4 text-theme1-primary">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-theme1-primary bg-opacity-10 text-theme1-primary font-medium'
                            : 'text-theme1-secondary hover:bg-theme1-primary hover:bg-opacity-5'
                        }`}
                        onClick={() => setSelectedCategory(category as Category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden relative">
                    {product.bestSeller && (
                      <div className="absolute top-2 right-2 bg-theme1-primary text-theme1-secondary text-xs font-medium py-1 px-2 rounded z-10">
                        Best Seller
                      </div>
                    )}
                    <div className="relative aspect-square w-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url('/images/${product.category.toLowerCase()}-${product.id}.jpg')`,
                          backgroundSize: 'cover'
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-sans uppercase tracking-wider text-theme1-primary">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-theme1-primary">{product.name}</h3>
                      <p className="text-theme1-secondary text-sm mt-1">{product.description}</p>
                      <div className="mt-3">
                        {/* Price Display with Radio Buttons */}
                        <div className="space-y-2">
                          {/* Full Size Option */}
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id={`fullSize-${product.id}`}
                              name={`size-${product.id}`}
                              checked={productSizes[product.id] === 'fullSize'}
                              onChange={() => handleSizeSelection(product.id, 'fullSize')}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`fullSize-${product.id}`} 
                              className="flex flex-col flex-grow"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-serif font-medium text-theme1-primary">
                                  Full Size: ₹{product.price.fullSize.toLocaleString('en-IN')}
                                </span>
                              </div>
                              {product.servingInfo && (
                                <span className="text-xs text-theme1-secondary/70">
                                  {product.servingInfo.split('/')[0]?.trim()}
                                </span>
                              )}
                            </label>
                          </div>

                          {/* Small Size Option (if exists) */}
                          {product.price.smallSize && (
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id={`smallSize-${product.id}`}
                                name={`size-${product.id}`}
                                checked={productSizes[product.id] === 'smallSize'}
                                onChange={() => handleSizeSelection(product.id, 'smallSize')}
                                className="mr-2"
                              />
                              <label 
                                htmlFor={`smallSize-${product.id}`} 
                                className="flex flex-col flex-grow"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-serif font-medium text-theme1-primary">
                                    Small Size: ₹{product.price.smallSize?.toLocaleString('en-IN')}
                                  </span>
                                </div>
                                {product.servingInfo && (
                                  <span className="text-xs text-theme1-secondary/70">
                                    {product.servingInfo.split('/')[1]?.trim()}
                                  </span>
                                )}
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          className={`px-4 py-2 border rounded text-sm font-sans transition-all duration-300 ${
                            addedToCartProducts[product.id] 
                              ? 'bg-theme1-primary text-theme1-secondary' 
                              : 'bg-transparent text-theme1-primary hover:bg-theme1-primary hover:text-theme1-secondary'
                          } border-theme1-primary`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedToCartProducts[product.id] ? 'Added to Cart ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state when no products match the filter */}
              {filteredProducts.length === 0 && !loading && (
                <div className="bg-theme1-sidebar rounded-lg shadow-sm p-8 text-center">
                  <p className="text-theme1-secondary">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-4 text-center mt-12">
        <p className="text-theme1-secondary font-sans text-xs">
          © {new Date().getFullYear()} Sweetopiaa. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default ShopPage;