const fs = require('fs');
['Dashboard', 'LiveMap', 'Analytics', 'History', 'Auth', 'Admin', 'About'].forEach(p => fs.writeFileSync(`src/pages/${p}.jsx`, `export default function ${p}() { return <div className="p-8">${p} Page</div>; }`));
['Sidebar', 'TopNav', 'PageLayout'].forEach(c => fs.writeFileSync(`src/components/layout/${c}.jsx`, `export default function ${c}() { return <div>${c}</div>; }`));
