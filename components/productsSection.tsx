'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';

interface Product {
  id: number;
  product_name: string;
  small_price: number | null;
  large_price: number;
  product_description: string;
  category: string;
  // Additional properties we'll add to match your existing interface
  bestSeller?: boolean;
  servingInfo?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'fullSize' | 'smallSize' | null>(null);

  const handleAddToCart = () => {
    // Check if size is selected for products with multiple sizes
    if (product.small_price && !selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    // Determine size to use
    const sizeToUse = selectedSize || 'fullSize';
    const price = sizeToUse === 'fullSize' ? product.large_price : product.small_price;

    // Prepare cart item format
    const cartItem = {
      id: `${product.id}-${sizeToUse}`,
      name: `${product.product_name} (${sizeToUse === 'fullSize' ? 'Full Size' : 'Small Size'})`,
      price: `₹${price?.toLocaleString('en-IN')}`,
      image: `/images/${product.category.toLowerCase().replace(' ', '-')}-${product.id}.jpg`,
      quantity: 1,
      category: product.category
    };

    addToCart(cartItem);
    
    // Show feedback that item was added
    setIsAdded(true);
    
    // Reset after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Handle size selection
  const handleSizeSelection = (size: 'fullSize' | 'smallSize') => {
    setSelectedSize(prev => prev === size ? null : size);
  };

  return (
    <div className="bg-theme1-secondary/5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">

      {product.bestSeller && (
        <div className="absolute top-2 right-2 bg-theme1-primary text-theme1-secondary text-xs font-medium py-1 px-2 rounded z-10">
          Best Seller
        </div>
      )}
      <div className="relative h-64 bg-theme1-tertiary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/${product.category.toLowerCase()}-${product.id}.jpg')`,
            backgroundSize: 'cover'
          }}
        />
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-sans uppercase tracking-wider text-theme1-primary">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-serif text-theme1-secondary mb-2">{product.product_name}</h3>
        <p className="text-theme1-secondary/80 font-sans text-sm mb-4">{product.product_description}</p>
        
        <div className="mb-4">
          {/* Price Display */}
          <div className="space-y-2">
            {/* Full Size Option */}
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id={`fullSize-${product.id}`}
                name={`size-${product.id}`}
                checked={selectedSize === 'fullSize'}
                onChange={() => handleSizeSelection('fullSize')}
                className="mr-2"
              />
              <label 
                htmlFor={`fullSize-${product.id}`} 
                className="flex flex-col flex-grow"
              >
                <div className="flex justify-between items-center">
                  <span className="font-serif font-medium text-theme1-primary">
                    Full Size: ₹{product.large_price.toLocaleString('en-IN')}
                  </span>
                </div>
                {product.servingInfo && (
                  <span className="text-xs text-gray-500">
                    {product.servingInfo.split('/')[0]?.trim()}
                  </span>
                )}
              </label>
            </div>

            {/* Small Size Option (if exists) */}
            {product.small_price && (
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id={`smallSize-${product.id}`}
                  name={`size-${product.id}`}
                  checked={selectedSize === 'smallSize'}
                  onChange={() => handleSizeSelection('smallSize')}
                  className="mr-2"
                />
                <label 
                  htmlFor={`smallSize-${product.id}`} 
                  className="flex flex-col flex-grow"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-medium text-theme1-primary">
                      Small Size: ₹{product.small_price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {product.servingInfo && (
                    <span className="text-xs text-gray-500">
                      {product.servingInfo.split('/')[1]?.trim()}
                    </span>
                  )}
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            className={`px-4 py-2 border rounded text-sm font-sans transition-all duration-300 ${
              isAdded 
                ? 'bg-theme1-primary text-theme1-secondary' 
                : 'bg-transparent text-theme1-primary hover:bg-theme1-primary hover:text-white'
            } border-theme1-primary`}
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        
        // Add bestSeller flag to a few products for display purposes
        const enhancedProducts = data.products.map((product: Product, index: number) => ({
          ...product,
          bestSeller: [0, 2, 5].includes(index) // Mark a few products as bestsellers
        }));
        
        setProducts(enhancedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAllProducts = () => {
    router.push('/shop');
  };

  if (loading) {
    return (
      <section id="products" className="py-16 bg-theme1-bg">
        <div className="container mx-auto px-6 text-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-16 bg-theme1-bg">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-theme1-bg">
      <div className="container mx-auto px-6">
        <h3 className="text-sm uppercase tracking-wider font-sans font-medium mb-4 text-theme1-tertiary">
          BEST SELLERS
        </h3>
        <h2 className="text-3xl font-serif mb-6 text-theme1-tertiary">
          Our Most Popular Treats
        </h2>
        <p className="text-theme1-secondary font-sans max-w-2xl mb-12">
          Discover our most loved cakes, cookies, and special treats that our customers can&apos;t get enough of.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-16 text-center">
  <button
    onClick={handleViewAllProducts}
    className="inline-block px-8 py-3 border-2 border-theme1-primary text-theme1-primary font-sans rounded tracking-wider transition-all hover:bg-theme1-primary hover:text-white"
  >
    VIEW ALL PRODUCTS
  </button>
</div>

      </div>
    </section>
  );
};

export default ProductsSection;