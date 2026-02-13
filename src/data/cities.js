export const cities = [
    { name: "Islamabad", transit: "Metro Bus & Private Taxis", weather: "Moderate during spring, cold in winter", lifestyle: "Executive & Fast-paced" },
    { name: "Karachi", transit: "Bus & Rickshaws", weather: "Humid & Tropical", lifestyle: "Bustling Metropolitan" },
    { name: "Lahore", transit: "Orange Line & Metro", weather: "Extreme (Hot summers, foggy winters)", lifestyle: "Cultural & Food-centric" },
    { name: "Faisalabad", transit: "Local Vans", weather: "Very Hot summers", lifestyle: "Industrial & Busy" },
    { name: "Rawalpindi", transit: "Metro Bus & Wagons", weather: "Variable", lifestyle: "Garrison & Commercial" },
    { name: "Gujranwala", transit: "Local Transport", weather: "Continental", lifestyle: "Wrestlers & Foodies" },
    { name: "Peshawar", transit: "BRT Bus", weather: "Semi-arid", lifestyle: "Traditional & Resilient" },
    { name: "Multan", transit: "Local Buses", weather: "Sultry & Very Hot", lifestyle: "Saints & Soft Pottery" },
    { name: "Hyderabad", transit: "Rickshaws", weather: "Dry & Hot", lifestyle: "Winds of the Indus" },
    { name: "Quetta", transit: "Local Buses", weather: "Freezing in winter", lifestyle: "Rugged & Mountainous" },
    // Adding more from the list...
    { name: "Bahawalpur", transit: "Rickshaws", weather: "Desert heat", lifestyle: "Princely & Heritage" },
    { name: "Sargodha", transit: "Local Taxis", weather: "Hot", lifestyle: "Citrus-Land" },
    { name: "Sialkot", transit: "local", weather: "Moderate", lifestyle: "Export Hub" },
    { name: "Sukkur", transit: "local", weather: "Extreme Heat", lifestyle: "River-side commerce" },
    { name: "Larkana", transit: "local", weather: "Hot", lifestyle: "Agricultural" },
    { name: "Sheikhupura", transit: "local", weather: "Hot", lifestyle: "Industrial" },
    { name: "Rahim Yar Khan", transit: "local", weather: "Hot", lifestyle: "Agricultural" },
    { name: "Jhang", transit: "local", weather: "Hot", lifestyle: "Cultural Heritage" },
    { name: "Dera Ghazi Khan", transit: "local", weather: "Hot", lifestyle: "Tribal/Mix" }
];

// Add the rest dynamically for now to keep the file manageable, 
// or I can define the full list if I want "Quantum-Level" indexing support.
// For the sake of the demo, I'll include a helper to slugs.

export const pkCities = [
    "Islamabad", "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Peshawar", "Multan", "Hyderabad", "Quetta", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur", "Larkana", "Sheikhupura", "Rahim Yar Khan", "Jhang", "Dera Ghazi Khan", "Gujrat", "Sahiwal", "Wah Cantonment", "Mardan", "Kasur", "Okara", "Mingora", "Nawabshah", "Chiniot", "Kotri", "Kamoke", "Hafizabad", "Sadiqabad", "Mirpur Khas", "Burewala", "Kohat", "Khanewal", "Dera Ismail Khan", "Turbat", "Muzaffargarh", "Abbottabad", "Mandi Bahauddin", "Shikarpur", "Jacobabad", "Jhelum", "Khanpur", "Khairpur", "Khuzdar", "Pakpattan", "Hub", "Daska", "Gojra", "Dadu", "Muridke", "Bahawalnagar", "Samundri", "Tando Allahyar", "Tando Adam", "Jaranwala", "Chishtian", "Muzaffarabad", "Attock", "Vehari", "Kot Abdul Malik", "Ferozwala", "Chakwal", "Gujranwala Cantonment", "Kamalia", "Umerkot", "Ahmedpur East", "Kot Addu", "Wazirabad", "Mansehra", "Layyah", "Swabi", "Chaman", "Taxila", "Nowshera", "Khushab", "Shahdadkot", "Mianwali", "Kabal", "Lodhran", "Hasilpur", "Charsadda", "Bhakkar", "Badin", "Arifwala", "Ghotki", "Sambrial", "Jatoi", "Haroonabad", "Daharki", "Narowal", "Tando Muhammad Khan", "Kamber Ali Khan", "Mirpur Mathelo", "Kandhkot", "Bhalwal", "Gwadar", "Gilgit", "Skardu", "Rawalakot", "Mirpur (AJK)", "Kotli", "Bhimber", "Hunza", "Chitral", "Sibi", "Zhob", "Loralai", "Kalat", "Bagh", "Haveli", "Hattian Bala", "Neelam", "Risalpur", "Murree", "Hassan Abdal"
];

export const getCityData = (cityName) => {
    const found = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    return found || { name: cityName, transit: "Public Transport", weather: "Varies", lifestyle: "Vibrant Local Culture" };
};
