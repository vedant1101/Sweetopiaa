'use client';

import React from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  location: string;
  date: string;
  stars: number;
  image: string;
}

interface StarRatingProps {
  rating: number;
}

interface ReviewCardProps {
  review: Review;
  maxCharacters?: number;
}

const reviewsData: Review[] = [
  {
    id: 1,
    title: "Bharati Chaturvedi",
    text: "I love food. But I also care where it comes from, what's in it. Who is making it? As a vegan and someone who avoids gluten, I am usually stuck with cardboard-style patisserie offerings. Mercifully, I discovered Sweetopiaa-which is as good as it gets. I like that it's small, personal, run by a woman, and super clean. Not to mention inventive, so people like me, get many goodies without breaking the bank.",
    author: "Environmentalist and founder of Chintan",
    location: "",
    date: "6/7/2023",
    stars: 5,
    image: "/images/person1.webp"
  },
  {
    id: 2,
    title: "Gitanjali and Unnati",
    text: "I ordered Sweetopiaa’s oatmeal raisin cookies & wholewheat jaggery cookies for my mother who cannot have sugar & needs to eat healthy. I must say that top notch quality ingredients were used & the taste was so good that everyone enjoyed it! It’s now a healthy tea staple in my house and we keep reordering. The batch is made fresh to order unlike other commercial bakeries and the freshness is evident in the flavour.",
    author: "Small business owner and student",
    location: "",
    date: "6/7/2023",
    stars: 5,
    image: "/images/person2.jpg"
  },
  {
    id: 3,
    title: "Disha Sukhija",
    text: "Whenever we have guests coming over, we order Tea Cakes, puffs, quiches and cheese straws from Sweetopiaa. They are always delivered freshly baked and delicious! All the guests enjoy them also. Good quality ingredients are used and the quality has also been consistent over the years. It always makes my parties a hit!",
    author: "Jane Doe",
    location: "",
    date: "6/7/2023",
    stars: 5,
    image: "/images/person3.jpg"
  }
];

// Star rating with golden stars
const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, maxCharacters = 150 }) => {
  // Truncate the review text based on maxCharacters
  const truncatedText = truncateText(review.text, maxCharacters);
  
  return (
    <div className="bg-theme1-secondary/5 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative">
      {/* Normal card content - visible by default, hidden on hover */}
      <div className="group-hover:hidden">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-theme1-primary"> 
          <Image
  src={review.image}
  alt={review.author}
  width={96}
  height={96}
  className="object-cover object-center w-full h-full mb-4"
/>
          </div>
          <StarRating rating={review.stars} />
        </div>
        <h3 className="text-xl font-serif text-center mb-3 text-theme1-primary">{review.title}</h3>
        <p className="text-theme1-secondary font-sans text-center mb-6">
        &ldquo;{truncatedText}&rdquo;
        </p>
        <div className="text-sm text-theme1-secondary/70 font-sans text-center">
          {review.author} {review.location && `, ${review.location}`}
        </div>
      </div>
      
      {/* Full review content - hidden by default, visible on hover */}
      <div className="hidden group-hover:block absolute inset-0 p-8 flex items-center justify-center rounded-lg bg-theme1-primary/15">
        <p className="text-theme1-secondary font-sans overflow-y-auto max-h-full">
        &ldquo;{review.text}&rdquo;
        </p>
      </div>
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  const characterLimit = 150;
  
  return (
    <section id="reviews" className="py-12 bg-theme1-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-4 text-theme1-primary">What our valuable customers say!</h2>
        <div className="w-20 h-1 mx-auto mb-12 bg-theme1-primary"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map(review => (
            <ReviewCard key={review.id} review={review} maxCharacters={characterLimit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;