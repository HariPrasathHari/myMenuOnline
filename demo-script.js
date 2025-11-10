// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-item');
    
    let currentFilter = 'all';

    // Category Filter Functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            currentFilter = this.getAttribute('data-category');
            
            // Clear search input when changing filter
            searchInput.value = '';
            
            // Apply filter
            applyFilters();
        });
    });

    // Search Functionality
    searchInput.addEventListener('input', function() {
        applyFilters();
    });

    // Apply both category and search filters
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasVisibleItems = false;

        menuCategories.forEach(category => {
            const categoryName = category.getAttribute('data-category');
            const itemsInCategory = category.querySelectorAll('.menu-item');
            let categoryHasVisibleItems = false;

            // Check if category matches filter
            const categoryMatches = currentFilter === 'all' || categoryName === currentFilter;

            if (categoryMatches) {
                itemsInCategory.forEach(item => {
                    const itemName = item.getAttribute('data-name').toLowerCase();
                    const itemText = item.textContent.toLowerCase();
                    
                    // Check if item matches search term
                    const matchesSearch = searchTerm === '' || 
                                        itemName.includes(searchTerm) || 
                                        itemText.includes(searchTerm);

                    if (matchesSearch) {
                        item.classList.remove('hidden');
                        categoryHasVisibleItems = true;
                        hasVisibleItems = true;
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // Show/hide category based on whether it has visible items
                if (categoryHasVisibleItems) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            } else {
                category.classList.add('hidden');
            }
        });

        // Show/hide "no results" message
        showNoResultsMessage(!hasVisibleItems);
    }

    // Show or hide "no results" message
    function showNoResultsMessage(show) {
        let noResultsDiv = document.querySelector('.no-results');
        
        if (show) {
            if (!noResultsDiv) {
                noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <h2>No items found</h2>
                    <p>Try adjusting your search or filter criteria</p>
                `;
                document.getElementById('menu-container').appendChild(noResultsDiv);
            }
        } else {
            if (noResultsDiv) {
                noResultsDiv.remove();
            }
        }
    }

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items for animation
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(item);
    });

    // Log initialization
    console.log('Menu system initialized successfully!');
    console.log(`Total menu items: ${menuItems.length}`);
    console.log(`Total categories: ${menuCategories.length}`);
});
