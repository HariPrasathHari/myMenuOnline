# 🍛 myMenuOnline - Spice Garden

A beautiful, interactive online menu example for an Indian restaurant. This project demonstrates a modern, responsive web menu with filtering and search capabilities.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search Functionality**: Search for dishes by name or description
- 🏷️ **Category Filtering**: Filter menu items by category (Appetizers, Main Course, Breads, Rice & Biryani, Desserts, Beverages)
- 🌶️ **Spice Level Indicators**: Visual indicators for mild, medium, and hot dishes
- 🥬 **Dietary Tags**: Clear labels for Vegetarian, Non-Vegetarian, and Vegan options
- ⭐ **Popular Items**: Highlighted popular dishes
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations
- ♿ **Accessible**: Semantic HTML and keyboard-friendly navigation

## Menu Categories

### 🥘 Appetizers
- Vegetable Samosa
- Mixed Vegetable Pakora
- Chicken Tikka
- Paneer Tikka

### 🍜 Main Course
- Butter Chicken
- Palak Paneer
- Chicken Vindaloo
- Dal Makhani
- Lamb Rogan Josh
- Chana Masala

### 🫓 Indian Breads
- Plain Naan
- Garlic Naan
- Tandoori Roti
- Aloo Paratha

### 🍚 Rice & Biryani
- Chicken Biryani
- Vegetable Biryani
- Jeera Rice

### 🍮 Desserts
- Gulab Jamun
- Rasmalai
- Mango Kulfi

### 🥤 Beverages
- Mango Lassi
- Masala Chai
- Sweet Lassi
- Rose Milk

## How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HariPrasathHari/myMenuOnline.git
   cd myMenuOnline
   ```

2. **Open in browser**:
   Simply open `index.html` in your web browser. No build process or dependencies required!

3. **Interact with the menu**:
   - Use the search bar to find specific dishes
   - Click category buttons to filter by type
   - Click "All" to see the complete menu
   - Hover over menu items for a nice visual effect

## Customization

This menu template can be easily customized for any restaurant:

### Change Restaurant Name
Edit `index.html` and update the header section:
```html
<h1>🍛 Your Restaurant Name</h1>
<p class="tagline">Your Tagline Here</p>
```

### Modify Menu Items
Edit the menu items in `index.html`. Each item follows this structure:
```html
<div class="menu-item" data-name="dish-name">
    <div class="item-header">
        <h3>Dish Name</h3>
        <span class="price">$0.00</span>
    </div>
    <p class="description">Description here</p>
    <div class="item-tags">
        <span class="tag veg">Vegetarian</span>
        <span class="tag spicy">🌶️ Mild</span>
    </div>
</div>
```

### Update Colors
Modify the color scheme in `styles.css`:
```css
/* Main brand color */
background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript**: Vanilla JS for filtering and search functionality
- **No Dependencies**: Pure HTML/CSS/JS with no external libraries required

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## License

This project is open source and available for anyone to use and modify.

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Spice Garden** - Bringing authentic Indian cuisine to your screen! 🌶️