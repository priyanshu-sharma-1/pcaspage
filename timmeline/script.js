// Data structure holding different aspect ratio images from placehold.co
const galleryData = {
    '2025': [
        { url: 'https://placehold.co/400x300/000080/FFFFFF?text=Graduation+Day', class: '' },
        { url: 'https://placehold.co/300x600/FFD700/000080?text=Prom+Night', class: 'span-2-row' },
        { url: 'https://placehold.co/600x300/000080/FFFFFF?text=Sports+Team', class: 'span-2-col' },
        { url: 'https://placehold.co/400x400/eeeeee/333333?text=Club+Meeting', class: '' },
        { url: 'https://placehold.co/500x700/FFD700/000080?text=Award+Ceremony', class: 'span-2-row' }
    ],
    '2024': [
        { url: 'https://placehold.co/600x400/000080/FFD700?text=Science+Fair', class: 'span-2-col' },
        { url: 'https://placehold.co/300x300/eeeeee/333333?text=Art+Exhibit', class: '' },
        { url: 'https://placehold.co/400x500/000080/FFFFFF?text=Theater+Play', class: 'span-2-row' },
        { url: 'https://placehold.co/300x200/FFD700/000080?text=Field+Trip', class: '' },
        { url: 'https://placehold.co/400x300/eeeeee/333333?text=Hackathon', class: '' },
        { url: 'https://placehold.co/400x600/000080/FFFFFF?text=Coding+Camp', class: 'span-2-row' }
    ],
    '2023': [
        { url: 'https://placehold.co/300x400/FFD700/000080?text=Winter+Gala', class: 'span-2-row' },
        { url: 'https://placehold.co/500x300/000080/FFFFFF?text=Debate+Club', class: 'span-2-col' },
        { url: 'https://placehold.co/300x300/eeeeee/333333?text=Volunteering', class: '' },
        { url: 'https://placehold.co/400x600/000080/FFD700?text=Spring+Fest', class: 'span-2-row' },
        { url: 'https://placehold.co/400x300/eeeeee/333333?text=Alumni+Meet', class: '' }
    ],
    '2022': [
        { url: 'https://placehold.co/800x400/000080/FFFFFF?text=Campus+Tour', class: 'span-2-col' },
        { url: 'https://placehold.co/300x400/FFD700/000080?text=Orientation', class: 'span-2-row' },
        { url: 'https://placehold.co/300x500/eeeeee/333333?text=Dorm+Life', class: '' },
        { url: 'https://placehold.co/400x300/000080/FFD700?text=Study+Group', class: '' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const galleryGrid = document.getElementById('gallery-grid');
    const yearTitle = document.getElementById('year-title');

    // Function to render gallery items with staggered animations
    function renderGallery(year) {
        // Clear current content
        galleryGrid.innerHTML = '';
        
        // Update Title
        yearTitle.textContent = `Class of ${year}`;

        const images = galleryData[year];
        
        if (images && images.length > 0) {
            images.forEach((imgData, index) => {
                // Create container for the item
                const itemDiv = document.createElement('div');
                itemDiv.className = `gallery-item ${imgData.class}`;
                
                // Create image element
                const imgElement = document.createElement('img');
                imgElement.src = imgData.url;
                imgElement.alt = `Alumni memories for ${year}`;
                imgElement.loading = 'lazy'; // Performance boost
                
                itemDiv.appendChild(imgElement);
                galleryGrid.appendChild(itemDiv);
            });
        } else {
            galleryGrid.innerHTML = '<p>No memories found for this year yet.</p>';
        }
    }

    // Initialize with the active node
    const initialActiveNode = document.querySelector('.timeline-node.active');
    if (initialActiveNode) {
        renderGallery(initialActiveNode.dataset.year);
    }

    // Handle node clicks and accessibility
    timelineNodes.forEach(node => {
        // Click interaction
        node.addEventListener('click', function() {
            activateNode(this);
        });

        // Keyboard interaction (Enter / Space)
        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateNode(this);
            }
        });
    });

    function activateNode(selectedNode) {
        if (selectedNode.classList.contains('active')) return; // Already active

        // Update active class state and ARIA attributes
        timelineNodes.forEach(n => {
            n.classList.remove('active');
            n.setAttribute('aria-pressed', 'false');
        });
        
        selectedNode.classList.add('active');
        selectedNode.setAttribute('aria-pressed', 'true');
        
        // Render the gallery for the selected year
        const selectedYear = selectedNode.dataset.year;
        renderGallery(selectedYear);
        
        // Scroll slightly to the content if on mobile to show the new gallery
        if (window.innerWidth < 768) {
            document.querySelector('.timeline-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});
