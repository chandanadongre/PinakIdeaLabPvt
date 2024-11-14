// Mobile menu toggle
// document.addEventListener('DOMContentLoaded', function() {


  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Mobile dropdowns
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
  
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      
      // Close other dropdowns
      mobileDropdownTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          const otherId = otherTrigger.getAttribute('data-target');
          const otherContent = document.getElementById(otherId);
          otherContent.classList.add('hidden');
        }
      });
  
      targetContent.classList.toggle('hidden');
    });
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
      mobileMenu.classList.add('hidden');
      
      document.querySelectorAll('[id$="-mobile"]').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    }
  });
  
  const words = ['Streamlined', 'Professional', 'Long-Lasting'];
  let currentIndex = 0;
  const wordElements = document.querySelectorAll('.cycling-word, .cyclingagain-word');
  
  function cycleWord() {
    wordElements.forEach(wordElement => {  // Loop through each wordElement
      wordElement.style.opacity = '0';
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        wordElement.textContent = words[currentIndex];
        wordElement.style.opacity = '1';
      }, 500);
    });
  }
  
  if (wordElements.length > 0) {  // Ensure there are elements to target
    wordElements.forEach(wordElement => {
      wordElement.textContent = words[0];  // Initialize text for each element
    });
    setInterval(cycleWord, 3000);  // Start the cycling effect
  }
  
  const scrollLeftButton = document.getElementById("scrollLeft");
  const scrollRightButton = document.getElementById("scrollRight");
  const serviceContainer = document.getElementById("serviceContainer");
  
  scrollLeftButton.addEventListener("click", () => {
    serviceContainer.scrollBy({
      left: -serviceContainer.clientWidth,
      behavior: "smooth"
    });
  });
  
  scrollRightButton.addEventListener("click", () => {
    serviceContainer.scrollBy({
      left: serviceContainer.clientWidth,
      behavior: "smooth"
    });
  });
  
  
  // Initial reviews data
  const initialReviews = [
    {
        id: 1,
        name: "Julie Urubek",
        date: "24 August 2024",
        rating: 5,
        content: "The most AMAZING job I've ever had!!! Thank you again God bless you and your company:)) The team was incredibly professional and efficient. They completed the work ahead of schedule and left everything spotless. I couldn't be happier with the results.",
        avatar: "J",
        avatarColor: "bg-green-600"
    },
    {
        id: 2,
        name: "Omar Ahmad",
        date: "23 August 2024",
        rating: 5,
        content: "I recently used Streamline for an outdoor water line repair, and they were fantastic. My main water line cracked and we had to shut the water off until it was fixed. The team arrived promptly and resolved the issue within hours. Their expertise and professionalism were outstanding.",
        avatar: "O",
        avatarColor: "bg-blue-700"
    },
    {
        id: 3,
        name: "Larry Bergstrom",
        date: "21 August 2024",
        rating: 5,
        content: "Streamline Landscape is set up to provide services to big commercial buildings or corporate customers. And they bring that same level of expertise and skill to people like me, a homeowner. The attention to detail and customer service was exceptional.",
        avatar: "L",
        avatarColor: "bg-purple-600"
    }
  ];
  
  let reviews = [...initialReviews];
  const expandedReviews = new Set();
  
  // Function to generate star rating HTML
  function generateStars(rating) {
    return Array(rating).fill().map(() => `
        <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
    `).join('');
  }
  
  // Function to create a review card
  function createReviewCard(review) {
    const isExpanded = expandedReviews.has(review.id);
    const contentClass = isExpanded ? '' : 'line-clamp-4';
    const buttonText = isExpanded ? 'Show less' : 'Read more';
    const buttonIcon = isExpanded ? '↑' : '↓';
    
    return `
        <div class="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg h-full flex flex-col" data-review-id="${review.id}">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center flex-1">
                    <div class="${review.avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${review.avatar}
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900">${review.name}</h3>
                        <p class="text-sm text-gray-500">${review.date}</p>
                    </div>
                </div>
                <div class="flex-shrink-0">
                    <svg viewBox="0 0 24 24" class="w-6 h-6">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
            </div>
            
            <div class="flex mb-3">
                ${generateStars(review.rating)}
            </div>
            
            <div class="relative flex-grow">
                <p class="text-gray-700 ${contentClass} review-content">
                    ${review.content}
                </p>
                ${review.content.length > 150 ? `
                    <button
                        class="text-blue-600 hover:text-blue-800 font-medium mt-2 flex items-center gap-1 read-more-btn"
                        data-review-id="${review.id}"
                    >
                        ${buttonText} ${buttonIcon}
                    </button>
                ` : ''}
            </div>
        </div>
    `;
  }
  
  // Function to render all reviews
  function renderReviews() {
    const reviewGrid = document.getElementById('reviewGrid');
    reviewGrid.innerHTML = reviews.map(review => createReviewCard(review)).join('');
    
    // Add event listeners to all "Read more" buttons
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const reviewId = parseInt(this.dataset.reviewId);
            toggleExpand(reviewId);
        });
    });
  }
  
  // Function to toggle expand/collapse
  function toggleExpand(id) {
    if (expandedReviews.has(id)) {
        expandedReviews.delete(id);
    } else {
        expandedReviews.add(id);
    }
    renderReviews();
  }
  
  // Function to generate more reviews
  function generateMoreReviews() {
    const names = ["Michael", "Sarah", "David", "Emma", "John", "Lisa"];
    const colors = ['red', 'blue', 'green', 'purple', 'indigo'];
    
    const newReviews = Array(3).fill().map((_, i) => {
        const name = names[Math.floor(Math.random() * names.length)];
        return {
            id: reviews.length + i + 1,
            name: `${name} ${Math.floor(Math.random() * 1000)}`,
            date: "20 August 2024",
            rating: 5,
            content: "Another excellent service experience. The team was professional, timely, and delivered outstanding results. Would highly recommend their services to anyone looking for quality work. This is a longer review that demonstrates the read more functionality. We want to make sure there's enough content to trigger the read more button and show how it works effectively.",
            avatar: name[0],
            avatarColor: `bg-${colors[Math.floor(Math.random() * colors.length)]}-600`
        };
    });
    
    reviews = [...reviews, ...newReviews];
    renderReviews();
  }
  
  // Load More button click handler
  document.getElementById('loadMoreBtn').addEventListener('click', function() {
    this.innerHTML = `
        <span class="inline-flex items-center">
            Loading...
            <div class="ml-2 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        </span>
    `;
    
    setTimeout(() => {
        generateMoreReviews();
        this.innerHTML = 'Load More Reviews';
    }, 1000);
  });
  
  renderReviews();
  
  //form submission testcases
  const form = document.getElementById('contactForm');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', (event) => {
    const allFieldsFilled = [...form.elements].every(input => input.value.trim() !== "" || input.type === 'submit');
    
    if (!allFieldsFilled) {
      event.preventDefault();
      errorMessage.classList.remove('hidden');
    } else {
      errorMessage.classList.add('hidden');
    }
  });
  // });
