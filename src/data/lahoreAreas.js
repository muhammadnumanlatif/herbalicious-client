export const lahoreAreas = [
    { id: 'dha-lahore', name: 'DHA Lahore', targetAudience: 'Affluent & Premium', landmark: 'Y-Block Market' },
    { id: 'gulberg-lahore', name: 'Gulberg', targetAudience: 'Urban Professionals', landmark: 'MM Alam Road' },
    { id: 'bahria-town-lahore', name: 'Bahria Town', targetAudience: 'Gated Community Residents', landmark: 'Grand Jamia Mosque' },
    { id: 'johar-town-lahore', name: 'Johar Town', targetAudience: 'Families & Students', landmark: 'Emporium Mall' },
    { id: 'model-town-lahore', name: 'Model Town', targetAudience: 'Established Residents', landmark: 'Model Town Park' },
    { id: 'cantt-lahore', name: 'Lahore Cantt', targetAudience: 'Elite & Professionals', landmark: 'Fortress Stadium' },
    { id: 'wapda-town-lahore', name: 'Wapda Town', targetAudience: 'Middle-Upper Class Families', landmark: 'Wapda Town Roundabout' },
    { id: 'garden-town-lahore', name: 'Garden Town', targetAudience: 'Educational & Corporate', landmark: 'Barkat Market' },
    { id: 'faisal-town-lahore', name: 'Faisal Town', targetAudience: 'Commercial & Students', landmark: 'Faisal Town Market' },
    { id: 'raiwind-road-lahore', name: 'Raiwind Road', targetAudience: 'New Suburban Residents', landmark: 'Beaconhouse National University' },
    { id: 'shadman-lahore', name: 'Shadman', targetAudience: 'Central City Residents', landmark: 'Shadman Market' },
    { id: 'valencia-lahore', name: 'Valencia Town', targetAudience: 'Quiet Residential', landmark: 'Valencia Entry Gate' }
];

export const areaTemplate = (area, product) => {
    return {
        title: `${product} in ${area.name}, Lahore | Same-Day Delivery Available`,
        description: `Looking for authentic ${product} in ${area.name}? Herbalicious offers premium organic solutions near ${area.landmark} with fast doorstep delivery in Lahore.`,
        keywords: [`${product} ${area.name}`, `organic skincare ${area.name}`, `best hair oil in ${area.name} lahore`],
        context: `Whether you're visiting ${area.landmark} or residing in ${area.name}, your ${product} is just a WhatsApp away.`
    };
};
