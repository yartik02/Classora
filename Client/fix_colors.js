const fs = require('fs');

const filePath = '/Users/yartik/Desktop/Projects/Classora/Client/src/pages/PrivacyPolicy.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace text-muted
content = content.replace(/className="([^"]*)text-muted([^"]*)"/g, (match, p1, p2) => {
    const newClass = (p1 + p2).replace(/\s+/g, ' ').trim();
    if (newClass) {
        return `className="${newClass}" style={{ color: "var(--text-muted)" }}`;
    } else {
        return `style={{ color: "var(--text-muted)" }}`;
    }
});

// Replace text-dark
content = content.replace(/className="([^"]*)text-dark([^"]*)"/g, (match, p1, p2) => {
    const newClass = (p1 + p2).replace(/\s+/g, ' ').trim();
    if (newClass) {
        return `className="${newClass}" style={{ color: "var(--text-main)" }}`;
    } else {
        return `style={{ color: "var(--text-main)" }}`;
    }
});

fs.writeFileSync(filePath, content);
console.log("Done");
