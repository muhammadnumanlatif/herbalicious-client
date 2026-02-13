export const categories = [
    {
        id: 'ingredient-specific',
        name: 'Ingredient-Specific Micro-Niches',
        niches: [
            {
                id: 'goat-milk-skincare',
                title: 'Goat Milk Skincare',
                ingredient: 'Goat Milk',
                problem: 'Eczema & Sensitive Skin',
                product: 'Goat Milk Soap',
                seoH2: 'Why is our Organic Goat Milk Soap the best for dry skin in Pakistan?',
                geoInsight: 'Perfect for the dry, crisp winters of Islamabad and Quetta.'
            },
            {
                id: 'hibiscus-hair-care',
                title: 'Hibiscus-Infused Hair Care',
                ingredient: 'Hibiscus',
                problem: 'Premature Graying & Scalp Cooling',
                product: 'Hibiscus Shampoo/Oil',
                seoH2: 'Hibiscus Hair Care: The secret to stopping premature graying naturally.',
                geoInsight: 'Provides cooling relief during intense Karachi and Lahore summers.'
            },
            {
                id: 'amla-reetha-traditionalism',
                title: 'Amla & Reetha Traditionalism',
                ingredient: 'Amla & Reetha',
                problem: 'Hair Strength & Shine',
                product: 'Shampoos',
                seoH2: 'Sulfate-Free Solutions: How our Amla Reetha Shampoo stops hair fall.',
                geoInsight: 'Combatting hard water damage in urban centers like Lahore.'
            },
            {
                id: 'active-vitamin-c-organics',
                title: 'Active Vitamin C Organics',
                ingredient: 'Vitamin C',
                problem: 'Sun-Damaged Skin',
                product: 'Vitamin C Serums',
                seoH2: 'Is Vitamin C the best organic serum for sun damage in Multan?',
                geoInsight: 'High-stability formula designed for the sweltering heat of South Punjab.'
            },
            {
                id: 'frankincense-calendula-healing',
                title: 'Frankincense & Calendula Healing',
                ingredient: 'Frankincense',
                problem: 'Cracked Heels & Dry Elbows',
                product: 'Body Butter',
                seoH2: 'Deep Repair: Why Frankincense is the ultimate remedy for cracked heels.',
                geoInsight: 'Essential protection against the harsh Rawalpindi and Pindi winters.'
            },
            {
                id: 'turmeric-honey-brightening',
                title: 'Turmeric & Honey Brightening',
                ingredient: 'Turmeric',
                problem: 'Acne-Prone Skin',
                product: 'Anti-inflammatory Soaps',
                seoH2: 'Turmeric & Honey: The natural anti-inflammatory duo for glowing skin.',
                geoInsight: 'Designed for the humidity-prone skin types of Karachi and Peshawar.'
            }
        ]
    },
    {
        id: 'problem-solution',
        name: 'Problem-Solution Pain Points',
        niches: [
            {
                id: 'post-covid-hair-fall',
                title: 'Organic Solutions for Post-Covid Hair Fall',
                problem: 'Hair Density',
                product: 'Hair Serum',
                seoH2: 'Post-Covid Hair Fall? Discover Pakistan\'s most searched organic hair serum.',
                geoInsight: 'Recovery-focused nutrition for health-conscious families nationwide.'
            },
            {
                id: 'sulfate-free-dandruff',
                title: 'Sulfate-Free Scalp Detox for Dandruff',
                problem: 'Dandruff',
                product: 'Detox Shampoo',
                seoH2: 'Herbal Anti-Dandruff: A sulfate-free scalp detox for sensitive skin.',
                geoInsight: 'Deep cleansing to remove urban pollutants from Peshawar to Karachi.'
            },
            {
                id: 'natural-magnesium-therapy',
                title: 'Natural Magnesium Therapy for Sleep/Stress',
                problem: 'Stress & Insomnia',
                product: 'Magnesium Spray',
                seoH2: 'Sleep Better: Why Natural Magnesium Therapy is trending in Islamabad.',
                geoInsight: 'Crucial stress relief for fast-paced corporate residents in the capital.'
            },
            {
                id: 'non-toxic-lip-care',
                title: 'Non-Toxic Lip Care',
                problem: 'Chapped Lips',
                product: 'Strawberry Lip Balm',
                seoH2: 'Non-Toxic Beauty: Why our Strawberry Lip Balm is the winter essential.',
                geoInsight: 'Protecting smiles against the freezing breezes of Quetta and Skardu.'
            },
            {
                id: 'handmade-antibacterial-soaps',
                title: 'Handmade Antibacterial Soaps',
                problem: 'Body Acne',
                product: 'Tulsi and Eucalyptus Soap',
                seoH2: 'Clear Skin Strategy: Handmade antibacterial soaps for body acne.',
                geoInsight: 'Fighting summer skin irritations across the hot plains of Punjab.'
            }
        ]
    },
    {
        id: 'superfood-wellness',
        name: 'Superfood & Internal Wellness',
        niches: [
            {
                id: 'moringa-immunity-joint-pain',
                title: 'Moringa for Immunity & Joint Pain',
                benefit: 'Immunity & Joint Support',
                product: 'Moringa Powder',
                seoH2: 'Moringa Benefits: Why the "Miracle Tree" is Pakistan\'s top superfood.',
                geoInsight: 'Natural energy support for Faisalabad industrialists and farmers.'
            },
            {
                id: 'makhana-coconut-boosts',
                title: 'Makhana Coconut Boosts',
                benefit: 'Energy for Moms & Gym-goers',
                product: 'Makhana Powder',
                seoH2: 'Superfood Energy: Why Moms in Lahore trust our Makhana Coconut boost.',
                geoInsight: 'Post-workout recovery favored by urban gym-goers in DHA and Gulberg.'
            }
        ]
    }
];

export const allNiches = categories.flatMap(cat => cat.niches);
