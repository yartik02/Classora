const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('/Users/yartik/Desktop/Projects/Classora/Client/src');
files.forEach(filePath => {
    // Skip PrivacyPolicy.jsx as we already reverted it
    if (filePath.includes('PrivacyPolicy.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // We will do a generic replacement:
    // If a tag has style={{ ... color: "var(--text-muted)" ... }}, we remove the color part.
    // If it's the only thing in style, we remove the style attribute entirely.
    // We then inject text-muted into its className.
    
    // Regex for: style={{ ... color: "var(--text-muted)" ... }}
    content = content.replace(/(<[a-zA-Z0-9]+[^>]*?)(style=\{\{([^}]*?)color:\s*"var\(--text-muted\)"([^}]*?)\}\})([^>]*?>)/g, (match, before, styleTag, styleBefore, styleAfter, after) => {
        let newStyleBefore = styleBefore.trim().replace(/,\s*$/, '');
        let newStyleAfter = styleAfter.trim().replace(/^,\s*/, '');
        let newStyleInner = newStyleBefore + (newStyleBefore && newStyleAfter ? ', ' : '') + newStyleAfter;
        
        let replacementStyle = newStyleInner ? `style={{ ${newStyleInner} }}` : '';
        
        // Now we need to add "text-muted" to className.
        let newBefore = before + (replacementStyle ? replacementStyle + ' ' : '');
        let newTag = newBefore + after;
        
        if (newTag.includes('className="')) {
            newTag = newTag.replace(/className="/, 'className="text-muted ');
        } else {
            // Append className
            newTag = newTag.replace(/>$/, ' className="text-muted">');
        }
        
        return newTag;
    });

    // Same for text-main -> text-dark
    content = content.replace(/(<[a-zA-Z0-9]+[^>]*?)(style=\{\{([^}]*?)color:\s*"var\(--text-main\)"([^}]*?)\}\})([^>]*?>)/g, (match, before, styleTag, styleBefore, styleAfter, after) => {
        let newStyleBefore = styleBefore.trim().replace(/,\s*$/, '');
        let newStyleAfter = styleAfter.trim().replace(/^,\s*/, '');
        let newStyleInner = newStyleBefore + (newStyleBefore && newStyleAfter ? ', ' : '') + newStyleAfter;
        
        let replacementStyle = newStyleInner ? `style={{ ${newStyleInner} }}` : '';
        
        let newBefore = before + (replacementStyle ? replacementStyle + ' ' : '');
        let newTag = newBefore + after;
        
        if (newTag.includes('className="')) {
            newTag = newTag.replace(/className="/, 'className="text-dark ');
        } else {
            newTag = newTag.replace(/>$/, ' className="text-dark">');
        }
        
        return newTag;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log("Reverted in: " + filePath);
    }
});
console.log("Done");
